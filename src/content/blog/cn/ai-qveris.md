---
title: 苹果的 AI 牌摊开了，市场为什么不买账？我用 QVeris 跑了六组数据
description: 苹果的 AI 牌摊开了，市场为什么不买账？我用 QVeris 跑了六组数据
pubDate: Jun 09 2026
heroImage: ../../../assets/blog-ai-qveris-cover-cn.png
category: Product
author: QVeris Team
tags:
- QVeris
- Agent
translationKey: ai-qveris
---
QVeris · 数据实测 

#  

北京时间 6 月 9 日凌晨，苹果 WWDC 2026 如期举行。Siri 改名"Siri AI"、接入谷歌 Gemini、Apple Intelligence 全面铺开——这应该是苹果三年来最重要的一场发布会。 

但一个细节很刺眼：发布会进行中，苹果股价从涨超 3% 一路翻绿，收盘跌 1.89%，报 \$301.54。 

下面不是凭感觉分析。我用 QVeris 调了六组接口，把苹果今天的底牌摊开看。
##  

##  

##  

##  

##  

##  

## 第一组：股价在什么位置

  

先看 FMP 的实时数据。苹果当前 \$301.54，市值 \$4.43 万亿，52 周区间 \$195.07 - \$317.40，Beta 1.09。换句话说，股价离历史高点只差 5%，已经不是"便宜"的位置。 

![](../../../assets/blog-ai-qveris-1.png)

再看 Twelve Data 的分析师目标价：12 个月平均目标 \$310.51，中位数 \$310，最乐观 \$400，最悲观 \$215。当前价格 \$301.57，距离平均目标价只有 3% 的上行空间——机构早就把预期打满了。 

这解释了为什么"发布会涨"没能持续：好消息早就被 price in，股价已经没有犯错空间。 
##  

##  

##  

##  

##  

## 第二组：iPhone 到底有多重要

用 FMP 的收入拆分接口看苹果最新季度的产品线（FY2026 Q2，截至 2026.3.28）： 

![](../../../assets/blog-ai-qveris-2.png)

对比上一季（FY2026 Q1 假日季），iPhone 从 \$852.69 亿骤降至 \$569.94 亿——这是正常的季节性回落。但关键在于：**Service 收入连续 4 个季度站稳 \$300 亿以上**，从 2024 Q3 的 \$242.13 亿涨到现在的 \$309.76 亿，涨幅 28%。 

服务收入的持续增长才是苹果估值中最扎实的部分，因为它不受换机周期影响。但反过来说，如果 AI 不能拉动换机，iPhone 这个半壁江山就会拖后腿。
##  

##  

##  

##  

##  

## 第三组：市场在说什么——情绪拆解

用 Alpha Vantage 新闻情感接口抓了 WWDC 前后 50 条 AAPL 相关新闻，逐条分析情绪标签： 

**看多信号（Bullish / Somewhat-Bullish）：**

- Reuters："Apple unveils AI-powered Siri" — 整体 Bullish（0.42），AAPL 关联情感 Bullish（0.44）

- SiliconANGLE："Siri AI as personal assistant built on Gemini" — AAPL 情感 Bullish（0.47）

- NBC News："Apple renames Siri as &#x27;Siri AI&#x27;" — AAPL 情感 Bullish（0.47）

- Inc.com："New Siri AI represents make-or-break moment" — AAPL 情感 Somewhat-Bullish（0.32）

**看空信号（Somewhat-Bearish）：**

- 24/7 Wall St.："Apple Finally Released A Brand-New Siri. Then Its Share Price Cratered." — AAPL 情感 Somewhat-Bearish（-0.26）

- Epic Games 反垄断："Epic opposes Apple petition for certiorari" — AAPL 情感 Somewhat-Bearish（-0.33）

整体而言，媒体对 Siri AI 本身是认可的，但股价下跌的叙事已经独立成型——市场关注的不再是"有没有 AI"，而是"什么时候落地、能拉多少增量"。 

![](../../../assets/blog-ai-qveris-3.png)
##  

## 第四组：Siri AI 真正依赖谁——谷歌和英伟达

## Alpha Vantage 的情感数据同时暴露了另一层关系：在 AAPL 相关新闻里，GOOGL 反复出现。Apple Intelligence 的后端模型依赖谷歌 Gemini，苹果在发布会上也公开确认了这一合作。 

![](../../../assets/blog-ai-qveris-4.png)

再看英伟达。NVDA 当前 \$208.64，市值 \$5.05 万亿，Beta 2.2——Beta 是苹果的两倍。WWDC 发布会上苹果提到"最先进的云端模型"时，虽然没有点名，但推理算力需求绕不开英伟达的 GPU。 

![](../../../assets/blog-ai-qveris-5.png)

换句话说，Siri AI 这个故事的受益方不只有苹果。**谷歌拿到了顶级终端入口，英伟达继续站在算力基础设施的幕后收租。** 这也是苹果股价走弱的一个隐性原因：市场在拆分这个蛋糕，发现苹果不是唯一的赢家。 
##  

## 第五组：分析师到底给苹果定什么价

Twelve Data 的目标价数据显示：12 个月平均目标 \$310.51，当前 \$301.57，隐含涨幅只有 3%。最乐观的机构给到 \$400（+33%），最悲观的只给 \$215（-29%）。 

分歧本身说明问题：在 AI 换机周期这个核心假设上，市场没有共识。乐观方相信 Siri AI 能像当年 5G 一样创造换机潮；悲观方认为 AI 功能还不足以让用户多花 \$1,000 换新手机。
##  

## 第六组：发布会当天的真正叙事

## 把六组数据串起来，苹果今天面临的不是"AI 好不好"的问题，而是更具体的三个矛盾： 

**矛盾一：股价高位 vs 目标价天花板。** \$301 的价格已经把 WWDC 的预期大部分消化了，而分析师平均目标 \$310.51 意味着向上空间极其有限。发布会必须超预期——仅仅是符合预期，就不够。 

**矛盾二：Siri AI 的利好被多个玩家分摊。** 谷歌赚入口、英伟达赚算力、苹果赚换机——最后这个链条能不能走通，要看今年秋天 iPhone 的实际销量。半年后才能验证的故事，发布会当天很难撑股价。 

**矛盾三：服务收入的增长确定，但 iPhone 才是估值锚。** 服务收入 28% 的增速很稳，但 iPhone 占营收 52%，AI 换机能不能发生，直接决定了未来两年的收入天花板。Tim Cook 的最后一届 WWDC 给出了 Siri AI 的方向，但 John Ternus 接任后能不能执行到位，是另一回事。 

  

  

## 六组 QVeris 实测数据一览

![](../../../assets/blog-ai-qveris-6.png)

每一组数据都可以追溯来源、时间戳和原始链接。不是"我们认为"，而是"数据显示"。 
##  

## 最后

## 苹果这场 WWDC 讲清楚了一件事：它不再试图自己做大模型，而是把自己的设备和操作系统变成 AI 能力的分发层。Siri AI + Gemini 是这个战略的第一步。 

但资本市场要的不是方向，是节奏和数字。发布会结束后，苹果进入了"被验货"的周期——今年秋天新机发布、Siri AI 正式推送、第一批用户反馈，才是真正的考试。 

在那之前，\$301 的股价不需要更多想象力，它需要更多证据。 

  

**  
**
