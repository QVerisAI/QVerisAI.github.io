---
title: 'New Large Models Do More Than Chat: Try Kimi K3, Claude Fable 5, and GPT-5.6-Sol
  in QVeris.ai Playground'
description: As new model releases accelerate, what truly impacts user experience
  is no longer just "whether the model appears i
pubDate: Jul 18 2026
heroImage: ../../../assets/blog-qveris-playground-new-models-cover-en.png
category: Product
author: QVeris Team
tags:
- QVeris
- Agent
translationKey: qveris-playground-new-models
draft: false
---
# New Large Models Go Beyond Chatting: Experience Kimi K3, Claude Fable 5, and GPT-5.6-Sol in QVeris.ai Playground

As new model releases accelerate, what truly impacts user experience is no longer just "whether the model appears in the list," but whether you can immediately validate it with real questions: does it retrieve data, can it call tools, are results traceable, and what time and cost does a single task actually consume?

Now, the latest models—Kimi K3, Claude Fable 5, and GPT-5.6-Sol—are available for direct体验 in [QVeris.ai Playground](https://qveris.ai/playground). Users don’t need to register on multiple model platforms or write API integration code first. Simply select a model, input a question, and observe the full process from reasoning to tool calls to answer generation.

This article avoids the typical parameter-table "cloud benchmark." Instead, we use the latest product interface to complete three real-world tasks: real-time currency conversion, open-source technology selection, and public account content creation—with key processes and results fully documented via screenshots.

## One Playground, Connecting Models to the Real World

QVeris Playground currently integrates over 10,000 real, validated capabilities. For questions requiring external information, models can complete **Discover → Inspect → Call → Answer** within the same conversation:

1. **Discover**: Recalls candidate capabilities from the tool library based on natural language requests;
2. **Inspect**: Checks parameters, success rate, latency, and call cost;
3. **Call**: Executes real calls with structured parameters;
4. **Answer**: Organizes returned data into actionable conclusions.

Tool discovery and inspection are free; actual calls display billing units, latency, and success status in the interface. Compared to showing only the final answer, this workflow better distinguishes whether the model is "answering from memory" or completing a verifiable, traceable task.

![The image shows the QVeris.ai Playground Live Demo interface. The top navigation includes Explore, Use, Developers, etc. The center displays "Live Demo" with a description of discovering, inspecting, and calling over 10,000 real-world validated capabilities. Below are examples labeled "Stocks" (analyzing NVIDIA earnings) and "Earnings" (summarizing Apple 10-K highlights). The bottom input field prompts "Ask me anything..." with "Research" and "Forex" tags. This image aligns with the Discover→Inspect→Call→Answer workflow described in the text.](../../../assets/blog-qveris-playground-new-models-1.png)

## Three New Models, Three Different Task Types

**Kimi K3** is the default model in Playground, offering 1M context. In this test, it decomposed natural language questions into data needs, discovered, filtered, and called real-time currency tools—ideal for long-context analysis and multi-step tool tasks.

**GPT-5.6-Sol** provides 1.1M context. During the open-source project comparison task, it completed multi-round retrieval and tool calls, delivering structured research with query time, specific data, and applicable boundaries—suited for structured research and complex tool orchestration.

**Claude Fable 5** offers 1M context. It demonstrated strong visual imagery, structural awareness, and restrained expression in Chinese content creation—perfect for brand content, public account intros, and long-form rewriting.

Playground also supports direct selection of models like Gemini 3.1, DeepSeek V4, and Claude Sonnet 5. Model selection is no longer a pre-project decision but a quick, task-based trial and comparison within the same interface.

## Case Study 1: Kimi K3 × Real-Time Currency Conversion—From Data Call to Precise Calculation

The first task seemed simple: query the current USD/CNY exchange rate and calculate how much 1,000 USD converts to RMB. The real requirement was to use only one real-time tool, with the answer including query time, rate, and result—no model memory allowed.

> Only call a real-time currency tool to query the current USD/CNY rate and calculate how much 1,000 USD converts to RMB. Output only one line: query time, rate, conversion result; no process explanation.

Kimi K3 first discovered 10 candidate tools, compared historical success rates, latency, and cost, then selected Alpha Vantage’s real-time currency capability. The call succeeded within 1,199ms at a cost of 2 credits. The final output provided query time (2026-07-18 06:16:46 UTC), 1 USD = 6.77682896 CNY, and 1,000 USD = 6,776.83 CNY.

The value here isn’t the exchange rate itself, but the transferable workflow: **clear calculation goal → discover candidate tools → filter by quality → execute call → verify and convert**. This pattern applies to stock valuation, product pricing, budgeting, and cross-border procurement.

![The image shows Kimi K3 calling real-time currency tools in QVeris.ai Playground. It displays call time (1,199ms), cost (2 credits), and the final result: query time, 1 USD = 6.77682896 CNY, and 1,000 USD = 6,776.83 CNY. Below, "Thought" and "Call" sections show details like TotalTime and First token. The bottom input field allows model selection. This image directly illustrates Kimi K3’s real-time currency call process.](../../../assets/blog-qveris-playground-new-models-2.png)

## Case Study 2: GPT-5.6-Sol × GitHub Data—From Metrics to Technical Selection

The second task required comparing two real open-source projects. We didn’t just ask for Star counts—we also requested Open Issues, latest Release/Tag dates, and transformed data into a new project selection recommendation.

> Call the GitHub data tool to compare vercel/next.js and vitejs/vite: current Star count, Open Issues count, latest Release/Tag date. Provide a selection recommendation for a new project based on this. Must make a real tool call with query time; output under 300 words.

GPT-5.6-Sol completed tool discovery, inspection, and multiple calls, citing query time (2026-07-18 06:10 UTC). Results showed: vercel/next.js has 141,000 Stars, 2,190 Open Issues, latest Release v16.2.10; vitejs/vite has 81,971 Stars, 485 Open Issues, latest Release v8.1.5.

More importantly, the model didn’t equate popularity with "better fit." It tied data to architectural needs: Next.js preferred for React full-stack, SSR/RSC, convention-based routing, and integrated deployment; Vite favored for SPA, static sites, component libraries, or when emphasizing framework freedom and development speed—with a clear note that Stars and Issues only reflect project scale.

The interface also logged 28 tool calls, total time, first token time, token usage, and total credits. For technical research, this visibility is critical: readers see not just the conclusion but the data acquisition process behind it.

![The image shows GPT-5.6-Sol’s GitHub data query results in QVeris.ai Playground. It displays 28 tool calls, total time (154.844s), first token time (6.81%), token usage (2,289), and project data like Open Issues counts and latest Release versions. The bottom input field allows pre-call estimation. This image visually demonstrates the end-to-end process from metric query to technical selection.](../../../assets/blog-qveris-playground-new-models-3.png)

## Case Study 3: Claude Fable 5 × Content Creation—Technical Credibility, Plus Readability

Tool calls solve "where data comes from," but content models must solve "how to keep readers engaged." The third task deliberately avoided external tools to test whether Claude Fable 5 could transform abstract tech into vivid, detailed, non-hype public account intros.

> Write a public account intro under 180 characters for "AI Agent can real-time retrieve and call 10,000+ tools," balancing vivid imagery and technical credibility while avoiding exaggerated marketing terms.

Claude Fable 5 began with "At 2 a.m., a user request arrives," using specific details like vectorized semantic retrieval, candidate recall, success rate and latency filtering, and parameter assembly to support the narrative, concluding with "finding the right key." It also proactively explained its approach to vivid imagery, technical credibility, restrained expression, and character count.

This shows Playground isn’t just for data research. After fact-checking, users can switch models to refine results into article intros, product descriptions, social media copy, or versions in different tones.

![The image shows QVeris.ai Playground interface for content creation. The top navigation allows module selection. Below, a writing rationale explains vivid imagery, technical credibility, restrained expression, and character limits. The center input field prompts the question. The bottom shows estimated calls, tool calls, output tokens, and a "Pre-call estimate" section for model and mode selection. This image aligns with the "how to replicate these cases" section.](../../../assets/blog-qveris-playground-new-models-4.png)

## How to Replicate These Three Cases

1. Open [QVeris.ai Playground](https://qveris.ai/playground);
2. Select Kimi K3, Claude Fable 5, or GPT-5.6-Sol below the input field;
3. For data tasks, explicitly state "must make real tool calls, include query time, no memory-based answers";
4. Observe the Discover, Inspect, and Call cards to check success rate, latency, billing, and results;
5. Switch models as needed to continue analysis, comparison, or content refinement.

## Three Directly Copyable Prompts

**Market Research:** Call real market data tools to fetch current stock prices, market caps, and latest quarterly revenue for two companies. Unify currency and reporting period, then compare valuations. Include data time and source; not investment advice.

**Travel Planning:** Call weather, flight, and map tools to create a weekend trip comparison for two destinations. List data first, explain trade-offs, then give a clear recommendation.

**Product Research:** Call real public data and web scraping tools to compare two open-source projects’ activity, latest version, Issue status, and use cases. Don’t equate Star counts with technical judgment.

## Conclusion: Choose Models, But Also Choose Task Completion Paths

New models are worth trying, but meaningful evaluation shouldn’t stop in the chat window. Whether a model finds the right tool, understands parameters, retrieves the latest data, controls costs, and compresses the process into a clear conclusion matters more than a single ranking score for real work.

In QVeris.ai Playground, models, data, and tools are placed on the same visible chain. Use Kimi K3 for multi-step data tasks, GPT-5.6-Sol for structured research, and Claude Fable 5 for content expression. The best model isn’t a fixed answer—it’s the one most suited to the current task and capable of actually completing it.

**Experience Now:** [Open QVeris.ai Playground](https://qveris.ai/playground)

Note: Screenshots and data collected on July 18, 2026. Real-time data changes over time; example market and project data are for demonstration only and do not constitute investment or technical procurement advice.
