---
title: '4 小时，10 个 Agent 项目 —— 获奖项目详解'
description: 'QVeris 黑客松全记录：4 小时内诞生的 10 个 Agent 项目，逐一解读获奖作品。'
pubDate: 'Mar 13 2026'
heroImage: '../../../assets/blog-qveris-hackathon-projects-1.jpg'
category: 'Announcement'
author: 'QVeris Team'
tags: ['黑客松', 'qveris', '案例']
translationKey: 'qveris-hackathon-projects'
---

上周日，在 **Qveris Friends × 原点学堂** 举办的线下黑客松现场，近百位开发者、产品经理、创作者，在 **4 个小时内** 大放异彩，完成了10 个 AI Agent 项目，

于是我们看到了——会自己抓数据、分析市场的金融 Agent；只靠手势就能完成创作的多模态 Agent；把十几种真实 API 串成一个产品的仪表盘 Agent……

下面，我们将重点**带来这4个获奖  Agent 项目的详细介绍，并附上github链接。**

## 🏆  {align="center"}

## Qveris 特别奖 {align="center"}

## {align="center"}

### LOF 基金套利数据分析系统（funds_advice） {align="center"}

这是一个**把真实金融分析流程交给 Agent 自动执行**的项目，

项目围绕 LOF 基金套利场景，尝试解决一个现实问题：**基金数据、新闻、政策信息分散，人工分析成本高。**

系统由 CC（Claude Code）驱动，通过 **Qveris Skill + Web Fetch** 自动获取：

- LOF 基金核心数据
- 市场新闻与政策事件
- 集思录等外部信息

Agent 按既定提示词完成分析，将结果整理为 **结构化 JSON** 交给后端，前端负责展示套利分析结论，并明确标注投资风险。

整个流程不是聊天式“建议”，而是一次完整、可追溯的 **Agent 行动闭环**：**数据获取 → 分析 → 结果展示 → 风险提示**。

在真实金融数据与政策信息的基础上，跑通了一个可执行的投资分析 Agent 闭环，它体现了 Agent 在**复杂数据整合与决策辅助场景**中的潜力。

<text underline="true">***👉https://github.com/QverisFriends/funds_advice***</text>

![qveris-hackathon-projects-1](../../../assets/blog-qveris-hackathon-projects-1.jpg)

![qveris-hackathon-projects-2](../../../assets/blog-qveris-hackathon-projects-2.png)

![qveris-hackathon-projects-3](../../../assets/blog-qveris-hackathon-projects-3.png)

![qveris-hackathon-projects-4](../../../assets/blog-qveris-hackathon-projects-4.jpg)

![qveris-hackathon-projects-5](../../../assets/blog-qveris-hackathon-projects-5.jpg)

![qveris-hackathon-projects-6](../../../assets/blog-qveris-hackathon-projects-6.jpg)

> ⚠️ 项目声明：仅供学习与娱乐，不构成任何投资建议。

---

### Qveris 智能生活仪表盘（qveris-dashboard） {align="center"}

这是一个**为“探索 Qveris 能力边界”而生的超级 Demo,**

项目以现代化玻璃拟态仪表盘为载体，通过 **Qveris 统一工具调用接口**，在一个页面内跑通了十多类真实能力，包括：

- 🌤️ 天气、空气质量、位置查询
- 📈 股票行情、多周期 K 线、市场情绪
- 📰 实时新闻、加密货币资讯、Hacker News
- 🤖 AI 对话、图片生成、语音合成、视频生成
- 🔍 Qveris API 探索器（可搜索、测试真实工具）

每一个模块背后，都是一次 **Agent → 工具 → 实时数据 → 可视化反馈** 的完整闭环，而不是静态展示。

特别值得一提的是内置的 **Qveris API 探索器**：用户可以直接搜索平台工具，查看成功率、响应时间，并一键真实调用，**把“Agent 基础设施”本身变成了可交互产品**。

通过高密度、多模态的 API 调用，把 Qveris 的行动能力可视化为一个即时可感知的系统级 Demo，它直观展示了 Agent 能“**同时动起来**”的广度。

<text underline="true">***👉https://github.com/QverisFriends/qveris-dashboard***</text>

![qveris-hackathon-projects-7](../../../assets/blog-qveris-hackathon-projects-7.jpg)

![qveris-hackathon-projects-8](../../../assets/blog-qveris-hackathon-projects-8.jpg)

## 🎨 {align="center"}

## Just For Fun：最有趣的奖 {align="center"}

## {align="center"}

## 手势魔法工坊（Magic Art） {align="center"}

这是一个**多模态创作型 Agent 项目**，目标非常直接：**不靠键盘和鼠标，只用手势和语音完成 AI 创作。**

项目基于“前端感知 + 云端 Agent”架构：

- 浏览器端使用 **MediaPipe Hands**，本地实时识别手势（无需上传视频，保护隐私）
- 云端基于 **Qveris Agent System**，按意图动态调度搜索、语音、绘图等工具
- 支持 Fallback 机制，保障生成稳定性

创作流程完全由 Agent 串联完成：

- ✊ 握拳语音输入想法
- 🖐️ 张开手探索灵感趋势
- ✌️🤘🤟 注入不同艺术风格
- 👌 确认生成作品

![qveris-hackathon-projects-9](../../../assets/blog-qveris-hackathon-projects-9.png)

![qveris-hackathon-projects-10](../../../assets/blog-qveris-hackathon-projects-10.png)

![qveris-hackathon-projects-11](../../../assets/blog-qveris-hackathon-projects-11.png)

用户只负责表达意图，**Agent 负责组织 Prompt、调用模型并执行创作**。

项目交互、体验或创意上非常直观——不用解释太多，只要演示出来，就能让人理解它的有趣之处。

它证明了一件事：Agent 不一定要“很重”，**轻巧、有趣、可感知，同样重要。**

<text underline="true">***👉https://github.com/QverisFriends/MagicArt***</text>

## **🏆** {align="center"}

## ** The Best PMF：最具商业潜力的奖** {align="center"}

**SkiCoach AI ** {align="center"}

这是一个为 “探索 AI 赋能滑雪教学的能力边界” 而生的超级 Demo，项目以轻量化的网页端交互为载体，通过**多模态大模型 + 专业滑雪知识库 + 实时雪场数据接口**，在一个系统内跑通了全场景的滑雪辅助能力，包括：

- ❄️ 雪场实时天气、雪质分析、行前装备建议
- 🏂 单板 / 双板动作识别、多阶段技术诊断、个性化修正报告
- 📊 阶梯式训练目标、动作成长曲线、深度对话复盘
- 🎯 初 / 中 / 高级分阶教学、针对性动作库、风险提示

每一个模块背后，都是一次**用户上传 → AI 分析 → 专业输出 → 互动沉淀**的完整闭环，而不是静态的技巧文章。特别值得一提的是内置的**分阶训练体系**：

通过多模态的动作识别与专业知识库结合，把 AI 教练的陪伴能力可视化为一个即时可感知的系统级 Demo，它直观展示了 AI 在个性化运动教学场景中的深度。

![qveris-hackathon-projects-12](../../../assets/blog-qveris-hackathon-projects-12.png)

![qveris-hackathon-projects-13](../../../assets/blog-qveris-hackathon-projects-13.png)

![qveris-hackathon-projects-14](../../../assets/blog-qveris-hackathon-projects-14.png)

![qveris-hackathon-projects-15](../../../assets/blog-qveris-hackathon-projects-15.jpg)

![qveris-hackathon-projects-16](../../../assets/blog-qveris-hackathon-projects-16.jpg)

## **写在最后**

获奖项目有限，但并不意味着“其他项目不够好”。相反，正是因为**大家都跑通了 Agent 行动闭环**，这些奖项才只是在强调不同方向上的亮点。

如果说这次黑客松想留下一个共同结论，那就是：

> **Agent 的时代，不缺想法，开始缺“行动完成度”。**

 {align="center"}

想继续亲眼见证 Qveris AI 如何落地真实案例？下次黑客松，邀你一同解锁更多 Agent 垂直场景新可能！ {align="center"}

长期招募Qveris AI共创营伙伴，期待你的加入👇 {align="center"}

![qveris-hackathon-projects-17](../../../assets/blog-qveris-hackathon-projects-17.jpg)
