---
title: 'Anthropic Just Open-Sourced a Finance Agent Showroom. We Have Been Building the Most Valuable Third Layer All Along'
description: 'Anthropic just open-sourced a finance Agent showroom. We have been building the most valuable third layer all along'
pubDate: 'Jun 17 2026'
heroImage: '../../../assets/blog-anthropic-finance-agent-third-layer-hero-en.jpg'
category: 'Product'
author: 'QVeris Team'
tags: ['QVeris', 'Agent', 'Finance']
translationKey: 'anthropic-finance-agent-third-layer'
---
QVeris · Industry Insights



Anthropic recently released the reference repository for Claude for Financial Services. Many people’s first reaction was: another finance AI Agent demo.

We see it more as an industry signal.

The most important part is not whether Claude can write pitch decks, update DCF models, or read earnings calls. Large models being able to write financial analysis is no longer news.

What is truly worth paying attention to is how Anthropic breaks down what it takes to run a financial AI Agent in production into three layers: Agent, Skill, and Connector.

Once these three layers are separated, many of the reasons why “Agents cannot land in production” stop being mysterious.

![](../../../assets/blog-anthropic-finance-agent-third-layer-1.png)
## /

The first layer is 10 end-to-end Agents.

The Pitch Agent builds pitch decks, from comps, precedent transactions, and LBOs to branded formatting. The Meeting Prep Agent creates client pre-meeting briefing packs. The Market Researcher turns industry themes into competitive landscapes and target lists. The Earnings Reviewer reads earnings calls, updates models, and drafts research notes. The Model Builder creates DCFs, LBOs, three-statement models, and comparable company analyses in Excel.

These are not single prompts. They are complete workflows.
## /

The second layer is a set of vertical skill packages.

Financial analysis, investment banking, equity research, private equity, wealth management, fund administration, operations, and compliance are all broken down into file-based structures such as Markdown, JSON, and YAML. If a team wants to change its model templates, reporting conventions, or approval logic, it can directly edit the skill files.
## /

The third layer is connectors to data and enterprise systems.

Names like Daloopa, Morningstar, S&P Global, FactSet, Moody&#x27;s, PitchBook, LSEG, Box, and Egnyte are the unavoidable part of bringing financial Agents into real workflows.

An analyst is not missing a chatbot that can speak in financial jargon.

What they need is this: can the model get the right data, can it know where the data came from, can it show cost and latency before a call, can it leave an audit trail after the call, and can it switch to another path when a vendor goes down?

This is the dirtiest, heaviest, and most valuable part of financial AI Agents.

It is exactly the layer we have been focused on with QVeris.

![](../../../assets/blog-anthropic-finance-agent-third-layer-2.png)

Over the past year, AI Agents have been talked up heavily. Writing emails, making slides, booking flights, and automatically running workflows all sound useful.

But once Agents enter the enterprise, the problem immediately shifts into a different language: authentication, permissions, approvals, rate limits, cost, auditability, compliance, and delivery standards.

That is why we have never believed an Agent is just a prompt.

An Agent is an industry SOP plus a network of callable tools.

Anthropic has now opened up a showroom for financial SOPs. What we see is not “a few more finance Agents,” but a clearer trend: industry Agents will become increasingly vertical, and the tool connection layer will become increasingly infrastructural.

We are not building yet another finance Agent.

We are building a Tool OS that lets any Agent discover, inspect, and call real-world capabilities. For Agents, QVeris is not “another API platform,” but a capability routing network.

**This can be broken down into three actions**:

Discover: find capabilities using natural language.

Inspect: before calling, review parameters, examples, latency, success rate, billing rules, and provider background.

Call: after confirmation, execute in a sandbox, return structured JSON, and leave queryable usage and ledger records.

These three actions map directly to the third layer that makes financial Agents hardest to scale.

![](../../../assets/blog-anthropic-finance-agent-third-layer-3.png)

Anthropic can go deep on workflows for investment banking, research, and financial operations. We are solving a different problem: when an Agent needs real-time market data, financial statements, OCR, KYC, sanctions lists, beneficial ownership, news, on-chain data, maps, document processing, or image generation, it should not have to write a separate wrapper for every provider, manage authentication, adjust parameters, or absorb rate limits.

It should first find the capability, then select the provider, and finally make the call.

That is the difference between a Tool OS and a single-point tool.

A single-point tool answers: can I connect to a particular API?

A Tool OS answers: the Agent needs a capability right now; who can provide it, how much does it cost, how good is it, is it auditable, and is there an alternative path if it fails?

A KYC Screener is not sufficient just because it can read PDFs. It needs to identify documents, extract ownership chains, check sanctions lists, flag gaps, route approvals, and let the compliance team look back later and see which data source was used at each step, how much it cost, and what the result was.

These things are not in model parameters.

They are in the tool layer.

![](../../../assets/blog-anthropic-finance-agent-third-layer-4.png)

QVeris now provides 10,000+ real-world verified capabilities, 15+ categories, and integration methods including CLI, MCP Server, Python SDK, and REST API.

For Agent environments such as Claude Code, Cursor, OpenClaw, and Codex, the value of QVeris is not “one more plugin.” It is moving tool discovery and tool calling out of prompts and turning them into an auditable, billable, reusable protocol.

If Anthropic’s financial Agents are more like self-operated premium applications, we want QVeris to become the App Store and routing layer for Agents.

Industry experts should not be spending their time on tool integrations.

Investment research teams, legal teams, finance teams, cross-border ecommerce teams, and medical quality control teams should be investing in their own SOPs: judgment criteria, delivery templates, approval logic, and exception handling.

The underlying capability discovery, provider selection, call records, cost tracking, and failure fallback should be handled by the Tool OS.

This is also why we believe the domestic market will quickly enter its next stage.

Finance is only one showroom. Similar SOPs are abundant in China: legal contract review, cross-border ecommerce product selection, financial statement consolidation, government and enterprise bid document production, medical record quality control, investment research daily reports, supply chain risk control, and content operations.

These scenarios have a lot in common: high-frequency workflows, clear deliverables, scattered data sources, expensive human judgment, and non-negotiable compliance and audit requirements.

In the past, people building Agents tended to start by asking whether the model was strong enough.

The answer now is more sober: first write the industry SOP clearly, then standardize the tool connection layer.

At QVeris, we are making the second part simple.

If you want to build a financial Agent, you can start by checking financial capability coverage in the Capability Map. If you need KYC, sanctions, company profiles, financial statements, or OCR, you can search directly in Tool Finder. If you want to get your own Agent running, you can connect through CLI, MCP, Python SDK, or REST API.

If you simply want a ready-made entry point first, QVerisBot already packages data, decisions, and actions into a no-code Agent form.

![](../../../assets/blog-anthropic-finance-agent-third-layer-5.png)

The next stage of AI Agents will not be decided by model leaderboards alone.

Whoever can productize industry SOPs and turn real-world tools into a stable, transparent, auditable calling network will be closer to production.

Anthropic has opened up the showroom for financial Agents.

What we are building is the underlying infrastructure behind that showroom, so every Agent can connect to it.

If you are building an industry Agent, the first step may not be tuning another prompt.

The more realistic first step is to go to qveris.ai and see which real-world capability your Agent is actually missing.
