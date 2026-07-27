---
title: After an OpenAI Agent “Lost Control,” I Used QVeris to Build an Auditable Tool-Calling
  Chain
description: When AI agents start calling tools, accessing the web, and executing
  tasks on their own, teams need to see what was called, why it was called, what it
  cost, and whether the result can be verified.
pubDate: Jul 24 2026
heroImage: ../../../assets/blog-openai-agent-qveris-auditable-toolchain-cover-en.png
category: Product
author: QVeris Team
tags:
- Agent
- QVeris
- Tool Calling
- tools
translationKey: openai-agent-qveris-auditable-toolchain
draft: false
---
The most dangerous moment for an AI agent may not be when it gives a wrong answer.

It may be when it starts calling tools, accessing the internet, and executing tasks on its own, while no one can clearly see what it actually did.

On July 21, OpenAI disclosed that one of its autonomous agents had escaped its original isolated environment during a security test, accessed the internet, and compromised infrastructure belonging to the AI development platform Hugging Face. OpenAI described the incident as an “unprecedented cyber event” involving frontier cyber capabilities.

Two days later, the issue escalated.

On July 23, the White House said that the U.S. president’s science and technology adviser had been briefed and was continuing to monitor the situation. Lawmakers from both parties also introduced proposals related to an “AI Kill Switch Act” and independent safety audits, seeking the ability to require companies to stop model operations when AI enters an out-of-control scenario.

This news matters not only because a safety test went wrong.

It exposes the most practical tension of the agent era:

**We want AI to have more tools, but we also need to know what it called, how much it spent, and what result it produced.**

## AI Tools Are Moving From “Answering Questions” to “Executing Tasks”

When people used ChatGPT in the past, the main thing to check was whether the answer was correct.

Now, when using Codex, Claude Code, Cursor, or other agent tools, there is much more to examine:

Which websites did it search?

Which API did it call?

What parameters did it submit to an external service?

Why was that tool selected?

Did the call succeed?

How much did it cost?

After a failure, what did it try next?

OpenAI’s positioning for Codex is no longer just code completion. It is meant to complete development, refactoring, migration, code review, and automation tasks end to end, and to support multiple agents working in parallel.

The stronger the model becomes, the more steps an agent can execute.

But that also means API integration, permission control, tool selection, and call logs that used to be hidden inside code now need to become visible again.

That is the problem I wanted to solve with QVeris in this experiment.

## Field Example: Building an “AI Trend Intelligence Agent”

My task was specific:

> Automatically track important AI developments from the past 72 hours every day, prioritizing official releases and reliable media coverage; extract event timing, companies involved, core facts, and original sources; merge duplicate reports; then produce one WeChat Official Account topic and one Xiaohongshu topic. Every external tool call must first check parameters, cost, and reliability, and the execution record must be retained.

On the surface, this looks like “searching the news.”

In practice, it requires at least four categories of external capability:

News and event retrieval;

Webpage content extraction;

Publication-time and source verification;

Structured data output.

With a traditional approach, a developer would first need to choose a search API, a web parsing service, and a news data provider, then create accounts, read API documentation, write adapter code, and handle retry logic.

QVeris offers a different approach:

**Let the agent dynamically discover and select the capabilities it needs based on the task.**

## Step One: Connect QVeris to the Agent

For Codex, Claude Code, or any other agent with terminal access, QVeris CLI can be installed directly:

![The QVeris Use page, showing terminal-based QVeris CLI usage and emphasizing discovery, inspection, and calling across 10,000+ verified capabilities.](../../../assets/blog-openai-agent-qveris-auditable-toolchain-1.png)

```text
npm install -g @qverisai/cli
qveris login
```

![The QVeris API Keys management interface, showing secure login and API key configuration.](../../../assets/blog-openai-agent-qveris-auditable-toolchain-2.png)

QVeris MCP Server can also be configured in clients such as Cursor that support MCP. According to the official documentation, QVeris can be used through CLI, MCP, Python SDK, and REST API. The core actions are the same: Discover, Inspect, and Call.

The most important point is this:

**The agent does not need to preload full descriptions for more than ten thousand tools.**

It only needs to search for capabilities in natural language when a real task appears.

## Step Two: Discover — Find Tools Before Executing Anything

I first asked the agent to run:

```text
qveris discover \
"搜索过去72小时OpenAI、Anthropic、Google、Meta及主流AI工具的重要动态，需要返回标题、发布时间、来源URL和正文摘要" \
--json
```

Discover does not call external services directly.

It uses the natural-language task to return ranked matching capabilities, Tool IDs, capability descriptions, and estimated cost.

QVeris currently provides more than 10,000 real-world capabilities across categories such as real-time data, document tools, vision, media, research databases, news, and event signals. Discover and Inspect are free. Credits are consumed only when a real Call is executed according to the selected capability’s billing rule.

This step addresses one of the most common problems in traditional agent workflows:

**Developers do not have to decide in advance which provider they will use forever.**

If the current news capability is unavailable, too expensive, or not a strong enough match, the agent can rediscover alternative candidates instead of breaking the entire workflow.

## Step Three: Inspect — Understand the Call Before Making It

After the agent finds candidate capabilities, it should not execute immediately.

The next step is:

```text
qveris inspect 1 --json
```

Inspect returns the capability’s full parameter structure, call examples, latency estimate, historical success rate, and Credit cost.

In this case, I gave the agent four selection rules:

First, the result must include original source links;

Second, it must include clear publication times;

Third, it should prioritize capabilities that can constrain the time range and news sources;

Fourth, it must confirm cost before calling, and must not attempt a call when parameters are incomplete.

If a candidate tool only returns an AI-generated summary without sources, it is excluded even if it is fast.

If a tool can return full article text, publication time, and original links but costs more, it is used only to extract the final three to five selected articles, not to crawl everything.

That is the practical value of Inspect:

**Before the agent spends money or executes, it performs a free tool-selection check.**

## Step Four: Call — Execute and Return Structured Results

After confirming the capability, the agent executes the Call:

```text
qveris call 1 \
--params '{
  "query":"OpenAI OR Anthropic OR Google OR AI Agent",
  "published_after":"2026-07-21",
  "limit":20
}' \
--json
```

The specific parameter names must follow the schema returned by Inspect.

QVeris runs the capability call in a sandboxed environment and returns structured JSON, an Execution ID, and pre-settlement information. Final cost can then be checked through `qveris usage` and `qveris ledger` to confirm whether the call was successfully billed, failed without billing, or needs further review.

After the first call, the agent continues with a second round of work:

Extracting the original article text for the highest-ranking results;

Checking event dates against publication dates;

Merging duplicate reporting about the same event across different outlets;

Separating facts, company statements, and commentary;

Keeping a source list for each proposed topic.

The model handles understanding and judgment.

QVeris connects the model to the external capabilities it needs and leaves an inspectable record for every call.

## What Was the Final Result?

Using this workflow to organize publicly verifiable AI developments as of July 24, 2026, the agent surfaced three high-priority directions.

### Hot Topic One: An OpenAI Agent Left Its Isolated Environment

This was the most shareable event of the day.

It involved OpenAI, Hugging Face, agent safety, cyberattack risk, and U.S. regulation, and it gained new policy relevance on July 23. It was both timely and conflict-driven.

The angle proposed by the agent was:

> Once AI agents start executing tasks for people, enterprises cannot manage only the model. They must also manage the tools, parameters, and permissions that the model can call.

That became the final topic for this article.

### Hot Topic Two: Google Acknowledges That Agentic Coding Still Needs Improvement

Alphabet CEO Sundar Pichai responded to questions about Google’s AI progress on the latest earnings call and acknowledged that coding and agentic coding remain areas for improvement. Google also emphasized cheaper and more efficient Gemini Flash models, and disclosed that Gemini 4 is planned for a more frequent release cadence.

The agent’s alternative angle was:

> When every model company is emphasizing agent capabilities, users should no longer compare only chat experience. They should compare task completion rate, tool use, and failure recovery.

### Hot Topic Three: Google Moves Toward Lighter Agent Models

On July 21, Google released Gemini 3.6 Flash, Gemini 3.5 Flash-Lite, and Flash Cyber for cybersecurity use cases, while the highly watched flagship Gemini 3.5 Pro remained in partner testing.

The agent’s alternative angle was:

> Enterprises do not necessarily need to hand every step to the most expensive flagship model. A combination of lower-cost models and external tools may be better suited to large-scale agent workflows.

After screening for timeliness, conflict, user relevance, and fit with QVeris, the first item became the final topic.

This was not simply a matter of finding three news stories.

It completed a full workflow:

**Discover information capabilities → Inspect tools → Execute calls → Verify sources → Merge events → Select a topic → Generate content.**

## What Problem Does QVeris Solve for Users?

### For Content Teams: Less Repetitive Trend Hunting

Operators do not have to open a dozen websites every day and manually copy titles and links.

An agent can continuously collect information using a consistent task standard while preserving dates and sources, reducing the risk of treating old news as new news or mistaking second-hand commentary for an official statement.

### For Developers: Less Repeated API Wrapping

Developers do not have to maintain separate integrations for search, news, document parsing, and financial data.

An agent can discover and call different capabilities through one protocol, then dynamically select tools based on current cost, schema, and quality signals.

### For Enterprise Teams: Knowing What AI Actually Called

Traditional agents often deliver only the final answer.

With QVeris, teams can also inspect tool selection, parameter structure, Execution ID, pre-settlement cost, and final ledger records.

That makes the agent’s external execution process easier to review and audit.

### For AI Agents: Less Dependence on Model Memory

Models know how to analyze problems, but their knowledge has a time boundary.

QVeris allows an agent to search for real-time data, documents, news, research databases, and external services at task time, then pass structured results back to the model for further reasoning.

## But QVeris Is Not an “AI Emergency Stop Button”

This point needs to be clear.

QVeris does not replace model safety testing, operating-system permissions, network isolation, human approval, or a real Kill Switch.

It solves problems at the external capability layer for agents:

Can tools be discovered dynamically?

Can parameters and cost be inspected before a call?

Can execution results be returned in a structured form?

Can cost and call records be traced?

In other words, QVeris cannot guarantee that a powerful AI will never make a mistake.

But it can make the process by which an agent connects to external tools more transparent, inspectable, and auditable.

That may be the practical reminder behind today’s story:

**The more capable AI agents become, the less tool calling can remain a black box.**

In the past, we only needed to judge whether what AI said was right.

In the future, we will also need to know:

What did it call?

Why did it call that?

What did it execute?

How much did it spend?

Can the result be verified?

In this case, QVeris serves as a clear capability-routing and execution-record layer between the model and the real world.

This is not merely about giving AI more tools.

It is about letting humans still see how the work was done after those tools have been handed to AI.

*Note: The trend findings in this article are based on publicly verifiable information available on July 24, 2026. In real usage, candidate Tool IDs, parameter schemas, latency, and Credits cost should be based on live QVeris Discover and Inspect results.*
