---
title: 'After Financial Skills Connect to QVeris, AI Finally Does More Than Write Reports'
description: 'Over the past period, I focused on refactoring and testing a batch of Financial Skills.'
pubDate: Jul 15 2026
heroImage: ../../../assets/blog-financial-skill-qveris-agent-1.png
category: Product
author: QVeris Team
tags:
  - QVeris
  - Agent
translationKey: financial-skill-qveris-agent
draft: false
---
# Financial Skill Integration with QVeris: AI Finally Moves Beyond Just "Writing Reports" (Illustrated Edition)

![The image depicts the QVeris platform's operational scenario. Centered is a blue ring bearing the "QVeris" logo, surrounded by blue light bands connecting multiple icons including charts, documents, tables, smileys, chat bubbles, and checkmarks. A chat bubble icon appears on the left, while a display screen showing charts and textual information is on the right. The background features a blue gradient with chart and data elements. This image closely relates to the context, intuitively presenting the scene where Financial Skill integrates with QVeris to connect real capabilities and generate auditable results.](../../../assets/blog-financial-skill-qveris-agent-1.png)

Over the past period, I focused on refactoring and testing a batch of Financial Skills.

They cover A-share market data, factor screening, market intelligence, financial research, news sentiment, valuation audits, and portfolio risk scenarios. Originally developed from different projects with varying interfaces, fields, and execution methods.

After integrating them with QVeris, the most noticeable change isn't longer reports or model responses sounding more like analysts.

The real transformation is:

> AI now possesses a unified pathway to discover, verify, and invoke genuine financial capabilities.

Users can directly say: "Help me review NVDA's latest financial report," "Check TSLA's recent market sentiment," or "Audit concentration and drawdown risk for this portfolio."

The Skill understands the task, identifies the required market data, financials, news, or risk capabilities, invokes real data, and then compiles the results into a report with evidence and data quality explanations.

This refactoring has solidified my conviction:

> The value of QVeris lies not in adding more APIs to AI, but in transforming various professional capabilities into stable, usable infrastructure for Agents.

## 01 Financial Agents Lack Real Capabilities, Not Expression

Modern models are already adept at writing.

Give it a stock code, and even without the latest market data, it can quickly generate a structurally complete analysis: company overview, industry trends, valuation logic, and potential risks—covering all bases.

The issue is that financial research isn't a writing contest.

What users truly care about includes:

- What happened to today's price and trading volume;
- Whether the latest financial report exceeded market expectations;
- Whether news is genuinely relevant to the target company;
- Whether capital flows, valuations, and fundamentals align;
- Which conclusions are evidence-based, and which remain unconfirmed.

These questions can't be answered solely with outdated knowledge in model parameters.

Agents need to connect to real-time market data, historical sequences, financial statements, news, announcements, capital flows, sentiment signals, and macro data—while knowing each capability's required parameters, returned fields, and call success status.

Previously, integrating these capabilities was a repetitive, tedious engineering task.

Developers had to individually seek data sources, read documentation, apply for keys, adapt fields, handle authentication, and write separate logic for each error type. Switching suppliers often meant starting over.

QVeris streamlines this into three steps: Discover, Inspect, Call.

First, discover capabilities using natural language. Second, inspect parameters, structure, and quality information. Third, execute real calls.

For developers, this is a unified capability entry point; for Agents, it means they don't need to pre-know all tools to find the right capability for the current task.

## 02 Skills Now Speak the Same "Capability Language"

These Financial Skills originally came from diverse sources, structures, and use cases.

They covered A-share market data, company profiles, financial information, factor screening, news announcements, market intelligence, multi-market stock research, valuation audits, and portfolio risk scenarios.

Previously, they might have relied on different vendors, web scraping, local scripts, or environment variables. Now, core financial capabilities converge uniformly under `qveris_finance.*`.

Market data, financials, news, sentiment, capital flows, market breadth, and event data now use the same invocation method and output contract.

This change delivers immediate benefits.

First, Skills become easier to migrate.

They're no longer tied to a specific local environment or requiring separate configuration of multiple vendor keys. Once integrated with QVeris, they can call required capabilities around the task.

Second, development costs drop significantly.

Skill authors can focus on research processes, business rules, and user experience rather than repeatedly handling different API authentication and field discrepancies.

Third, capabilities can be continuously expanded.

When QVeris adds new data or tool capabilities, Agents can use them via discovery and inspection mechanisms without hardcoding each tool into the codebase.

Fourth, multiple Skills can share the same quality standards.

Whether the task involves A-share data packages, financial report reviews, or portfolio risk checks, reports can uniformly present data quality, missing fields, and call logs.

This transforms Skills from isolated tools into a compositional Financial Agent capability ecosystem.

## 03 Users Only Need to Speak Naturally—Complex Calls Are Handled by QVeris

After refactoring, we conducted end-to-end tests using near-real user natural language.

Test queries included:

- Review NVDA's latest financial report and explain which conclusions are data-supported;
- Audit key inputs in MSFT's DCF model;
- Generate TSLA's market sentiment and valuation explanation;
- Check AAPL's financial report and liquidity status;
- Determine current market conditions;
- Analyze concentration and risk in an investment portfolio.

Behind these queries, different capabilities were required.

Financial report reviews might need actual values, market expectations, financial statements, and conference call data; market sentiment requires market data, news, and sentiment signals; portfolio risk needs historical prices, volatility, correlations, and drawdown data.

But for users, the entry point remained a single sentence.

The Skill handles task understanding and research workflow organization; QVeris connects to real capabilities; and the final output is a structured, readable Markdown report.

All multi-type natural language tasks completed full workflows.

This demonstrates QVeris isn't just a developer-facing API collection—it's now capable of supporting natural language-driven Agent workflows: users describe goals, Agents find capabilities, QVeris executes calls, and Skills organize results.

From "manually finding interfaces" to "directly stating tasks," the middle layer of repetitive engineering details is eliminated.

## 04 QVeris Makes Reports Not Just Readable, But Audit-Ready

Financial AI often creates an illusion: the more complete the report, the more users believe it.

But truly reliable systems should let users know how the report was generated.

After integrating QVeris, Skills uniformly supplement data quality, missing fields, and call logs.

First, data quality.

Reports clarify whether data is complete, time windows are sufficient, financial periods match, and news is relevant to the target company.

Second, missing fields.

If consensus estimates, conference calls, or sentiment data are temporarily unavailable, reports explicitly list them instead of silently skipping or having the model fill gaps.

Third, call logs.

Reports retain which QVeris capabilities were used, key parameters, call status, and fallback paths—all while avoiding exposure of underlying sensitive routing.

This means users receive not an unbreakdownable AI text, but a verifiable research result.

"Which data supported this statement?"
"Why wasn't forward valuation calculated?"
"Is this conclusion based on full evidence or partial evidence?"

These questions find answers within the report.

For Financial Agents, this audibility is critical. It moves AI from a conversational tool that expresses opinions toward a research assistant entering real workflows.

## 05 Real-World Data Isn't Perfect—QVeris' Value Lies Here

This testing wasn't flawless every time.

We encountered temporarily unavailable capabilities, upstream service 503 errors, short time series, mismatched financial periods, and overly broad news scope.

But these very scenarios prove that real-world Agents need more than a "always pretend success" demo environment—they need infrastructure to handle complex capability states.

QVeris enables Skills to check capabilities before calls and verify results after calls, taking different actions based on issue types.

Upstream service failures trigger lightweight retries; unavailable capabilities halt calls and switch paths; mismatched return objects or financial periods lead to direct rejections; insufficient data points stop trend, volatility, and drawdown calculations.

Thus, interface errors no longer inevitably become incorrect conclusions in reports.

More importantly, QVeris transforms these states into information Agents can understand and handle.

This benefits both developers and users.

Developers don't reimplement scattered error handling in each Skill; users see which evidence is available and what still needs supplementation.

A truly usable capability platform doesn't just help Agents complete tasks smoothly—it also guides them to make correct choices when things go wrong.

## 06 From Single Tools to Composable Financial Agent Workflows

After integrating these Skills, QVeris' more promising direction became evident.

They don't need to run independently forever.

A complete stock research task could first call Market Intelligence Skill for market news context, then Financial Research Skill to check revenue, cash flow, and valuation inputs, and finally Risk Skill to assess volatility, liquidity, and event risks.

An A-share candidate pool task could first use Factor Skill for initial screening, then Data Layer Skill to supplement company and announcement information, and finally generate evidence-based research cards.

When all Skills use the same capability entry point, quality fields, and call logs, such combinations become natural.

QVeris acts as the capability routing layer in the Agent world:

> Connecting user tasks and different Agent types above, while linking fragmented professional data, tools, and services below.

Agents don't need to know every vendor's details—just describe the work needed. Capability providers can be discovered and invoked by more Agents through a unified method.

This shifts Financial Skill development from "building one feature per interface" toward "composing multiple capabilities around a user task."

## 07 QVeris Is Pushing Financial AI Toward True Usability

After integrating QVeris, Financial Skills can now handle natural language understanding, capability selection, real data calls, quality checks, failure degradation, and report generation.

They'll continue improving, but have already proven a viable path:

Financial Agents don't need to bind to single data sources or blindly guess when data is insufficient.

Through QVeris, Agents can first discover capabilities, inspect them, call them, and then organize conclusions based on real evidence.

For ordinary users, this means the barrier to using financial data is lowering.

Tasks once requiring terminals, interface searches, and table formatting are now natural language commands.

For developers, this means the barrier to building professional Agents is also lowering.

No need to rebuild each external capability's connection layer from scratch—focus more on scenarios, workflows, and product experience.

For capability providers, QVeris offers a new entry point for Agents to discover, evaluate, and call their services.

## Final Thoughts

If we only look at text generation, AI has long been able to write financial reports.

But from "being able to write" to "being usable," the missing pieces are real data, professional tools, unified protocols, quality validation, and auditable records.

This is precisely what QVeris is filling in.

After integrating Financial Skills with QVeris, what I see isn't just a simple interface migration—it's a new Agent workflow:

Users describe goals in natural language, Agents understand tasks, QVeris connects capabilities, Skills turn data into results, and the entire process remains inspectable and reusable.

> QVeris enables AI not just to answer questions, but to truly possess the capability to complete professional tasks.

As more data, tools, and services become discoverable and callable through the same method, Agents can do more than what a single model or pre-coded application allows.

This may be QVeris' most promising aspect:

It's transforming fragmented real-world capabilities into infrastructure usable by every Agent.

---

This article documents the product refactoring and testing practice of QVeris Financial Skills, intended solely for technical and product discussion, and does not constitute any investment advice.
