---
title: 'Want to Quant Trade A-Shares Without Spending Tens of Thousands on Wind? A Hands-On Test of Hundsun Juyuan'
description: 'Want to build A-share quant strategies without spending tens of thousands on Wind? We ran a full hands-on comparison using Hundsun Juyuan.'
pubDate: 'Apr 02 2026'
heroImage: '../../../assets/blog-qveris-hsjy-wind-alternative-hero.png'
category: 'Engineering'
author: 'QVeris Team'
tags: ['A-shares', '量化', 'qveris', 'Finance']
translationKey: 'qveris-hsjy-wind-alternative'
draft: true
---

![qveris-hsjy-wind-alternative-1](../../../assets/blog-qveris-hsjy-wind-alternative-1.png)

![qveris-hsjy-wind-alternative-2](../../../assets/blog-qveris-hsjy-wind-alternative-2.jpg)

![qveris-hsjy-wind-alternative-3](../../../assets/blog-qveris-hsjy-wind-alternative-3.jpg)
> QVeris New Provider Briefing | Issue 2

Cambricon in March broke a lot of investors' nerves. It started the month at 1200 and fell to 1009 by month-end, with a maximum drawdown of 18.5%.

Open Tonghuashun, and you can see green candlesticks one after another. But for the institutional researcher sitting across from you, looking at the same Cambricon stock, what else is on their screen?

**Broker consensus estimates, structured research-report views, peer comparisons across 172 companies, trends in shareholder account counts, tick-by-tick main-fund flows...**

In the past, this data lived only inside Wind terminals, with annual fees starting at RMB 40,000.

That was until I found Hundsun Juyuan on QVeris: 252 financial data APIs, giving you institutional-grade data with a single sentence. I ran a complete test using Cambricon.

## Layer 1: What You Can Also See in Tonghuashun

Start with the basics. Query "Cambricon real-time quote", and in 6 seconds it returns 30 fields: closing price RMB 1009.45, down 1.42%, turnover RMB 5.25 billion, turnover rate 1.25%, total market cap RMB 425.67 billion, and price-to-book ratio 35.96.

The daily K-line data is more complete: 21 trading days, each with open, high, low, close, turnover, amplitude, and volume ratio. The long bearish candle on March 23, down 5.24% and touching a low of 968, followed immediately by a 5.89% bullish rebound on March 24, makes the price-volume relationship obvious.

Free apps also have this data. But what comes next is **what you cannot see in Tonghuashun.**

![qveris-hsjy-wind-alternative-4](../../../assets/blog-qveris-hsjy-wind-alternative-4.png)

## Layer 2: What Used to Require a RMB 60,000 Wind Subscription

### 212 Broker Forecasts, Pulled with One Sentence

"Cambricon consensus estimates" returned data that genuinely made me pause.

It was not a vague "analysts are bullish" summary. It was **212 specific forecasts** from more than ten brokerages, including Huatai, Zheshang, Donghai, GF Securities, and Guohai. Each entry included explicit revenue forecasts, net profit forecasts, EPS, and target price:

![qveris-hsjy-wind-alternative-5](../../../assets/blog-qveris-hsjy-wind-alternative-5.png)

Market consensus: **2026 revenue of RMB 14.3 billion (+120%), net profit of RMB 4.95 billion (+140%), and a target price of RMB 1546**: 53% above the current price of RMB 1009.

The value of this dataset is not just the "target price" itself. The real quant factor is **dispersion in expectations**: Huatai forecasts RMB 16.8 billion in revenue, while Guolian Minsheng forecasts only RMB 13.5 billion, a 25% divergence. That means the market has not reached consensus on Cambricon's 2026 growth path, and volatility is likely to remain elevated.

Anyone doing quant knows that **analyst expectation revisions** are one of the strongest alpha factors validated in academic research. When multiple brokerages raise EPS forecasts at the same time, share prices often follow. In the past, this data could only be retrieved in bulk through Wind Research Edition, which costs RMB 60,000+ per year.

### No Need to Read Research Report PDFs: Get Structured Views Directly

What surprised me even more was the "company research views" API. It does not give you a pile of PDF links. Instead, it **breaks research reports into structured dimensions**: profitability, company operations, technology level, core products, market share, and more, with viewpoints extracted separately for each dimension:

- **Huatai Securities (3/17)**: "First tier of domestic AI chips, 2026E revenue of RMB 16.8 billion"
- **Donghai Securities (3/19)**: "Siyuan series chips achieved Day0 adaptation for mainstream large models including DeepSeek-V3.2-Exp and Zhipu GLM-5"
- **Zheshang Securities (3/23)**: "Maintain Buy rating; forecast attributable net profit of RMB 4.8/7.6/13.5 billion for 2026-28"

This structured data can be fed directly into NLP models for sentiment analysis, without crawling research reports or parsing PDFs yourself.

### Peer Comparison Across 172 Companies with One API

"Cambricon industry peer financial ratio comparison" returns a cross-sectional comparison of ROE, gross margin, net margin, and asset-liability ratio across **172 companies** in the semiconductor industry:

![qveris-hsjy-wind-alternative-6](../../../assets/blog-qveris-hsjy-wind-alternative-6.png)

Cambricon's ROE of 23.86% ranks near the top of the semiconductor industry, while its asset-liability ratio of just 11.87% is extremely healthy. Multi-factor models need intra-industry rankings. This API **returns the entire industry in one call**, saving hours of data cleaning.

## Layer 3: Private Signals for Quant Traders

### Fund Flows: Who Is Selling?

"Cambricon fund flows" gives a second-level breakdown: super-large orders had a net outflow of RMB 283 million, large orders had a net inflow of RMB 80 million, medium orders had a net inflow of RMB 203 million, and retail barely moved.

Translation: **institutions are reducing positions, while mid-sized capital is taking the other side**. Over 5 days, main funds recorded a cumulative net inflow of RMB 186 million, but over 10 days they recorded a cumulative net outflow of RMB 368 million. Short-term rebound capital has entered, but the medium-term trend is still outflow.

Margin financing balance is **RMB 15.542 billion**, with a financing cost price of RMB 796.94. The current price of 1009 is still far above the financing cost, so leveraged capital is temporarily safe. But if the stock continues falling toward the 800 level, margin positions could trigger a stampede.

![qveris-hsjy-wind-alternative-7](../../../assets/blog-qveris-hsjy-wind-alternative-7.png)

### Shareholder Account Count: Retail Investors Are Pouring In

This is the signal I think deserves the most attention: "Cambricon shareholder account count":

![qveris-hsjy-wind-alternative-8](../../../assets/blog-qveris-hsjy-wind-alternative-8.png)

Over a year and a half, the shareholder account count surged from 26,000 to **66,000**, up 151%. Average shares per account fell from 15,772 to 6,339: **chips are moving from institutions to retail investors.**

There is a saying in the quant community: **"A falling shareholder count is good; a rising one deserves caution."** A declining count means concentrated chips and institutional accumulation. A surging count means retail investors are chasing highs and taking over. In A-share backtests, this factor has delivered annualized excess returns of 5-8%, but in the past the data could only be manually scraped from quarterly reports one by one.

### Block Trades: A 23% Discount Signal

"Cambricon block trades" returns 32 records. The most eye-catching one: on October 22, 2025, CITIC Securities bought 46,800 shares with a transaction value of RMB 51.25 million at a **23.39% discount**. A block-trade discount above 15% usually means a major shareholder or institution is eager to reduce holdings. Tonghuashun's block-trade page will not highlight that detail in red for you.

### Earnings Commentary: AI-Generated Structured Analysis

"Cambricon earnings commentary" directly returns a structured analysis report:

> **"AI compute demand release drives explosive performance growth, with significant improvement in profitability and business structure"**
> Revenue was RMB 6.497 billion (+453%), with cloud product-line revenue of RMB 6.477 billion accounting for 99.70%. R&D personnel accounted for 80.13%, and cumulative patents reached 2846. In 2025, the company achieved **its first-ever annual profit** and removed the "U" label from its stock abbreviation.

This is not a PDF, and not a link. It is **structured text that can be fed directly into an analytical model**: covering performance overview, expense analysis, risk warnings, and future strategy, with one report for every earnings period.

## 252 APIs, but the Number Is Not the Point

After testing Cambricon alone, I called 26 different Hundsun Juyuan APIs. Together with prior tests across funds, bonds, wealth-management products, and other categories, this article covers **50+ APIs** across 8 major categories.

But the number is not the point. The point is that among these 252 APIs, **some datasets are difficult for retail investors to buy even if they are willing to pay**:

- Broker consensus estimates (Wind Research Edition: RMB 60,000+/year)
- Structured research-report views (internal institutional systems)
- Cross-sectional industry peer comparisons (hours of cleaning if you do it yourself)
- Shareholder account count trends (scattered across quarterly reports)
- Block-trade discount details (raw exchange data you would otherwise need to crawl yourself)

-

Taken together, this data forms a **data middle platform that quant researchers dream of having.**

**A few issues**

**Response speed is somewhat slow**. Average latency is around 8 seconds, and the research-view API takes more than 16 seconds. It is not suitable for intraday real-time strategies, but it works well for **post-market analysis, strategy backtesting, and recurring reports.**

**NLP queries occasionally drift**. For example, querying "today's Dragon-Tiger List" can match a stock named "Today International". Complex queries may require trying a few different phrasings.

## How to Use It on QVeris

No need to register a Hundsun Juyuan account. No need to get an API key. Just one sentence:

> **You: What are the latest broker consensus estimates for Cambricon?**

![qveris-hsjy-wind-alternative-9](../../../assets/blog-qveris-hsjy-wind-alternative-9.png)

> **You: What is the recent trend in shareholder account count?**

![qveris-hsjy-wind-alternative-10](../../../assets/blog-qveris-hsjy-wind-alternative-10.png)

> **You: Compared with its industry peers, how profitable is Cambricon?**

![qveris-hsjy-wind-alternative-11](../../../assets/blog-qveris-hsjy-wind-alternative-11.jpg)

In three rounds of conversation, you already have the data foundation for a basic investment research report.

**In one sentence**: Hundsun Juyuan's greatest value is not "252 APIs", but **giving retail investors access to institutional-grade data for the first time**: broker consensus estimates, structured research-report views, industry cross-sectional comparisons, and shareholder chip distribution. The information gap that used to be locked inside Wind terminals can now be reached through QVeris with a single sentence.

> **Test statistics**: This article tested 50+ Hundsun Juyuan APIs, covering 8 major categories: A-share market data, financial statements, broker research reports, fund flows, funds, bonds, wealth-management products, and corporate credit. Call success rate was 100%, with an average response time of 8 seconds. All data cited in this article comes from hands-on testing, not simulation.

**QVeris New Provider Briefing** · Let the data speak, one provider at a time.

Explore more use cases: 👇

![qveris-hsjy-wind-alternative-12](../../../assets/blog-qveris-hsjy-wind-alternative-12.jpg)

[QVeris Integrates Twelve Data: One API for U.S. Stocks, FX, Gold, and Bitcoin](https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzY4NDAxMTE3NQ%3D%3D%26mid%3D2247484175%26idx%3D1%26sn%3Da80486a8a7c07e3a9c55cfab8b2606fa%26scene%3D21%23wechat_redirect)

![qveris-hsjy-wind-alternative-13](../../../assets/blog-qveris-hsjy-wind-alternative-13.jpg)

[OpenClaw Configuration Guide for Full QVeris Capabilities: Financial Analysis Edition](https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzY4NDAxMTE3NQ%3D%3D%26mid%3D2247484167%26idx%3D1%26sn%3D9c5f5bc1f6c73ee42b8e3d020645951d%26scene%3D21%23wechat_redirect)

![qveris-hsjy-wind-alternative-14](../../../assets/blog-qveris-hsjy-wind-alternative-14.jpg)

[Trillion-Dollar AI Agents Are Coming: The Software Industry Is About to Change Completely](https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzY4NDAxMTE3NQ%3D%3D%26mid%3D2247484154%26idx%3D1%26sn%3Db1a514f6af3b81c3ad447b59e927ae10%26scene%3D21%23wechat_redirect)

![qveris-hsjy-wind-alternative-15](../../../assets/blog-qveris-hsjy-wind-alternative-15.png)

![qveris-hsjy-wind-alternative-16](../../../assets/blog-qveris-hsjy-wind-alternative-16.jpg)
