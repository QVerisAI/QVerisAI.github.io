---
title: 'Starting from a Failed Tool Call: Quality Engineering for AI Agent Tool Use'
description: 'A production-oriented look at agent tool-calling failures, covering search quality, parameter repair, result validation, observability, and evaluation loops.'
pubDate: 'Jun 18 2026'
heroImage: '../../../assets/blog-agent-tool-calling-quality-hero.png'
category: 'Engineering'
author: 'QVeris Team'
tags: ['AI Agent', 'Tool Calling', 'Search Ranking', 'Observability', 'Rerank']
translationKey: 'agent-tool-calling-quality-engineering'
---

Last month, we reviewed a very typical tool-calling incident.

The user asked a normal question:

> “Help me analyze JCET’s recent financial performance, capital flows, and announcement risks.”

This was not a tricky request. A financial Agent should first look for financial data, then check market data and capital flows, and finally supplement the answer with announcements or news. If there are enough candidate tools, it should even know what different providers are good at: some are better for announcements, some for financial statements, and some for intraday market data.

But that Agent’s execution path did not look good. It first found more than twenty tools, including financial, announcement, and capital-flow tools, plus several tools whose names looked similar but whose capabilities did not match. It then selected a tool that seemed relevant, but filled its parameters in the format of another provider. The API naturally failed. The log ended with only a vague conclusion: tool call failed.

If you only look at that one log line, it is easy to blame the model: “The model made up parameters again.”

Later, after we connected search, rerank, tool schema, execute, third-party raw responses, and session data, we found that this was not a single-point failure. It was several small deviations stacked across the chain: the correct tool was not ranked high enough in recall, the parameter boundaries in the tool description were not strict enough, the model mixed up parameters from two similar tools, and the execution layer classified user-side errors and provider errors as the same kind of failure.

That incident reinforced one of our beliefs: **Tool Calling is not a function-calling problem. It is a quality engineering problem.**

![AI Agent tool-calling quality engineering cover](../../../assets/blog-agent-tool-calling-quality-hero.png)

## One Tool Call Actually Has Nine Stages

Many demos draw tool calling as two steps: the model decides which function to call, and the function returns a result.

Production does not work that way.

For a real Agent to call external tools, it usually needs to pass through at least nine stages:

![Production-grade tool-calling pipeline](../../../assets/blog-agent-tool-calling-quality-pipeline.png)

The first stage is intent understanding. When the user says “analyze JCET,” the Agent needs to know this is not just a stock-price lookup or a company-profile lookup. It is a composite task: identify the stock code, retrieve financial statements, market data, capital flows, announcements, and risk events, then synthesize the findings.

The second stage is search. Tools cannot all be stuffed into the prompt. The platform needs to convert the natural-language query into a candidate tool set. This may use signals such as full-text recall, Chinese word segmentation, vector recall, aliases, provider information, category, and capability.

The third stage is fusion. Full-text recall is sensitive to exact capability terms such as “announcement” and “financial report,” while vector recall is more friendly to semantically similar tools. The two result sets need to be fused, commonly with rank-fusion methods such as RRF. The fused score is not the final relevance score. It is only evidence that “this tool deserves to enter the candidate pool.”

The fourth stage is rerank. Once there are many candidate tools, text similarity alone is not enough. A tool description mentioning “financial analysis” does not mean the tool is truly suitable for the current task. The ranking model also needs to consider historical success rate, parameter complexity, latency, price, provider quality, whether the tool supports the current region, and whether Agents commonly adopt it.

The fifth stage is tool selection. After seeing the top candidate tools, the model decides whether to call one tool or several. One metric is often underestimated here: **adoption rate**. If the correct tool is ranked third, but the model always uses only the first result, then third place is almost the same as not appearing at all.

The sixth stage is parameter generation. Parameter schema, sample parameters, field descriptions, and error messages all affect how the model fills parameters. `symbol`, `code`, `ticker`, and `stock_code` all look like stock codes, but some require `603308.SH`, some require `SH603308`, and some only require `603308`. If these details are not stated clearly, the model can easily produce something that looks reasonable but is actually wrong.

The seventh stage is execution. The execution layer needs to handle authentication, rate limits, provider timeouts, caching, result truncation, field normalization, and whether a call should be counted as successful.

The eighth stage is result judgment. HTTP 200 does not mean the Agent succeeded. An empty array, all-null financial statements, a wrong date range, or incorrect field units can all degrade the final answer.

The ninth stage is feedback. A call cannot stop at writing logs. It needs to flow back into tool documentation, indexes, rerank training samples, provider quality statistics, alerts, and demotion strategies. Otherwise, the same error will happen again next time.

If any of these nine stages is not observable, the result is a familiar situation: it looks like a model problem, but there is no way to locate the cause.

## Search Quality: Relevance Is Not Enough

The easiest mistake in tool search is treating it like ordinary document search.

Ordinary document search only needs to answer, “Does this document resemble the query?” Tool search must also answer another question: **Can the model use this tool to complete the user’s task?**

For example, suppose the user searches for “Hualing Data announcements.” There are at least two intents here:

- “Hualing Data” is a brand or data-source preference;
- “announcements” is the core capability.

If “Hualing Data” is indexed as text with the same weight as tool names and descriptions, the result may be that all Hualing Data tools rank first, even if they are not announcement tools. This appears to satisfy the brand keyword, but it actually sacrifices capability matching.

A better approach is to separate the signals:

| Signal | Role | Weight tendency |
| --- | --- | --- |
| Tool name | Clear capability entry point, such as announcement query, income statement, real-time quotes | Strong |
| Tool description | Explains capability boundaries and use cases | Strong |
| Parameter description | Helps determine whether the tool can accept the current entity | Medium |
| category / capability | Domain and task type | Medium |
| Provider brand term | User-preferred data source or provider | Weak boost |
| Historical quality statistics | Success rate, latency, price, stability | Used in rerank |

Brand terms should affect ranking, but they should not overpower capability terms. When searching for “Hualing Data announcements,” the ideal order is:

1. Hualing Data announcement tools;
2. Announcement tools from other providers;
3. Other Hualing Data tools;
4. Semantically related tools whose capabilities do not directly match.

This is really an intent-aware ranking problem. Tokens in a query should not be treated equally. Capability terms, entity terms, brand terms, time terms, and region terms play different roles in ranking.

If the platform stores only one `search_text` field and concatenates everything into it, implementation is fast in the short term, but tuning becomes difficult over time. A more robust approach is to preserve structured features: name match, description overlap, provider in query, category match, capability match, parameter type, and historical call quality. Full-text retrieval supplies candidates; rerank then makes structured judgments.

## Rerank Cannot Learn Only “Relevance”

When many teams first build rerank, they define the goal as “rank the most relevant tool first.” That is correct, but insufficient.

When an Agent selects a tool, relevance is only the first layer. In production, several other factors matter just as much:

- Whether the tool is actually usable;
- Whether the parameters are easy to fill correctly;
- Whether the result is stable;
- Whether the call cost is reasonable;
- Whether latency will hurt the interaction;
- Whether the provider often returns empty results;
- Whether the model has adopted this tool in similar tasks.

For example, suppose two tools can both query A-share financial data:

| Candidate tool | Main capability | Text relevance | Success rate in past 30 days | Avg latency | Required parameters | Price | Ranking judgment |
| --- | --- | --- | --- | --- | --- | --- | --- |
| cn_equity.financial_statement.full | Detailed three-statement data, complete fields, suitable for deep modeling | 0.91 | 72% | 4.8s | 6 | High | Suitable for offline analysis, not suitable as the first choice in an interactive task |
| cn_equity.financials.snapshot | Snapshot of core profit, asset, and cash-flow metrics, stable fields | 0.86 | 98% | 1.2s | 2 | Medium | Better to rank higher so the Agent can get a reliable result first |

If you look only at text relevance, the detailed statement tool should rank first. If you look at production effectiveness, the financial snapshot tool is actually better as the first choice for an interactive Agent: it is faster, more stable, and less error-prone to parameterize.

This is why rerank training samples cannot come only from manually labeled relevance. They should also absorb real call feedback:

- Whether the candidate tool was exposed to the model;
- Whether the model adopted it;
- Whether execution succeeded;
- Whether the result was used in the subsequent answer;
- Whether the failure was caused by parameters, permissions, provider issues, or empty results;
- Which similar tools performed better for this query.

One detail matters here: training samples need to store both the original fusion rank and the final rerank rank. Otherwise, you cannot tell what the model actually changed.

If `fusion_score` and `rerank_score` are mixed together, or if only the final score is stored, reviews become painful. You may see a tool ranked first, but not know whether recall was already strong or rerank lifted it. You also cannot tell whether rerank genuinely improved the order or merely copied the original ranking.

A reviewable search history should preserve at least the following information:

```text
query
query_tokenized
candidate_tool_id
provider_id
recall_source
text_score / vector_score / fusion_score
fusion_rank
rerank_score
rerank_rank
tool_stats_success_rate
tool_stats_avg_latency
tool_param_count
required_param_count
categories / capabilities
exposed_to_agent
was_executed
execution_outcome
```

Not every field needs to enter the model, but these fields must be traceable. Otherwise, every online incident can only be guessed at.

## Parameter Errors Usually Do Not Mean “The Model Is Dumb”

One of the most common failures in tool calling is parameter error.

But parameter errors should not be simply blamed on the model. In many cases, the model is only amplifying ambiguity in the documentation and schema.

Take stock-code fields:

- `symbol`: A-share stock code, must include the market suffix, such as `600519.SH`
- `code`: Stock code, such as `600519`
- `ticker`: US stock ticker, such as `AAPL`
- `secucode`: Internal security code, such as `600519.SH`

If the tool description only says “stock code,” the model will guess based on formats it has seen before. Guessing right once does not mean the system is reliable; guessing wrong once is not entirely the model’s fault.

A better schema should make four things clear:

1. What the input entity is;
2. What the format is;
3. What counterexamples look like;
4. If the user provides only a company name, which tool should be called first to resolve the code.

For example:

```json
{
  "name": "symbol",
  "type": "string",
  "required": true,
  "description": "A股股票代码，必须使用 6 位代码 + 交易所后缀，如 603308.SH 或 000001.SZ。不要使用 SH603308、603308、公司简称。若用户只提供公司名，应先调用证券代码查询工具。"
}
```

This is not copy optimization. It is execution success-rate optimization.

Another often-overlooked element is sample parameters.

If historical telemetry already contains high-quality successful calls, real successful parameter examples should be shown to the model first. If there is no telemetry, fall back to manually written examples. Real examples contain many details that documentation often fails to specify clearly, such as whether dates are inclusive, whether codes include suffixes, and whether pagination defaults can be omitted.

The priority for parameter examples should roughly be:

1. Real parameters from recent successful calls;
2. Manually maintained canonical examples;
3. Minimal parameters generated from schema;
4. Letting the model guess.

The fourth case should happen as little as possible.

## Success Rate Needs Two Layers

In tool-call statistics, the most dangerous metric is a lonely success rate.

It mixes many different types of problems together.

![Failure attribution matrix](../../../assets/blog-agent-tool-calling-quality-matrix.png)

Suppose a provider had an 83% success rate yesterday. That number does not point to any action. You do not know whom to involve:

- Did the user pass a nonexistent tool_id?
- Did the model fill the wrong parameters?
- Was the tool schema unclear?
- Did the third-party API time out?
- Did the provider return 200 with empty data?
- Did our own execution layer classify the failure incorrectly?

At minimum, success rate needs two layers:

**User-side success rate** focuses on whether the user ultimately received a usable result. Wrong parameters, nonexistent tool_id, insufficient permissions, and empty results all lead to user-side failure.

**Execution-layer success rate** focuses on the provider’s actual availability. It should exclude obvious user-side errors and count only calls that were truly sent to the third party and can represent provider quality.

A simple definition could be:

```text
provider_success_rate =
  count(provider_success == true)
  /
  count(provider_success in [true, false])

where raw_success_rate_excluded != true
```

This kind of definition looks tedious, but it is critical.

Without this split, the platform can easily take the wrong action. For example, if many users call a tool with wrong parameters, its user-side success rate will be low. If you treat that as provider instability, you may incorrectly demote or even block a provider that is actually fine. The correct action should be to improve the documentation, schema, parameter validation, and examples, not punish the provider.

Conversely, if the third-party API has many real 5xx or timeout failures, but user-side errors are mixed in, alerts will be diluted. A tool that should clearly be demoted may look like it only “occasionally fails.”

## Observability Is Not More Logging

Observability for Agent tool calls does not mean dumping every request and response into logs.

What is truly useful is the ability to answer five questions:

1. What task was the user trying to complete at that moment?
2. Which candidate tools did search return, and why were they ranked that way?
3. Which tools did the model see, and which one did it adopt?
4. Where did the parameters come from, and were they consistent with the schema?
5. Which layer did the failure belong to, and what should be changed next?

This requires search history and tool-call history to be connected through stable IDs. The basics are `search_id` and `session_id`.

Without `search_id`, you can only see that an execute call failed, not which search produced it. Without `session_id`, you cannot see the order of search and execute within a user task. Without `model`, you cannot compare tool adoption differences across models. Without `source_system`, you cannot tell whether the call came from the official website, a plugin, the CLI, or an integrated system.

But recording everything blindly is also wrong. Three boundaries matter:

- Do not record sensitive credentials, API keys, or tokens;
- Summarize and truncate large results while preserving reviewable fields;
- Preserve the raw provider error while also applying platform-side classification.

A practical record structure looks like this:

```text
session_id: one user task
search_id: one search
query: original query
candidate_tools: top N candidates and scores
tool_infos: tool information exposed to the model
execute: tool_id + parameter summary + outcome
provider_raw: third-party raw status, error code, latency
stats: search latency / rerank latency / execute latency
model: model that initiated tool selection
source_system: call entry point
```

This is not for “possible future use.” It directly determines whether you can review an online incident within 10 minutes.

## Quality Loop: Every Failure Needs Somewhere to Go

If a failure stops in the logs, it has no value.

It needs to enter a loop.

![Tool-calling quality feedback loop](../../../assets/blog-agent-tool-calling-quality-loop.png)

We usually classify and handle failures in several ways:

**Search recall issue**: The correct tool did not enter the candidate set. Actions include adding index fields, adjusting Chinese word segmentation, adding category/capability metadata, and adding provider-specific internal search terms.

**Ranking issue**: The correct tool was recalled but ranked too low. Actions include adjusting rerank features, adding historical quality signals, and running A/B tests.

**Tool documentation issue**: The model saw the correct tool but filled the wrong parameters. Actions include improving schema descriptions, adding examples, and adding parameter validation and error messages.

**Execution attribution issue**: Logs recorded a user-side error as a provider failure. Actions include fixing the outcome taxonomy and separating user-side success rate from execution-layer success rate.

**Provider availability issue**: The third party timed out, returned 5xx, or returned abnormal empty results. Actions include provider diagnostics, alerts, temporary demotion, and blocking when necessary.

**Model adoption issue**: The correct tool ranked high but the model did not use it. Actions include tuning the prompt, reducing candidate noise, optimizing tool summaries, or recording adoption in eval.

A/B testing is very important here. Search-ranking changes can easily feel good in isolation, especially when looking at a single query. You may think a certain tool should rank higher, while the global change may hurt other tasks.

A more stable approach is:

- Send all test-environment traffic through the new rerank;
- Roll it out to a small portion of production traffic;
- Record search latency, rerank latency, adoption, top1/top3 execution, and success rate at the same time;
- Analyze results by query category, not just the overall average;
- Look separately at domains such as finance, weather, news, and research.

Overall averages are very good at lying. Finance may improve by 10%, news may drop by 20%, and the overall number may look unchanged.

## Evaluate the Agent, Not Just Search Results

There is another trap: evaluating only the results returned by the search API.

That is useful for early search tuning, but not enough to evaluate the Agent’s real performance.

Real users do not see the full top-20 tool list. They only see whether the Agent ultimately completed the task. In between are model understanding, tool adoption, parameter generation, result reading, and final answer generation.

So an eval closer to production should simulate the Agent:

1. Give the model a real task, such as “Help me analyze JCET’s recent financials and capital flows”;
2. Let the model complete the task through the system-provided search and execute APIs;
3. Record which search results the model saw;
4. Record which tools it adopted;
5. Execute by default, instead of taking the shortcut of “evaluating search without execution”;
6. Use another evaluation model or rules to judge whether the final answer completed the task;
7. Output metrics for search, adoption, execution, success, latency, and more.

Metrics can include:

| Metric | Description |
| --- | --- |
| Top1 Exec | Whether the first-ranked tool was executed |
| Top3 Exec | Whether the top three covered the executed tool |
| Top5 Success | Whether the top five contained a tool that successfully completed the task |
| Search → Call | Conversion rate from search result to actual call |
| First Useful Rank | Rank of the first useful tool |
| Success Rate | Final task success rate |
| Avg Search Latency | Average search latency |
| Avg Rerank Latency | Incremental rerank latency |
| Provider Success Rate | Third-party real execution-layer success rate |

This kind of eval is more troublesome than simply looking at NDCG or manual relevance, but it is closer to the user experience.

Users do not care whether a tool has semantic relevance of 0.89. They care whether the Agent got the job done.

## What a Mature Tool Network Should Look Like

If all of the above is compressed into one engineering checklist, I would look for these capabilities:

- The search layer preserves multi-route recall scores and original ranks;
- The rerank layer can explain the difference between final ranking and original ranking;
- Tool schemas include clear parameter formats, counterexamples, and successful examples;
- The execute layer distinguishes user-side failures from raw provider failures;
- History can connect the full task through search_id/session_id;
- Provider statistics include both user-side success rate and execution-layer success rate;
- Low-success-rate tools have demotion, alerting, and manual diagnostic entry points;
- A/B tests can be analyzed by query category and tool type;
- Eval can simulate real Agent search + execute, instead of only inspecting search lists;
- Every failure can enter a repair queue for documentation, indexing, ranking, or provider governance.

These things may not sound as exciting as “integrating 10,000 tools,” but they determine whether the tool network can actually be used by Agents.

## Closing: The More Tools You Have, the More Quality Engineering Matters

When a system has only 10 tools, if the model chooses the wrong one, a developer can manually fix the prompt.

When a system has 100 tools, it needs search.

When a system has 10,000 tools, it needs a full quality engineering system made of search, ranking, execution, observation, evaluation, and governance.

When a tool call fails, the most important question is not “Why did the model get it wrong again?” It is:

> At which layer of the chain did this failure actually happen? Can we make the next similar task fail one fewer time?

This is also what QVeris focuses on most when building a capability-routing network. A unified protocol is only the entry point. The real engineering difficulty comes afterward: making sure Agents can find the right tools, choose accurately, fill parameters correctly, execute successfully, and become more reliable after every failure.

The next stage of Tool Calling will not just be more functions. It will be a measurable, diagnosable, continuously optimized tool quality system.
