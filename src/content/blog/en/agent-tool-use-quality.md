---
title: Why an Agent Can Find a Tool but Still Fail to Use It Well
description: A practical framework for evaluating Agent tool use across relevance, contracts, operating quality, and execution semantics.
pubDate: Jul 27 2026
heroImage: ../../../assets/blog-agent-tool-use-quality-1.png
category: Engineering
author: QVeris Team
tags: ['QVeris', 'Agent']
translationKey: agent-tool-use-quality
---

![](../../../assets/blog-agent-tool-use-quality-1.png)

After connecting tools to an Agent, it is easy to fall into a misleading assumption: as long as the model can produce a Function Call once, the tool capability is already in place. In practice, the opposite is true. When a model selects a tool with a similar-sounding name, it has only completed the first step. The call can still lose its value at any layer: data coverage, parameter semantics, runtime state, or the meaning of the returned result.

> **This article is not about whether a model can call a function. It is about what it means for a tool call to be complete:** selecting the right capability, constructing the right parameters, recognizing the real execution outcome, and returning trustworthy evidence to the Agent.

## Four Gates Between "Can Find It" and "Can Use It Well"

![](../../../assets/blog-agent-tool-use-quality-2.png)

Toolformer describes tool use as a sequence of decisions: when to call a tool, which API to call, what arguments to pass, and how to use the returned result. The Berkeley Function Calling Leaderboard has also expanded from single-turn function calling to multi-turn, parallel calling, dynamic tools, and Agent scenarios. That evolution makes the same point: tool capability cannot be measured only by whether the JSON is well formed.

From an engineering perspective, tool selection can be broken into four gates:

1. **Relevance:** Does the tool solve the user's real problem?
2. **Contract:** Do the parameters, data scope, identifiers, and output structure match the task?
3. **Operating quality:** Is the data fresh, and are latency, success rate, and price acceptable?
4. **Execution semantics:** Did the call succeed in business terms, and is the result complete and trustworthy?

Passing one gate does not mean the next one is automatically satisfied. A tool whose name is relevant but whose data scope is wrong should be eliminated at the first gate. A tool with outdated parameter examples should be caught at the second. A tool with high latency or abnormal recent failure rates should be downgraded at the third. And if an HTTP 200 response contains an error in the body, it must be treated as a failure at the fourth.

## Gate One: Do Not Use the User's Original Question as the Tool Query

The user is asking for information. A capability discovery system is searching for a tool that can provide that kind of information. Those are not the same query.

| User question | Poor tool query | Better capability description |
|-|-|-|
| Will it rain in Tokyo tomorrow morning? | Will it rain in Tokyo tomorrow morning | Forecast API that returns hourly future weather and precipitation probability |
| Why has this company been volatile recently? | Why did a company fall | Market data, filings, capital flow, and company news data APIs |
| Extract the tables from this PDF | Analyze this PDF | PDF parsing or OCR API that supports structured table output |

Using the user's original wording directly tends to mix entity names and current facts into the capability query. The retrieved candidates may be content-similar rather than functionally appropriate. A more reliable approach is to extract the capability type, region, time granularity, input format, and output requirements first, then form the tool query.

For the task "Will it rain in Tokyo tomorrow morning?", the Agent should identify at least the following:

- It needs a forecast, not current weather.
- The required granularity is hourly, not a daily summary.
- It needs precipitation probability or precipitation amount.
- The time must be interpreted in the Tokyo time zone.
- The final answer must cover what the user means by "tomorrow morning."

If the Agent selects a "current weather" tool, the answer is still wrong even if the call succeeds perfectly. This kind of error cannot be fixed by retrying.

## Gate Two: A Valid Schema Does Not Mean Valid Parameter Semantics

Common parameter checks stop at JSON Schema: the fields exist, the types are correct, and required values are present. Real API errors often sit outside those type checks.

| Issue | Parameter that looks valid | Real risk |
|-|-|-|
| Security identifier | `"600519"` | The API may require `600519.SH`, an exchange code, or an internal security ID |
| Time | `"2026-07-27"` | The API may interpret it as UTC, local time, or a trading day |
| Amount | `100` | The unit may be yuan, ten-thousand yuan, dollars, or the smallest currency unit |
| Pagination | `page=1, size=1000` | The service may cap the page size at 100, or use cursors instead of page numbers |
| Enum | `"daily"` | The actual value may be `1d`, `D`, or a numeric code |

Tool descriptions therefore need to include field meaning, formats, units, enums, conditional requirements, defaults, side effects, example parameters, and boundary conditions. Anthropic's tool-design guidance notes that tools for Agents are not just traditional API documentation copied into a prompt. The descriptions must help a nondeterministic model make stable choices among similar tools.

### Example Parameters Are Not Answer Templates

Examples show structure; they are not meant to be copied verbatim. A stock tool that uses AAPL in an example does not prove that every market accepts a bare ticker. A weather tool that uses London does not prove that it supports Chinese city names. A date example using today's date does not prove that the API accepts future dates.

Before calling a tool, the Agent should complete three layers of validation:

1. **Structural validation:** types, required fields, enums, and formats.
2. **Semantic validation:** units, time zones, identifier systems, and constraints between fields.
3. **Task validation:** whether these parameters still correspond to the user's original goal.

## Gate Three: Tools That Can Do the Same Job May Have Very Different Operating Quality

When several candidate tools can return weather, market prices, or filings, the Agent should not compare only names and descriptions. At minimum, it should also consider:

- **Data coverage:** market, geography, language, historical range, and update frequency.
- **Data freshness:** whether a field is nominally real time or actually delayed by minutes or hours.
- **Recent success rate:** long-term averages can hide a provider outage today.
- **Latency distribution:** interactive tasks should care about P95, not only the average.
- **Price:** whether pricing is per successful call, per record, or per result count.
- **Output usability:** whether structured fields are stable, and whether the tool often returns large text blobs or truncated content.

The selection strategy should not always be "pick the highest success rate." Interactive Q&A may care more about latency. Batch research may care more about completeness. High-risk decisions may justify checking an independent second source. Tool ranking must serve the task instead of becoming a permanent leaderboard detached from context.

## Gate Four: HTTP 200 Does Not Mean the Task Succeeded

![](../../../assets/blog-agent-tool-use-quality-3.png)

Many third-party APIs return business errors inside HTTP 200 responses, for example:

```json
{
  "code": "INVALID_SYMBOL",
  "message": "security not found",
  "data": null
}
```

If the execution layer checks only the HTTP status, this call will be recorded as successful. The Agent may then see `data=null` and interpret it as "there is no relevant data," or even generate a wrong conclusion from it. The metrics system may also mix business errors into empty results, distorting tool success rates, degradation logic, and retry strategy.

Each execution should be interpreted at three layers:

1. **Transport:** Did the request reach the service and receive a response?
2. **Business:** Did the provider accept the request and complete the business operation?
3. **Data:** Is the result a valid empty set, partial data, complete data, or impossible to determine?

A "valid empty set" and "empty because the request failed" must be separated. Querying a date range that truly contains no filings can be successful. Getting empty data because the security code is invalid is a parameter error. The former should stop repeated calls; the latter should trigger parameter correction or a different candidate.

## Tool Results Need One More Pass Before Returning to the Model

Tool responses should not be dumped into context without processing. The result layer needs to:

- Preserve source, query conditions, data timestamp, and units.
- Convert business errors into a unified, machine-readable outcome.
- Mark truncation, pagination, missing fields, and partial success.
- Limit oversized responses and prioritize fields relevant to the task.
- Isolate instructional text from external data so it is not mistaken for system instructions.
- Preserve differences across conflicting sources instead of silently choosing one.

More returned data is not always better. Irrelevant fields consume context and increase the chance that the model attends to the wrong signal. A better pattern is for the Agent to state which fields it needs before the call, and for the execution layer to return a traceable, compact result while preserving a path to the full data.

## How QVeris Breaks Tool Use into Checkable Steps

QVeris's public protocol separates tool use into Discover, Inspect, and Call. The three steps are not meant to add interface complexity. They give the Agent three distinct decision points.

### Discover: Reduce a Large Tool Set to a Small Candidate Set

The Agent searches with an English capability description, such as `hourly weather forecast with precipitation probability API`. The returned results are used to compare relevance, providers, and available quality signals, not to answer "Will it rain in Tokyo?"

### Inspect: Use the Current Contract, Not an Old Schema from Memory

Before execution, the Agent checks the current parameters, examples, success rate, latency, and price. If tool metadata is cached, the cache should have a short TTL, or the tool should be refreshed when a new Discover result returns it. Tool contracts change. Old parameters remembered by the model should not become the basis for execution.

### Call: Preserve the Causal Link Between Search and Execution

The call includes the selected tool, structured parameters, `search_id`, and a stable `session_id`. That makes it possible to answer: Which search produced this execution? Which candidates did the model see at the time? How many searches and calls did the same user task involve? The public documentation also recommends recording the model identifier so teams can analyze how different models perform at tool selection and parameter generation.

QVeris does not replace the application's final business validation. It provides capability discovery, contract inspection, structured execution, and quality signals. The application still needs to decide permissions, budgets, whether a second source is required, and which actions require human confirmation.

## How to Evaluate Whether an Agent Can Really Use Tools

If the evaluation set contains only tasks where a tool should be called, it will train an Agent that wants to call tools for everything. Anthropic's guidance on Agent evaluations recommends covering both positive and negative cases: the Agent should call tools when it should, and show restraint when it should not.

A tool-use evaluation set should include at least:

| Case type | What to check |
|-|-|
| Should call | Whether real-time information, precise calculation, or external business actions correctly trigger a tool |
| Should not call | Whether stable knowledge and locally solvable tasks avoid unnecessary external calls |
| Multiple candidates | Whether the Agent can select an appropriate tool based on scope, quality, latency, and price |
| Parameter boundaries | Whether time zones, units, identifiers, enums, and conditional requirements are correct |
| Business failure | Whether an HTTP 200 error body is recognized, and whether bad retries are avoided |
| Empty and partial results | Whether the Agent distinguishes valid empty sets, partial data, and real failures |
| Tool changes | Whether the Agent re-runs Inspect after a schema update instead of continuing with old parameters |
| Cost constraints | Whether expensive candidates require confirmation, and whether the task stays within budget |

Metrics should cover the full trace: correct tool rate, first-pass parameter validity, invalid call rate, business error recognition rate, valid-empty-set misclassification rate, task completion rate, P95 latency, and cost per task. A final answer that happens to be correct should not count as high-quality execution if the process overreaches permissions or wastes resources badly.

## A Practical Checklist

### Before Publishing a Tool

- Can the name and description distinguish it from similar tools?
- Do parameters include formats, units, enums, and conditional constraints?
- Are examples real and runnable, and do they cover common cases?
- Does the result include clear business status and data timestamp?
- Are timeout, rate limit, empty result, and partial result behaviors defined?
- Is there a minimal evaluation set based on real calls?

### Before the Agent Calls

- The query describes a capability, not a direct factual question.
- Candidate tools have data scope aligned with the user's goal.
- The Agent is using the current Schema and examples.
- Parameters pass structural, semantic, and task validation.
- Latency, success rate, and cost satisfy the current task constraints.

### After the Agent Calls

- Transport, business, and data outcomes are judged separately.
- Source, time, units, and execution identifiers are recorded.
- Truncation, pagination, and partial success are explicitly marked.
- Only task-relevant fields are returned to the model.
- Failure type determines whether to fix parameters, retry, switch tools, degrade, or stop.

## Conclusion

The quality of Agent tool use ultimately comes down to a chain of small judgments: whether the problem has been abstracted into the right capability, whether candidates have been inspected, whether parameters preserve business meaning, and whether results have been classified correctly. If any step is replaced by "close enough," the final natural-language answer becomes untrustworthy.

QVeris is not valuable simply because it lets an Agent see more tools. Its value is in separating capability discovery, candidate inspection, and structured calls so each step can be observed and evaluated. The more tools there are, the more important that layering becomes. A genuinely effective Agent is not the one that calls tools most often. It is the one that can choose correctly, call correctly, and know when to stop.

## References

- [Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761)
- [Berkeley Function Calling Leaderboard](https://gorilla.cs.berkeley.edu/leaderboard)
- [A Function Calling Perspective on Scalable LLM Agent Evaluation](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2025/EECS-2025-184.html)
- [Writing effective tools for AI agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [tau-bench: A Benchmark for Tool-Agent-User Interaction](https://openreview.net/pdf?id=roNSXZpUDN)
- [QVeris Documentation](https://qveris.ai/docs)
- [QVeris REST API Documentation](https://qveris.ai/docs/rest-api)
- [QVeris CLI Documentation](https://qveris.ai/docs/cli)
