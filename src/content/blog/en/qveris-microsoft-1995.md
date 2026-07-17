---
title: 'I Asked QVeris to Pull Microsoft Historical Data Back to 1995: In Long-Horizon
  Investment Research, the First Step Is Not Writing a Strategy'
description: A long-horizon Microsoft data example showing why historical coverage
  matters before writing an investment strategy.
pubDate: Jun 16 2026
heroImage: ../../../assets/blog-qveris-microsoft-1995-cover-en.png
category: Product
author: QVeris Team
tags:
- QVeris
- Agent
translationKey: qveris-microsoft-1995
draft: false
---
QVeris · Data Test



When a user says "backtest," many Agents instinctively start writing a strategy: buy conditions, sell conditions, return curves, maximum drawdown. It sounds complete.

But I increasingly think the real hard part is not the strategy code. It is the first step: whether you actually have a data path that is long enough, stable enough, and callable by an Agent.

That is especially true for long-term research on established technology companies. Five years of data is often not enough. If you want to study Microsoft, you cannot only look at the past few quarters, or only the stock price over the past year. Microsoft itself is a timeline of technology industry change, from Windows and Office to Azure and then AI infrastructure.

So this time, I did not rush to ask the Agent to write a strategy that "looks smart." For the first step, I did something more basic: I asked QVeris to call FMP and see whether it could pull back long-horizon historical data for MSFT.
## Before Writing a Backtest, I First Checked Whether the Data Could Go Beyond Five Years

This step is actually important.

There was a reminder in the earlier plan: the current QVeris wrapper might have a five-year limit bug, so before formally writing a "30-year backtest," the fix must be confirmed. That reminder cannot be skipped. A blog post can be interesting, but it should not package an unverified capability as something that has already worked end to end.

So this time I used a more conservative test method: instead of directly claiming that Historical EOD or OHLCV already fully supports a 30-year backtest, I first verified whether QVeris could call long-horizon historical data through FMP.

The endpoint I tested was FMP's `Historical Market Cap`. It is not full OHLCV, and it cannot replace the daily open, high, low, close, and volume data required for a formal backtest. But it is very suitable as a first-layer view of long-term company value change: how a company has become larger in the market's eyes over the past few decades.

![](../../../assets/blog-qveris-microsoft-1995-1.png)
## MSFT from 1995 to 2026: Historical Market Cap Data Can Be Retrieved

I asked QVeris to call FMP and query MSFT Historical Market Cap from 1995-01-01 to 2026-05-27.

This call succeeded. The returned result was long: QVeris indicated that the raw result was about 346752 bytes and provided a complete result file. More importantly, the call returned 7902 valid records in total; the latest segment returned 5000 records in one call, and the earlier segment added another 2902 records.

Two points are worth spelling out.

First, QVeris did successfully call FMP's historical data interface, rather than only fetching the latest one-day quote. Second, there is a 5000-record boundary on a single response. So if we want to run a truly complete 30-year daily-frequency backtest, subsequent requests should be split by time window instead of assuming one request can swallow the entire history.

| Test Item | Observed Result |
| --- | --- |
| Data source | FMP |
| QVeris tool | Historical Market Cap |
| Symbol | MSFT |
| Request range | 1995-01-01 to 2026-05-27 |
| Single response | 5000 valid records |
| Latest sample | 2026-05-27, marketCap = 3,064,487,420,000 |
| Early sample | 1995-01-03, marketCap = 37,224,000,000 |
| End-2000 sample | 2000-12-29, marketCap = 231,215,400,000 |

![](../../../assets/blog-qveris-microsoft-1995-2.png)

![](../../../assets/blog-qveris-microsoft-1995-3.png)

These numbers are very intuitive. On January 3, 1995, FMP returned a Microsoft market cap of about $37.224 billion. On December 29, 2000, it was about $231.215 billion. By May 27, 2026, the returned market cap was about $3.06 trillion.

This is not investment advice, nor is it saying what will happen in the future. It only shows that when an Agent can access this kind of long-horizon data, it no longer has to revolve only around the most recent few trading days.
## The Value of Long-Horizon Data Is That It Gives the Agent a Sense of Time

I think a "sense of time" is one capability investment research Agents can easily lack.

When many ordinary Agents answer company questions, they read like they are looking at a latest snapshot: latest stock price, PE, market cap, revenue, net income. The information may be correct, but it has no historical depth.

Company research, however, often depends on time. A trillion-dollar company is just a huge number if you only look at today. But if you put 1995, 2000, 2014, and 2020 on the same timeline, it becomes the result of a company's long-term product cycles, cloud transformation, and changes in capital market perception.

The meaning of this data for an Agent is not to let it immediately shout "how many times it grew." It is to let it keep asking better questions: In which stages did MSFT's market cap expansion mainly occur? Around the dot-com bubble, how did the market's valuation of Microsoft change? After the cloud transformation, did market cap growth and fundamental growth move in sync? If OHLCV is connected later, which stages are suitable for event backtesting? If financial statement data is added as well, can "market re-rating" and "business transformation" be placed on the same timeline?

This is the right use case for long-horizon historical data with Agents: lay out the timeline first, then decide the analytical method.
## But I Will Press Pause on the "30-Year Backtest" for Now

A boundary needs to be made clear here.

This article cannot currently be written as "QVeris has already run a 30-year OHLCV backtest." The reason is simple: a complete backtest needs Historical EOD or Historical OHLCV, including open, high, low, close, and volume. Ideally, it should also confirm adjustment methodology, splits, dividends, missing trading days, time zones, and exchange calendars.

What I confirmed in this round is this: QVeris can successfully call long-horizon historical market cap data through FMP; at the same time, a large-range request will encounter the 5000-record boundary for a single response.

![](../../../assets/blog-qveris-microsoft-1995-4.png)

That sentence may sound less "marketing-friendly," but it is more truthful. Truth itself is the best credibility for technical content.
## What This Means for QVeris Agent

If we put this back into the capabilities of QVeris Agent, I think it has three layers of significance.

First, the Agent can begin handling "long-horizon company questions" instead of only answering short-term market questions. A question like "What stages did Microsoft's market cap expansion go through from 1995 to today?" does not need a latest quote. It needs a historical series.

Second, the Agent can connect historical data with fundamental data. In the previous article, we had already verified that QVeris can call company financial statements, TTM metrics, financial ratios, and growth data through FMP. Now, with historical market cap data added, the Agent can put "the company became more expensive" and "the company actually became stronger" into the same analytical framework.

Third, the Agent can prepare for later backtesting. A real backtest is not finished by saying "run 30 years." It requires confirming data length, field completeness, adjustment rules, trading-day continuity, and response limits. If QVeris can also orchestrate these checks into a workflow, developers building investment research Agents will not need to rebuild the data pipeline from scratch every time.

![](../../../assets/blog-qveris-microsoft-1995-5.png)
## What I Most Wanted to Say This Time Is Not How Much Microsoft Rose

After this round of testing, I think the most worthwhile point in this article is not that "Microsoft went from tens of billions of dollars to trillions of dollars." That is of course a big story, but telling only the increase is too thin.

The more important point is this: when Agents do investment research, they cannot only look at today. They must be able to place a question back onto a sufficiently long timeline.

After QVeris connected to FMP, it can already begin letting Agents call long-horizon historical data. This lays the groundwork for long-term company research, full-cycle post-IPO observation, historical valuation change analysis, and future backtesting workflows.

But I will also state the limitation clearly: this article only confirms the QVeris call result for FMP Historical Market Cap. Historical EOD, EOD Bulk by date, and Historical OHLCV still need to be tested after the wrapper limit is fixed before we formally write about a "30-year backtest."

This is not conservatism. It is responsibility to users.

Because a truly usable investment research Agent should not only know how to make its conclusions look polished. It should also know which data paths have already worked, and which parts still need to be verified.
