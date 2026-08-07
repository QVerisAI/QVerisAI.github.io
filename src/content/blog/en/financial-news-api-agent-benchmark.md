---
title: How Should AI Agents Choose a Financial News API? 360 Live Tests Across 7 Providers
description: QVeris ran 360 live observations across 7 financial news API providers
  to clarify which data source fits each agent task.
pubDate: Aug 04 2026
heroImage: ../../../assets/blog-financial-news-api-agent-benchmark-cover-en.png
category: Research
author: QVeris Team
tags:
- qveris
- financial-data
- ai-agent
- benchmark
translationKey: financial-news-api-agent-benchmark
draft: true
---
> After 360 live observations, we are not publishing a single leaderboard. We are answering a more useful question: which data source should an agent use for a specific task?

When a financial agent receives a request such as "look up recent news about Tencent," the hard part is not writing a summary.

It first has to solve a set of more basic problems. Should it send `0700.HK`, `700:HK`, or `0700` to the data source? When the user asks for Chinese-language news, does the API actually support language filtering, or does the agent have to rely on keywords and hope for the best? If the API returns HTTP 200 but the results are unrelated, should that count as a success or a failure?

Those details determine whether the final answer comes from live data or from model memory and guesswork.

To examine this, we ran a public benchmark on August 3, 2026, covering Brave, Caidazi, EODHD, Finlight, Gildata, Linkup, and NewsAPI. In total, we completed **360 live observations**: 316 general scenario observations and 44 strict ticker observations. For every scenario an API could support, we ran two consecutive rounds, covering company news, macro topics, cryptocurrency, FX, invalid inputs, Chinese professional financial content, and nine listed markets.

The goal was not to declare one provider the "best" among the seven. Some providers are strong at global discovery. Some are strong at Chinese professional financial content. Some are strong at returning structured company news when given a ticker. What users and agents actually need to know is which product is better suited to the task in front of them. Compressing very different capabilities into one overall score would make vendor selection less accurate, not more.

![Measured performance of seven providers across five agent scenarios; green indicates the share of relevant results, red indicates that the provider did not meet the scenario standard, and gray indicates N/A](../../../assets/blog-financial-news-api-agent-benchmark-1.png)

## Finlight Stands Out When the Agent Already Knows the Ticker

In this round of testing, Finlight's clearest strength was not maximum search breadth. It was the ability to **return structured company news consistently when the agent already knew the ticker**.

We made 24 ticker-based calls to Finlight, and every response could be parsed programmatically. Across the United States, Hong Kong, mainland China, Japan, Germany, France, Brazil, India, and Spain, both consecutive rounds found relevant news for the target company. We also deliberately submitted a nonexistent ticker and two ticker formats that do not follow Finlight's rules. All of them returned empty results instead of padding the response with unrelated news. The median latency for this group was **2,298 ms**, or about 2.3 seconds.

![Strict ticker news test: Finlight covered 9/9 markets in two consecutive rounds; green indicates pass, red indicates fail, gray indicates N/A, and the orange outline marks Finlight](../../../assets/blog-financial-news-api-agent-benchmark-2.png)

One easily missed detail is that Finlight's `tickers` filter expects the company's **primary listing symbol**.

For example, Kweichow Moutai should be queried as `600519`, not the Yahoo Finance style `600519.SS`; Brazil's Petrobras should use the primary listing symbol `PETR3`, not the secondary listing symbol `PETR4` on the same exchange. We therefore kept `600519.SS` and `PETR4` as explicit invalid-format tests, rather than misclassifying empty results as "China is unsupported" or "Brazil is unsupported."

This is one of the most common integration traps for agents working with financial data: **market coverage and ticker dialects are different things**. An API's inability to understand a particular symbol format does not mean it lacks data for that market.

Finlight's response format is also convenient for downstream agent processing. In addition to basic fields such as title, timestamp, and source, it provides language, countries or regions associated with the article, sentiment, categories, and company entities. The two fields named `confidence` need to be interpreted separately: the article-level value represents confidence in the sentiment judgment, while the company-object value represents confidence that the article is related to that company. Finlight's own API also returns ISIN, OpenFIGI, MIC, and listing information, which makes it suitable for security identification and data linking.

## When the Task Changes, the Right Data Source Changes Too

If the question changes from "find news about this stock" to "discover content across the global web that may be related to this company," the selection criteria change as well. At that point, the agent may not yet have an accurate ticker. It needs to uncover clues first.

In the global company-news tests, Linkup found relevant results in all 18 observations. Caidazi, EODHD, and Gildata also met the standard we set for this scenario. Finlight could only participate in two cases, for four total observations, and found relevant content in two of those observations. That sample and result set were not enough for us to recommend Finlight as a first choice for global company discovery.

There is no contradiction here. Linkup behaves more like open web search and is good at broadly retrieving potentially relevant material. Finlight behaves more like a structured financial news product and is better suited to precise retrieval once the target company is already known.

Chinese-language scenarios also need to be split further. In tests for mainland China and Hong Kong company news, Gildata Stock News, EODHD, and Linkup all found relevant results in 4/4 testable observations. For Chinese professional financial information involving funds, industries, and institutions, Caidazi Hybrid Search V2 and Gildata Public Opinion both found relevant content in 6/6 rounds, with all top-five results relevant to the question. In that group, Caidazi returned more complete information, clearer source attribution, and faster responses than Gildata Public Opinion.

For macro, cryptocurrency, and FX topics, Linkup found relevant content in 12/12 observations. Gildata Public Opinion and NewsAPI were also relatively stable. Finlight found relevant content in 4 of 6 observations, and its returned information was complete each time, with a median latency of **2,091 ms**, or about 2.1 seconds. This shows that breadth of discovery, completeness of returned fields, and speed are three different properties. They should not be collapsed into one score.

![Macro and cross-asset news: bar length indicates the share of relevant results; cyan shows the regular comparison group, orange marks Finlight, and green indicates 100% performance in the scenario](../../../assets/blog-financial-news-api-agent-benchmark-3.png)

## Content Returned by an API Does Not Mean the Agent Answered Correctly

When evaluating news APIs, we separated three questions:

- **Can the program read it?** Is the response format valid, and can the agent continue processing it?
- **Does it return results when it should, and avoid inventing results when it should not?** Normal queries should find content. Deliberately invalid queries should return empty results honestly.
- **Is the content actually relevant?** Do the top five results mention the target company or topic, rather than returning a generic set of trending news?

If these three questions are merged into one "success rate," the results become misleading. An API that returns irrelevant trending news can appear to score well, while an API that honestly returns empty results can be penalized.

That is why we explicitly included invalid search terms and invalid tickers. In macro scenarios, Linkup, Brave, and Caidazi still returned other content when given invalid search terms. This does not erase their value on normal questions, but agents using these APIs need an additional relevance check for the company or topic. Otherwise, it is easy to mistake "the API returned content" for "the question was answered correctly."

## Can Finlight Search Chinese News? We Ran 34 Additional Tests

In the first round of testing, we only saw English results. But "English by default" and "English only" are not the same thing, and it would be wrong to draw a conclusion from one default configuration.

According to Finlight's API documentation, news can be filtered by language, with English as the default. To verify whether it could return Chinese content consistently, we did not stop at the documentation. We ran a separate Chinese-language test.

To resolve the question directly, we made **34 independent supplemental calls** to the Finlight API. These 34 calls are not included in the 360 public comparison observations above. When using `zh`, `zh-CN`, and `zh-Hans`, both consecutive rounds returned Chinese results.

The source list queried that day contained **121 sources**. Among the 62 default sources, 27 stated support for Chinese, covering nine mainland Chinese media groups. Finlight later confirmed that the `countries` field in returned results represents **the country or region primarily associated with the article**, not the media outlet's location, the company's place of registration, or the company's listing market.

## How to Choose: Do Not Ask Who Is Best. Ask Where Your Agent Starts.

This benchmark was not designed to choose the single "best" financial news API. The more useful conclusion is to start with what the agent already has, then decide which data product is needed next.

**If the agent already has a reliable ticker, precision matters most.** For example, when a user asks, "what important news has there been about `AAPL` recently?", the agent already knows the target company. It does not need to infer the company from the entire internet. In this case, the focus should be whether the ticker can be recognized accurately, whether the news is actually about the target company, whether fields such as title and source are complete, and whether the API avoids filling invalid ticker queries with unrelated content.

From this starting point, Finlight was the better fit in this round of testing: it found target-company news across nine markets in two consecutive rounds, and invalid tickers returned clean empty results. Its usage condition is also clear: upstream ticker normalization should already be in place. `600519.SS` and `600519` may both look like Kweichow Moutai to a person, but they are different formats to the API. If an agent receives symbols from different markets and terminals, it needs a normalization layer first. If the workflow itself heavily uses exchange-suffixed tickers, EODHD is also worth comparing, but the agent needs explicit handling logic for API errors.

**If the agent only has a company name or an open-ended question, discovery matters most.** For example, "look up what has recently happened to Tencent overseas" may involve the company's Chinese name, English name, subsidiaries, and product names. The agent's first step is to discover relevant content, not to query a confirmed ticker with precision.

In this round of global company discovery tests, Linkup found relevant results in 18/18 observations, making it better suited to the broad discovery step. The tradeoff is that open web content is usually noisier. The agent still has to deduplicate results, judge company attribution, filter sources, and rank relevance. A more mature workflow can use a discovery-oriented product to find leads, then use a structured financial news product to verify the company and enrich the data. One provider does not have to handle every step.

**If the agent serves the Chinese market, separate company news from professional financial information.** "What recent news is there about Tencent?" and "Which mutual funds have recently been paying attention to the AI industry?" are both Chinese-language questions, but they require different data. For the former, Gildata, EODHD, Linkup, and Caidazi deserve closer comparison. For the latter, where the context involves funds, industries, and institutions, Caidazi and Gildata are stronger candidates in this round of testing.

So "does it support Chinese?" is not specific enough. Vendor selection should continue with more precise questions: is it good at listed-company news, fund information, industry updates, or institutional public opinion? Finlight's supplemental test proves that it can return Chinese news, but that does not automatically mean it is better than localized products in every Chinese professional-finance scenario.

**If the agent starts from a macro or cross-asset topic, choose between breadth and processability.** "What factors have recently been affecting gold?" has no single company and no fixed ticker. A research agent usually needs to gather enough material before summarizing common themes. An automated monitoring agent cares more about stable fields, classification, sentiment, and alerting.

In this round, Linkup was more stable at finding relevant content for macro, cryptocurrency, and FX topics. Finlight found less broadly, but returned more complete information each time. The better choice depends on whether the results are meant for direct human reading or further automated processing by an agent.

In real deployments, there is one final question: what is the cost of a missed result or a wrong answer? For prototypes, personal research, or low-frequency tasks, one primary data source may be enough. For production monitoring, investment research workflows, or decision-critical scenarios, backup sources and result validation should be added according to the cost of failure. More data sources are not automatically better. What matters is whether they cover the failure modes that actually matter.

These recommendations also have a time boundary. News content changes with the news cycle, licensing scope, pricing plans, ingestion speed, and API behavior. Two consecutive rounds can show whether results were repeatable at the time of testing, but they cannot replace long-term stability statistics. We therefore recommend retesting quarterly, and adding supplemental tests whenever a provider changes its API, source coverage, language capabilities, or ticker rules.

## This Is Not a Standalone Review

This article is the starting point for the **QVeris Data Provider Benchmarks** series.

Next, we will continue publishing real call results for providers across market data, fundamentals, news and sentiment, funds, macro data, alternative data, and more. We will keep testing stability, agent usability, field semantics, invalid-input behavior, and whether the integrated experience matches the product's stated capabilities.

QVeris is not simply trying to put more APIs into a directory.

**On one side, we are building an integrated data access layer for AI agents**: unifying provider authentication, ticker formats, request parameters, response schemas, and failure handling, so agents do not have to learn every provider's "data dialect" one by one.

**On the other side, we are building a neutral data evaluation layer**: using public methods, fixed cases, and real calls to keep telling developers which scenarios each provider fits, and what conditions and risks come with using it.

Data access answers "can we call it?" Neutral evaluation answers "should we trust it, and in which scenario?" Together, they form the data infrastructure that agents actually need.

If you are a data provider and want to be included in future public benchmarks, update API documentation, or discuss integration issues, visit [QVeris Provider Hub](https://qveris.ai/providers), or email [support@qveris.ai](mailto:support@qveris.ai) with the subject line "Data Provider Benchmark."

If you are choosing data sources for an agent, follow the upcoming articles. We will keep testing directly instead of drawing conclusions from brochures.

---

**Benchmark note**: This article is based on live observations completed on August 3, 2026. It is a vendor-selection reference that can be retested using the same method.
