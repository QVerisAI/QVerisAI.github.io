---
title: 'We Built an AI Compute "Ghost Story" Radar'
description: 'Why does one news headline make GPUs, HBM, data centers, power, and ETFs all react simultaneously?'
pubDate: Jul 20 2026
heroImage: ../../../assets/blog-ai-compute-horror-radar-1.png
category: Product
author: QVeris Team
tags:
  - QVeris
  - Agent
translationKey: ai-compute-horror-radar
draft: false
---
# We Built an AI Compute "Ghost Story" Radar

Why does one news headline make GPUs, HBM, data centers, power, and ETFs all react simultaneously?

![The monitoring panel of the AI Compute Ghost Story Radar. The left side shows "AI Compute Ghost Story" Radar with 386 records, 9 alerts, and 377 warnings, capable of automatic data fetching. Below are options like "All," "Alerts," "Warnings," "Records," and "Auto Fetching." The middle section displays alert information such as "Chinese Companies Shift to Domestic AI Suppliers, Nvidia Under Pressure" and "Intel Acquires AI Chip Company Syntiant." The right side shows "42 Alerts" with content like "Chinese Companies Shift to Domestic AI Suppliers, Nvidia Under Pressure," and presents bearish bias across AI compute, chip manufacturing equipment, and cloud vendors.](../../../assets/blog-ai-compute-horror-radar-1.png)

*Figure 1: AI Compute Ghost Monitor Monitoring Panel*



## 01 Let’s Start with a "Ghost Story"

Over the past two years, the most frightening developments in the AI market haven’t just been "a company missing earnings expectations."

Even scarier is a narrative:

"Are we buying too many GPUs?"

"Are data centers being built too fast?"

"Will HBM suddenly become oversupplied?"

"Can cloud vendors recoup their AI capex?"

"If a major company starts selling excess compute capacity, is this a sign of strong monetization or overbuilding?"

These questions sound like news headlines, but in the market, they spread along an entire value chain:

Cloud vendors’ capital expenditures affect GPU and ASIC demand;

GPU demand impacts HBM, CoWoS, servers, power, and cooling;

Data center construction牵动 power, leasing, financing, and ETF baskets.

We call these AI compute "ghost stories."

It’s not that the news is inherently spooky—it’s that it attacks the market’s core consensus: will AI compute demand continue to grow?



## 02 Standard News Monitoring Falls Short

Standard news tools typically answer:

What does this news cover?

But in the AI compute chain, what we really want to know is:

Which market narrative does this news threaten?

Does it impact cloud vendors, chips, memory, servers, or power/cooling?

Is it a single-company event or contagious across a basket?

Has the market already priced in this via price, volume, ETFs, or implied volatility?

This is why we built the **AI Compute Ghost Monitor**.

It’s not a generic news aggregator or trading signal tool. It’s a narrative risk radar for AI infrastructure:

After catching news, we don’t jump to conclusions—we break it into structured questions.

![The single-news analysis page of the AI Compute Ghost Monitor. The top shows "AI Compute Ghost Monitor" with various metrics. Below are headline, summary, source, etc., such as headline "Meta Plans to Sell New AI Compute Capacity, Reportedly," summary indicating potential market concerns about "ghost stories" in AI infrastructure. Includes "Start Analysis" button and sections for "Sentiment," "Tags," and "Sentiment Confirmation JSON." This page demonstrates how the radar dissects news into structured questions.](../../../assets/blog-ai-compute-horror-radar-2.png)

*Figure 2: Single-News Analysis Page*

`/Users/liuqiyu/Desktop/qveris/09_ai_compute_ghost_monitor/project/docs/screenshots/analyze.png`



## 03 What We Actually Built

The project’s core goal is simple:

Detect news that could change market pricing for AI infrastructure demand, then explain direction, impact chain, confidence, and market confirmation signals.

We break one news item into five steps:

1.  **Identify Ghost Type**  
    Is this compute oversupply, capex ROI doubt, order cuts, HBM shortage, capacity flood, data center delay, or financing pressure?

2.  **Determine Affected Tier**  
    A news item doesn’t just impact the company mentioned—it may affect hyperscalers, GPUs, HBM, servers, data center power, and semiconductor ETFs.

3.  **Map Direction**  
    Direction isn’t just sentiment. For example, "cloud vendors selling excess compute" may signal monetization for sellers but oversupply for GPU supply chains.

4.  **Calculate Ghost Score**  
    Use transparent scoring rules to determine if it’s just a record, a watch item, or an alert.

5.  **Check Market Confirmation**  
    Do corresponding stocks, baskets, ETFs, volume, or follow-up options show actual reaction?

![The interface of the AI Compute Ghost Story Radar. The left side lists AI compute-related events like "Chinese Companies Shift to Domestic AI Suppliers, Nvidia Under Pressure" (including actions by Intel, Micron, etc.), with details on source, theme, source type, distribution channel, and market confirmation. The right side highlights "42" and the event "Chinese Companies Shift to Domestic AI Suppliers, Nvidia Under Pressure," with details like event time, source, theme, source type, distribution channel, and market confirmation. This image aligns with the radar’s functionality.](../../../assets/blog-ai-compute-horror-radar-3.png)

*Figure 3: Ticker Impact Impact Chain Page*

`/Users/liuqiyu/Desktop/qveris/09_ai_compute_ghost_monitor/project/docs/screenshots/ticker-impact.png`



## 04 Ghost Score: Why We Avoided Complex Models Initially

We didn’t start with complex machine learning.

The reason is simple: without sufficient labeled cases, a black-box model’s "high-risk" label isn’t necessarily more trustworthy than a transparent rule.

So the first version of Ghost Score is straightforward:

ghost_score = credibility × novelty × theme_strength × contagion × market_confirmation

Each dimension scores 1–3.

- **Credibility**: Is the source reliable? Social media rumors = 1, reputable media/analytics = 2, company announcements, SEC, Reuters, Bloomberg, Dow Jones = 3.
- **Novelty**: Is this a repeat of old views or a new fact changing expectations?
- **Theme Strength**: Is it directly about AI capex, GPUs, HBM, data centers, or compute leasing?
- **Contagion**: Does it affect only one ticker or spread to an entire basket/ETF?
- **Market Confirmation**: Are prices, volume, ETFs, or options reacting?

This yields three tiers:

- **1-24, Log**: Record only, no alert.
- **25-80, Watch**: Add to the dashboard or summary.
- **81-243, Alert**: Requires real-time attention.

This rule isn’t mysterious—it has one key advantage: every judgment can be dissected for review.



## 05 Why This Project Depends on QVeris

If it were just a news crawler, this project wouldn’t matter.

The real challenge: determining whether a news item qualifies as a "ghost story" can’t rely solely on headlines.

We need to verify:

- Where did this news come from?
- Are company announcements, SEC filings, or earnings calls confirming it?
- Have related stocks reacted?
- Is the broader basket moving in sync?
- If adding options, are IV, volume, or OI confirming?

This is where QVeris adds the most value.

In validation, QVeris already supports the first version of the U.S. AI compute MVP:

- **News**: Finnhub market news and Alpha Vantage news sentiment, used to capture AI compute-related news.
- **SEC/filings**: FMP, Finnhub, and QVeris raw filing tools, used to verify company-level authoritative information.
- **Earnings transcripts**: FMP and Alpha Vantage transcripts, used to extract capex, guidance, and AI spending context.
- **Market data**: Multi-provider fallback, used to check market confirmation.
- **Options**: ThetaData, TradeFeeds, and vol surface capabilities, used later for IV, OI, and flow confirmation.

This transforms the project from "I think this news matters" to "I can place news, company documents, earnings context, and market reactions on the same evidence chain."

This is why we love QVeris: it doesn’t just give an answer—it builds the tool layer needed to verify it.



## 06 Real Backfill Cases

We conducted a three-month backfill: from 2026-04-06 to 2026-07-06, using QVeris/Alpha Vantage tech news, filtered for relevance, scored, and cross-referenced with Yahoo Finance daily windows to assess event impact.

We retained 49 cases.

Several patterns emerged:

- **2025-01-27, capex ROI doubt**: DeepSeek efficiency challenges questioned AI capex assumptions; NVDA fell about 16.97% and VRT fell about 29.88% on the same day.
- **2025-02-24, data-center delay**: Microsoft was reportedly canceling part of its AI data center leases; VRT, SMCI, NVDA, and infrastructure chains came under pressure.
- **2026-06-26, financing stress**: Oracle AI financing and free cash flow pressure raised concerns; ORCL, cloud vendors, and AI infrastructure narratives were reevaluated.
- **2026-07-01, compute overcapacity**: Meta was reportedly planning to sell excess AI compute capacity; META direction was mixed, while the AI infrastructure supply chain came under pressure.

These cases collectively show one truth:

Market volatility in the AI era often isn’t a single company’s problem—it’s a consensus being repriced across the chain.



## 07 Example: Why Meta Selling Excess Compute Isn’t Just "Bullish" or "Bearish"

Assume a headline:

Meta reportedly explores selling excess AI compute capacity.

The first reaction might be: "That’s good, right? Idle compute generates revenue."

But from a narrative risk perspective, it has at least two layers:

For Meta, this could be monetizing sunk capex—direction potentially mixed/bullish.

For GPUs, servers, neocloud, and data center infrastructure, it may signal a more dangerous question: If major buyers already have excess capacity, is the market’s assumption about future compute demand too optimistic?

This is why the direction engine can’t just do "news sentiment analysis."

We must first identify the ghost type, then determine which narrative layer it attacks, before mapping to specific tickers and baskets.



## 08 What We’ve Stuck To in Product Design

First, it’s not a universal market radar.

We focus only on the AI compute / AI infrastructure / HBM / data-center capex mainline. Narrower scope = more reliable judgments.

Second, it’s not an automated trading system.

It’s research-focused: identifying narratives, mapping impacts, showing evidence and market confirmation. No "buy/sell" signals.

Third, start with transparent rules, then complex models.

Before having 50–100 labeled ghost stories, transparent rules are easier to debug and review than black-box models.

Fourth, every conclusion must trace back to the evidence chain.

News source, theme classification, impact chain, market confirmation—all must be visible.

![The English mode page of the AI Compute Ghost Monitor. The left "Watch" section shows "Chinese Firms Leave Nvidia for Local AI Suppliers, Survey Shows" and other items, including "Memory Capital Markets." The right side displays the news content for "Chinese Firms Leave Nvidia for Local AI Suppliers, Survey Shows," with sections like "Score" (showing 2), "Impact Chain" (including "AI Chips / Networking"), and "Ticker Impact." This aligns with the radar’s functionality.](../../../assets/blog-ai-compute-horror-radar-4.png)

*Figure 4: English Mode Page*

`/Users/liuqiyu/Desktop/qveris/09_ai_compute_ghost_monitor/project/docs/screenshots/english-mode.png`



## 09 Our Biggest Takeaway After Completion

In AI investing, the most expensive thing isn’t the information itself.

There’s too much information.

What’s truly valuable is judgment:

Which information is noise?

Which is changing market consensus?

Which changes affect only one company, and which spread through the supply chain?

Which stories seem scary but the market hasn’t confirmed?

So this project isn’t just a dashboard.

It’s an attempt to turn "market narratives" into something that can be dissected, verified, and reviewed.

News is the entry point.

Narratives are the middle layer.

The evidence chain and market confirmation are what we truly want to capture.



## 10 Closing

We’ll continue advancing this project in two directions:

First, expand case studies to calibrate Ghost Score from rules to more reliable sample-based scoring.

Second, integrate QVeris’s news, filings, transcripts, market data, and options capabilities more seamlessly, creating a complete research loop from AI compute news appearance to verification.

AI compute stories will keep unfolding.

Some are opportunities, some are bubbles, some are just noise.

We want to see them before they scare the market.  

Disclaimer: This article is for product research and technical project sharing only and does not constitute any investment advice, trading advice, or profit guarantee. Case studies are for product methodology illustration; historical market reactions do not indicate future performance.
