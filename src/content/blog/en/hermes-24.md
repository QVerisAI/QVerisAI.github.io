---
title: 'How to Use Hermes for A-Share Data Freedom: A Practical Guide to 24-Hour Intelligent Analysis'
description: 'A hands-on guide to using Hermes with QVeris for always-on A-share data access and practical market analysis.'
pubDate: 'May 09 2026'
heroImage: '../../../assets/blog-hermes-24-hero.jpg'
category: 'Product'
author: 'QVeris Team'
tags: ['QVeris', 'Agent']
translationKey: 'hermes-24'
---
QVeris · Tutorial   

A topic has been getting a lot of attention lately: how to let AI Agents access A-share data in real time and perform automated analysis and decision-making.

Not the kind of lagging analysis where you read financial reports the next day, but real intraday monitoring, anomaly alerts, and strategy backtesting.

Today, I’ll use the Hermes framework together with QVeris data sources to walk through a complete setup. From installation to running your first query, you can get it done in 15 minutes.



01 Why this combination?

**What is Hermes?**

If you are building AI Agents, you have probably heard of Hermes, an open-source Agent execution framework known for being lightweight, extensible, and LLM-friendly. Compared with other frameworks, it is better suited for “always-on” Agents, such as systems that monitor markets 24 hours a day or automatically trigger trading alerts.

**What is QVeris?**

In simple terms, it is a “capability routing network” for the AI era. You do not need to integrate with every data provider one by one. Connect to QVeris, and you can call tens of thousands of real-time data tools, covering A-share quotes, capital flows, financial data, research reports, and even social media sentiment.

The key point is that the **barrier to entry is extremely low**:

-    The free quota is enough for an individual developer to use at low frequency for a month

-    No contracts, no need to deposit tens of thousands of RMB upfront

-    One API Key works everywhere

The logic of this combination is simple: Hermes handles “thinking” and “decision-making,” while QVeris handles market “perception.” Put them together, and your Agent gets both eyes and an evolvable brain.

![](../../../assets/blog-hermes-24-1.png)

02 Preparation: 3 things you need

Before getting started, prepare the following:

1. **A computer with internet access** (Windows, Mac, or Linux all work; this article uses Mac as the example)

2. **A QVeris API Key** — apply for free at qveris.ai, which takes about 1 minute

3. **The Hermes framework installed** — if you have not installed it yet, check the official documentation for a quick start

First, here is the final effect: asking Hermes about today’s market in Feishu:

 👤 Help me find technology stocks where major funds have continued to flow in over the past 3 days, but the stock price has not risen sharply yet

![](../../../assets/blog-hermes-24-2.png)

![](../../../assets/blog-hermes-24-3.png)

03 Core step: connect with one command



One advantage of Hermes is its plugin-based design. Connecting QVeris is essentially installing a Skill.

Log in to https://qveris.ai/plugins, copy the sentence below, and send it to Hermes.

That is all it takes to connect.

![](../../../assets/blog-hermes-24-4.png)

If you need to enter an API KEY, you can get it from the website: after logging in, click your avatar in the upper-right corner and select API Keys.

![](../../../assets/blog-hermes-24-5.png)

Then ask your AI whether the connection was successful. It really is that simple.



04 Practical demo: query A-share data in three steps



Your Hermes can now call the full range of QVeris capabilities. Let’s walk through a three-step workflow.

Step 1: discover tools

Tell Hermes what you want to look up, and ask it to find the right tools for you:

   👤 "I want to check A-share capital flows. Help me find what tools are available."

![](../../../assets/blog-hermes-24-6.png)

Step 2: run a query

   👤 "Use the first tool to check today’s capital flow for Kweichow Moutai."

![](../../../assets/blog-hermes-24-7.png)

Step 3: ask a deeper follow-up

   👤 "Help me compare the net inflow data for Moutai and Wuliangye over the past 5 days."

![](../../../assets/blog-hermes-24-8.png)

See what happened? Your Hermes Agent now has professional A-share data analysis capabilities.



05 Advanced usage: automated monitoring



Once you can query data, you can automate it.

Configure a scheduled task in Hermes and let the Agent check the capital flows of your portfolio stocks once every hour:

![](../../../assets/blog-hermes-24-9.png)

Now your Agent becomes a 24-hour market monitor. When abnormal activity appears, it can automatically push alerts to Feishu, DingTalk, or Telegram, so you no longer need to stare at the market all day.



06 Scope: who is this solution for?



This combination is especially suitable for the following groups:

**Quant strategy researchers** — You need high-frequency, multidimensional data to backtest strategies, but do not want to spend tens of thousands of RMB on data interfaces.

**Individual investors** — You want to build your own “intelligent investment advisor” to automatically monitor holdings and discover opportunities.

**Agent developers** — You are building AI applications for financial scenarios and need to quickly connect to stable data sources.

**But if you are in one of the following situations, it may not be the best fit:**

-    You only need to check stock quotes occasionally — using a brokerage app directly is faster

-    You need high-frequency trading with millisecond-level latency — QVeris provides minute-level data and is not suitable for ultra-low-latency scenarios

-    You have extremely strict data compliance requirements, such as formal trading systems for public funds — we recommend using the compliance channels of official data providers



07 Cost and quota



QVeris pricing is transparent:

- **Search and discovery**: free

- **Tool calls**: billed based on actual usage; A-share market data tools usually cost 0.1-0.5 RMB per call

- **New user benefit**: register to receive 1000 credits, and invite friends to get double the bonus

What does that mean in practice? If you query data 20 times a day, it costs roughly 30-50 RMB per month, cheaper than a cup of coffee.

**And billing is open and transparent**:

QVeris Billing Upgrade: Making Every Paid Agent Call Clear



08 Final thoughts



AI Agents are changing how we obtain and process information.

In the past, you had to open ten web pages, read through dozens of pages of financial reports, and watch the market all day to get investment insights. Now, a properly configured Agent can produce them for you in minutes.

More importantly, the barrier to entry for this solution is low enough: no expensive data interfaces, no complex system architecture. With one API Key and one configuration command, your Agent can “see” the market.

If you already have Hermes installed, try it now. Go to qveris.ai, apply for a free Key, give it to your Agent, and have it connect itself. Come back in 15 minutes and see how it works.

**👇 Click the link below to register now and receive 1000 credits**:

https://qveris.ai/?ref=DFk24wT50FzHDA

Invite friends to receive an additional 1000 credits 🎁

![](../../../assets/blog-hermes-24-10.png)

See you in the next article.
