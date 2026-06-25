---
title: '我让QVeris做了一次AI选股研究助理：先看行业估值，再用Screener过滤公司'
description: '我让QVeris做了一次AI选股研究助理：先看行业估值，再用Screener过滤公司'
pubDate: 'Jun 22 2026'
heroImage: '../../../assets/blog-qveris-ai-stock-research-assistant-hero.jpg'
category: 'Product'
author: 'QVeris Team'
tags: ['QVeris', 'Agent']
translationKey: 'qveris-ai-stock-research-assistant'
---
QVeris · 数据实测 
## 我不想让 Agent 直接荐股，我想让它先会筛

**我最近想测一个很容易把 Agent 带偏的问题**：

>
> AI 相关股票还能不能看？ 
>
这个问题如果直接丢给普通 Agent，很容易得到一段很热闹、但没什么用的回答：AI 是长期趋势，算力需求强劲，龙头公司有优势，投资者需要关注估值风险……听起来都对，但问题是，它没有真正开始"筛"。

我不想让 Agent 一上来就说哪只股票好。那太危险，也太像财经内容里的万能废话。

我真正想测的是：QVeris 接入 FMP 之后，能不能像一个研究助理一样，先帮我搭起一套筛选路径。

这套路径至少要回答四个问题：第一，AI 相关行业现在整体估值水位高不高？第二，市场当天到底在追什么、砸什么、交易什么？第三，能不能用 Screener 先筛出一批 US 市场里的候选公司？第四，候选公司里，能不能再补一眼基本面指标和 Share Float，不要只看概念热度？

所以这篇不是"AI 股票推荐"，而是一次更朴素的测试：我让 QVeris 做一次 AI 选股研究助理，看它能不能先把筛选框架跑起来。
## 第一步：先看 US 市场 sector 和 industry 的估值水位

![](../../../assets/blog-qveris-ai-stock-research-assistant-1.jpg)

我第一步没有查某一只股票，而是先查行业。

因为只看公司很容易被叙事带着走。尤其是 AI 这种主题，一家公司只要沾一点算力、芯片、软件、数据中心，就很容易被塞进"AI 概念"。但研究助理不能只会听故事，它至少要先问一句：这个行业现在整体估值贵不贵？

我让 QVeris 调 FMP 的 Historical Industry PE，查询 NASDAQ 的 Software - Infrastructure。

这次调用成功返回 7 条数据。2026-06-15，NASDAQ Software - Infrastructure 的行业 PE 是 **44.81**左右；2026-06-05 和 2026-06-08 附近则在**44** 左右。

这组数字对我很有用。它不是告诉我"软件基建行业可以买还是不能买"，而是先给 Agent 一个行业估值参照。后面如果某家公司 PE 是 25、30、50、80，Agent 至少知道它不是在真空里看估值，而是在和行业水位做比较。

我还顺手让 QVeris 调了 SIC 分类，搜索 SEMICONDUCTORS，返回了 SIC code **3674**，行业标题是**SEMICONDUCTORS & RELATED DEVICES**。

![](../../../assets/blog-qveris-ai-stock-research-assistant-2.jpg)

这一步看起来像小事，但对 Agent 很重要。AI 主题不能只靠关键词猜。把行业、SIC、sector 这些分类先对齐，后面筛选才不会变成"看起来像 AI 就算 AI"。
## 第二步：看板块表现和市场异动，别只盯着热门叙事

行业估值只能回答"水位"，不能回答"今天市场在动什么"。

所以我第二步让 QVeris 调 FMP 的 Historical Sector Performance，看 NASDAQ Technology 最近几天的 sector 表现。

![](../../../assets/blog-qveris-ai-stock-research-assistant-3.jpg)

结果也能正常返回。2026-06-15，Technology / NASDAQ 的 averageChange 大约是 **0.94%**；2026-06-05 有一个比较明显的负值，约-**4.51**%；2026-06-08 则是-**0.07**%。

这说明 Agent 可以把板块表现作为"背景噪音"读进去。否则它看到某只科技股涨跌，很容易过度解释成公司自身原因，但实际上可能只是整个板块当天在波动。

接着我又跑了 FMP 的市场异动接口：Biggest Gainers、Biggest Losers、Most Active。

![](../../../assets/blog-qveris-ai-stock-research-assistant-4.jpg)

Gainers 返回 50 条，最前面能看到 RGNT、CAST、AREB、CUPR、VSME 这类涨幅非常夸张的标的。Most Active 也返回 50 条，里面出现了 ADTX、GPUS、PAVS、SOXS、SPCX 等高交易关注度标的。Losers 也成功返回 50 条，例如 QGRD、SPCK、ELTX、MLAC、CNTX 等跌幅靠前。

这里我反而更放心了。因为 Agent 不应该只看"涨得最多"，也不应该只看"最活跃"。市场异动更像雷达屏：gainers 告诉你哪里突然冒火，losers 告诉你哪里在塌，most active 告诉你资金和注意力集中在哪里。

这一步不是选股结论，只是帮研究助理建立当天市场语境。
## 第三步：用 Screener 出候选池，再用 ROE 和 PE 做复核

![](../../../assets/blog-qveris-ai-stock-research-assistant-5.jpg)

到这里，我终于开始筛公司。

不过这里有个很重要的发现：FMP 的 Stock Screener 在当前 QVeris schema 里，并不能直接按 ROE 或 PE 过滤。它支持的是 sector、industry、country、market cap、price、volume、exchange、isEtf、isFund、isActivelyTrading 等字段。

所以我没有硬写"我直接用 Screener 筛高 ROE + 低 PE"。那样不真实。

我采用的是两步法：第一步，用 Screener 先筛出 US 市场、Technology sector、市值大于 100 亿美元、成交量大于 500 万、仍在活跃交易、非 ETF、非基金的候选池。第二步，再用 FMP 的 Key Metrics TTM 对候选公司做 ROE 和估值复核。

**这次 Screener 成功返回 10 条候选**：

![](../../../assets/blog-qveris-ai-stock-research-assistant-6.jpg)

这就已经很像一个研究助理该做的事了：先把候选池拿出来，而不是一上来就输出观点。

接着我用 Key Metrics TTM 跑了两个样本：NVDA 和 MSFT。

![](../../../assets/blog-qveris-ai-stock-research-assistant-7.jpg)

NVDA 的 TTM ROE 返回约 **111.66%**，earnings yield 约**3.09%**，换算 PE 大约**32.33**。MSFT 的 TTM ROE 返回约**33.13%**，earnings yield 约**4.22%**，换算 PE 大约**23.71**。

这里就有意思了。前面我们看到 NASDAQ Software - Infrastructure 行业 PE 大约 **44.81**，所以 MSFT 可以先和这个行业水位做一个粗略参照：它的 PE 如果按 earnings yield 反推，大约是**23.71**，明显低于这个行业 PE。

NVDA 则不适合直接拿 Software - Infrastructure 来对比，因为它属于半导体行业。这里更适合把它当成另一个复核样本：它的 TTM ROE 约 **111.66%**，PE 反推约**32.33**，说明 Agent 看到的不是单纯"AI 热度"，而是可以继续追问盈利质量、增长兑现和半导体行业估值水位的研究线索。

我不会把这写成"谁更值得买"。正确的表达应该是：QVeris 可以先筛出候选池，再把行业估值、公司 ROE、估值倍数放在同一张表里，让用户决定下一步复核谁。
## 第四步：补一眼 Share Float，别忽略流通盘

  

最后我又补了一步：Share Float。

很多选股流程会跳过这一步，但我觉得 Agent 不应该跳。因为一个标的的流通盘，会影响流动性、波动性和交易可达性。尤其是在市场异动榜里，小盘、低流通、特殊股权结构的标的经常会出现夸张涨跌。如果 Agent 完全不看 share float，就很容易把"流动性带来的异动"误读成"基本面机会"。

我先跑了 All Shares Float，接口成功返回 10 条，不过第一页样本是 000001.SZ、000002.SZ 这类深市标的，不适合直接放进 US 选股主线。

于是我改用 Company Share Float，查 Screener 候选里的 NVDA。

![](../../../assets/blog-qveris-ai-stock-research-assistant-8.jpg)

这次返回很清楚：NVDA 在 2026-06-15 的 freeFloat 约 **95.89%**，floatShares 约**232.25 亿股**，outstandingShares 约**242.21 亿股**，还带了 SEC source 链接。

这一步的意义不是说 NVDA 好或不好，而是让 Agent 不只看市值、成交量和概念，还能把股本结构放进研究备忘录里。
## 这对 QVeris Agent 意味着什么

  

这次测试下来，我觉得 FMP 这一组行业 / 板块 + Screener 能力，对 QVeris 的意义很明确：

>
> 它让 Agent 从"回答股票问题"变成"搭建筛选流程"。 
>
这两者差别很大。

![](../../../assets/blog-qveris-ai-stock-research-assistant-9.jpg)

![](../../../assets/blog-qveris-ai-stock-research-assistant-10.jpg)

![](../../../assets/blog-qveris-ai-stock-research-assistant-11.jpg)

![](../../../assets/blog-qveris-ai-stock-research-assistant-12.jpg)

![](../../../assets/blog-qveris-ai-stock-research-assistant-13.jpg)

![](../../../assets/blog-qveris-ai-stock-research-assistant-14.jpg)

![](../../../assets/blog-qveris-ai-stock-research-assistant-15.jpg)

回答股票问题很容易变成观点生成：AI 很火，科技股强，估值要注意。搭建筛选流程则更像研究助理：先看行业估值，再看板块表现，再看市场异动，再用 Screener 出候选池，再用 ROE、PE、Share Float 做二次复核。

这套 workflow 最适合的输出不是"买哪只"，而是候选名单、行业估值参照、市场异动背景、基本面复核字段、流通盘检查，以及下一步需要人工确认的问题。

这才是我希望 QVeris Agent 在投研里扮演的角色：不是替用户拍脑袋，而是把原本分散在多个页面、多个接口、多个筛选器里的数据，整理成一个可继续追问的研究框架。

尤其是 AI 这种主题，越热越需要这种框架。因为越热的概念，越容易把"故事""估值""交易热度""基本面质量"混在一起。

这次 QVeris 调 FMP 至少证明了一件事：Agent 可以先不急着给答案，它可以先学会筛。

![](../../../assets/blog-qveris-ai-stock-research-assistant-16.jpg)

>
> 本文仅展示 QVeris × FMP 的数据调用和研究流程，不构成投资建议。
>
