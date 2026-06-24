---
title: '做投研 Agent 缺财报电话会议这块数据吗？QVeris 已经全接好了'
description: '做投研 Agent 缺财报电话会议这块数据吗？QVeris 已经全接好了'
pubDate: 'May 19 2026'
heroImage: '../../../assets/blog-agent-qveris-2-hero.jpg'
category: 'Product'
author: 'QVeris Team'
tags: ['QVeris', 'Agent']
translationKey: 'agent-qveris-2'
---
QVeris · 数据实测 

  

![](../../../assets/blog-agent-qveris-2-1.png)  

你做投研 Agent 时是不是被这件事卡过——客户问 Apple 上季度财报电话会议里 Tim Cook 怎么交接 CEO、CFO 怎么报第一份不再是 Tim 拍板的财报，你的Agent 答不上来。

因为新闻摘要里只有几句二手转述，原始逐字稿在哪？

Bloomberg / Refinitiv 起步几万美金一年。 

财报电话会议逐字稿这事，在国内开发者圈里很少有人讨论。

一搜中文数据库，大部分给到财务报表三张表就停了——Earnings Call 这种"非结构化文本"被默认归到"机构客户专属"那一边。

我抱着试一试的心情翻了几家美股数据 API——Alpha Vantage、Polygon、IEX——没找到能直接拉到完整正文的。

直到我打开 Financial Modeling Prep（下文 FMP）的接口文档，

看到一个"Earnings Call Transcripts"独立包，覆盖说明写着"8,000+ US Listed companies and Foreign Companies Dual Listed on US Exchanges"，深度 10+ 年。 

我盯着那行字看了几秒——这事如果是真的，就是 Bloomberg 级别的内容，价格却是 SaaS 级别。值得试。 
## 一份 Apple 财报会议的完整解剖

  

我先调了一份 AAPL Fiscal Year 2026 Q2，发布于 2026-04-30。

返回的 JSON 一打开吓了一跳：content 字段单字段 51,251 个字符——大约 8,000 个英文词，一份正经的完整逐字稿。 

文章开头是 IR 主持人 Suhasini Chandramouli 的固定开场白：

> "Good afternoon, and welcome to the Apple Q2 Fiscal Year 2026 Earnings Conference Call... Speaking first today is Apple CEO, Tim Cook. John Ternus will be joining after that for a brief set of remarks, and I will be followed by CFO, Kevan Parekh." 

  

接下来 14 位 speakers 依次发言，每位都用 Name:  的格式清晰标注。

Tim Cook 讲完战略，John Ternus 接话——"In my view, Tim is one of the greatest business leaders of all time. Stepping into the role of CEO is an incredible honor"——这不是新闻里的二手转述，是当晚他本人在电话里讲出来的原文。

再往下是 CFO Kevan Parekh 报数：March quarter revenue \$111.2 billion, 同比 +17%，三月季度营收纪录。 

然后是 Q&A，10 位卖方分析师轮流提问。

Morgan Stanley 的 Erik Woodring 上来就向 Tim 致意；Bank of America 的Wamsi Mohan 追问内存成本传导；每个问题、每个回答都完整保留，连"ll save the congrats on the Art of war for next quarter"这种口语化的告别都在里面。 

这是 Bloomberg Transcript 的内容深度，没夸张。 

![FMP Earnings Call Transcripts 历史覆盖](../../../assets/blog-agent-qveris-2-2.png)

 FMP Earnings Call Transcripts 历史覆盖（4 家代表公司） 
## 21年时间轴：从 iPhone 还没出生到 Tim Cook 离场

  

我接着拉了 AAPL 的 transcript dates——拿到 83 期电话会议日期，最早一期是 2005-10-13。也就是说 iPhone 2007 年发布之前两年的 Apple 财报会议逐字稿，FMP 也都保留着。

继续拉 NVDA：80 期，从 2006-01-30 一路到 2026-02-25 那场 4Q FY2026；

拉 TSM（台积电 ADR）：79 期，2006 年开始；

拉 BABA：47 期，从 2014-11-04 阿里上市第一份财报开始算。 

每个数据点都是一场完整的电话会议——意味着

如果你想做"过去 20 年 Apple 在每次苹果设计转向时管理层怎么说"的研究，原始素材就在 FMP 这一个 API 里。 

合同标注的深度是 "10+ Years"，实测大幅超出。 
## 五个国家、八家公司，海外股也通

  

我从 Apple 出发，把测试范围拉宽——专门挑了几家不是美国本土的，但有 ADR 在美股 dual listed 的公司。这是 FMP 这套数据真正的差异化所在： 

![FMP Transcript 正文实测样本](../../../assets/blog-agent-qveris-2-3.png)

 FMP Transcript 正文实测样本（8 家公司 · 5 国上市 · 最新一期） 

 

8 家公司最新一期 transcript 全部返回完整正文，5 个不同国家上市： 

- **美国本土（NASDAQ）**：Apple、NVIDIA、Tesla——每份 4-5 万字符

- **德国 + ADR（XETRA → SAP ADR）**：SAP SE 2026 Q1 五万字

- **台湾 + ADR（TWSE → TSM ADR）**：TSMC 2026 Q1 四万六千字，主持人 Jeff Su 开场

- **港股 + ADR（HKEX → BABA ADR）**：阿里 2026 Q3，连同 11 位分析师 Q&A 全在

- **中概 ADR（NASDAQ ADR）**：PDD Holdings 2025 Q4 三万二千字

- **荷兰 + ADR（Euronext → ASML ADR）**：ASML Q1 略短（9 千字），FMP 录入的是 ASML 改用 video format 后的简版

  

也就是说，你做一个全球科技龙头横向对比 Agent，不需要分别接 6 家数据源。一把 API key、一个 endpoint，符号换一下就出来。 
## 不只是正文：日历、元数据、最新清单

  

光有逐字稿其实不够——你还需要知道哪天哪家公司会开电话会议、哪些公司有 transcript 历史可拉。FMP 这个包里另外还塞了三个配套接口： 

**Transcripts Dates By Symbol**：传一个 ticker 进去，返回这家公司所有可调用 transcript 的 quarter 列表——上文 AAPL 的 83 期、NVDA 的 80 期、TSM 的 79 期都从这里来的。做投研流水线时这是关键的"枚举入口"。 

**Latest Transcripts**：返回最近发布的逐字稿（公司 + quarter + date），实测拿到 2026-05-15 当天发布的 KLC、LFT、RUM、AMAT 等 100 家公司。可以接成"每天上午自动总结昨晚财报会议关键信号"那种 Agent 工作流。 

**Available Transcript Symbols**：返回有 transcript 历史的全量公司清单。FMP 这边返的总数是 10,850 家——超出合同上写的 8,000+。 

四个接口加起来构成一个完整的 Earnings Call 数据栈：哪天开会、哪家有数据、最新一期是什么、正文具体说了什么。 
## 在 QVeris 上真正的用法

 

单份 transcript 4-5 万字，读者真正会让 Agent 干的事不是"Tim Cook 在 Q2 说了啥"——那个新闻摘要已经够用。真正让 Agent 卡住的是这种问题： 

>
> 你：找一下过去 5 年 Apple、NVIDIA、三星这三家在财报电话会议里聊 AI / 大模型时的语气怎么变化的，关键引文贴出来 
>
![](../../../assets/blog-agent-qveris-2-4.png)

![](../../../assets/blog-agent-qveris-2-5.png)

![](../../../assets/blog-agent-qveris-2-6.png)

![](../../../assets/blog-agent-qveris-2-7.png)

几万字 × 几十家 × 几十期的非结构化文本，靠人去读不可能、靠新闻摘要又太浅。

让 Agent 帮你跨公司、跨季度、跨主题去定位和对比，这才是逐字稿数据库真正的用法——不是查单点信息，是做演化研究和横向叙事。 

同样的 Agent 流程能直接覆盖 SAP、TSMC、阿里、三星、ASML 等海外 dual-listed 公司，不需要分别接 6 家 API。 

我们前段时间在 QVeris 上接入了 FMP 全套商业 Package，Earnings Call Transcripts 是其中一个——Bloomberg / Refinitiv 一年几万美金量级的财报会议数据，现在一个普通 AI Agent 开发者就能直接调，目前国内开发者圈里还没看到过同等水准的替代品。 

  

**🎁 现在就试**：

访问 qveris.ai 注册，新用户自动获得 1,000 免费 credits——够你跑完一整个"跨公司、跨季度财报电话会议横向对比"的 Agent 流程。

FMP Earnings Call Transcripts 已经接入，开箱即用，无需自己对接。 

📊 QVeris × 数据供应商系列：每篇深扒一家，只讲实测过的能力。

---

原文链接：[微信公众号原文](https://mp.weixin.qq.com/s/LYAgdIidj1ElOldx6wfL2Q)
