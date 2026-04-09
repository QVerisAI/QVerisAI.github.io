---
title: 'QVeris 官方 Skill 正式发布'
description: 'QVeris 官方 Skill 正式上线 OpenClaw：一行命令，让你的智能体拥有上万种工具的调用能力。'
pubDate: 'Mar 13 2026'
heroImage: '../../../assets/blog-qveris-skill-for-openclaw-hero.png'
category: 'Engineering'
author: 'QVeris Team'
tags: ['openclaw', 'skill', 'qveris']
translationKey: 'qveris-skill-for-openclaw'
---

QVeris 团队出品，为 OpenClaw 及其他 AI Agent 打造的官方技能插件。

**安装：**

```plaintext

npx clawhub install qveris-official

```

**GitHub：**

https://github.com/QVerisAI/open-qveris-skills/tree/main/qveris-official

**ClawHub：**

https://clawhub.ai/linfangw/qveris-official

## 01.

## 为什么做官方 Skill？

我们注意到 ClawHub 和 GitHub 上已经出现了多个社区开发者自发构建的 QVeris 技能插件——这让我们非常欣喜。这说明开发者们确实需要把 QVeris 集成到自己的 Agent 中，我们感谢每一位社区贡献者对 QVeris 生态的推动。

但随着 QVeris 平台能力扩展到 10,000+ 工具、覆盖数十个领域，我们意识到 Agent 需要更深层的引导才能充分发挥平台的价值。因此，我们从零开始构建了这个官方 Skill。

## 02.

## 有什么不同？

## 零额外依赖

装了 OpenClaw 就有 Node.js，不需要任何其他东西。

## 完整的 Agent 行为手册，而非简单封装

大多数第三方 Skill 提供的是基础的"搜索+执行"封装——能用，但留给 Agent 自己摸索的空间太多。

官方 Skill 包含一份 **SKILL.md**——一本完整的 Agent 行为手册：

🔄 **QVeris-First 协议**

强制工作流：搜索 QVeris → 评估工具 → 执行调用 → 仅在 QVeris 确实无结果后才回退到网页搜索。Agent 被训练为"先问 QVeris，再考虑其他"。

📋 **12 领域触发条件表**

覆盖金融市场、宏观经济、区块链、学术研究、图像生成、地理编码、邮件/短信、医疗健康等 12 个领域的完整检查清单。Agent 自动识别何时应该调用 QVeris。

🔍**搜索最佳实践**

- 查询编写规则（好例子/坏例子对比）
- 多种表述重试策略（第一次没找到，换个说法再搜）
- 搜索粒度建议（越具体越好）

⚖️ **工具选择标准**

不是盲目选第一个搜索结果，而是按 `success_rate`（成功率）、`avg_execution_time_ms`（平均执行时间）、参数质量、输出相关性逐一评估。

📝 **参数填写指南**

数据类型校验、格式约定（ISO 日期、股票代码、经纬度坐标）、常见错误对照表——避免因参数格式错误导致的静默失败。

🔧**三步错误恢复协议**

修复参数 → 简化重试 → 切换替代工具 → 如实报告。Agent 不会因为一次失败就放弃。

💾**已知工具文件（Known Tools File）**

持久化缓存机制：记住哪些工具用过、效果如何，避免重复搜索，节省 Token 消耗。跨会话复用工具知识。

**🚫 11 条反模式规则**

明确禁止：编造数据、跳过 QVeris 直接说"做不到"、把自然语言当参数传、一次失败就放弃……确保 Agent 行为可靠、可信。

✅**每轮响应前检查清单**

Agent 在生成每一条回复前，自动检查：这个任务是否需要外部数据？是否需要工具能力？是否需要外部服务？如果是，是否已经搜索过 QVeris？

## 全品类覆盖

官方 Skill 让 Agent 知道 QVeris 的**完整能力版图**：

- **数据源**：金融市场（股票、加密货币、外汇、大宗商品、ETF）、宏观经济指标、公司财报、新闻资讯、社交媒体分析、区块链/链上数据、学术论文、临床试验、天气气候、卫星影像
- **工具服务：** 图像/视频生成、文字转语音、语音识别、OCR、PDF 提取、内容转换、翻译、AI 模型推理、代码执行
- **SaaS 集成：** 邮件发送、短信通知、云存储、工作流自动化、CRM 操作
- **位置与地理：** 地图、地理编码、反向地理编码、步行/驾车导航、POI 搜索、卫星影像
- **学术研究：** 论文检索、专利数据库、临床试验注册、数据集发现

第三方 Skill 通常覆盖其中部分领域。官方 Skill 确保 Agent 了解所有领域的可用能力。

## 内建安全与质量保障

- **绝不编造数据** — QVeris 和回退方案都失败时，Agent 如实报告，不用假数据填补空白
- **绝不默默跳过** — Agent 必须先搜索 QVeris，才能说"我做不到"或"我没有权限"
- **学习闭环** — 记录每次执行结果，追踪本地成功率，从参数错误中学习，避免重复犯错
- **Token 优化** — Known Tools File 缓存机制防止长对话中反复搜索导致上下文膨胀

## 03.

## 快速开始

```plaintext

1. 安装npx clawhub install qveris-official2. 设置 API Keyexport QVERIS_API_KEY="your-key-here"在 https://qveris.ai 获取 API Key3. 完成。你的 Agent 现在可以访问 10,000+ 工具了。

```

## 手动命令（测试用）

```plaintext

cd skills/qveris-official搜索工具node scripts/qveris_tool.mjs search "Real-time stock quote data API"执行工具node scripts/qveris_tool.mjs execute <tool_id> \  --search-id <id> \  --params '{"symbol": "AAPL"}'输出原始 JSONnode scripts/qveris_tool.mjs search "Weather forecast API" --json

```

## 04.

## 一览

## 05.

## 未来规划

我们会持续迭代官方 Skill：

- 基于任务上下文和 Agent 历史的智能路由
- 成本感知的工具发现（"找最便宜且可靠的方案"）
- 单次查询中的多工具编排
- 欢迎社区反馈——请在 GitHub 上提 Issue

## 06.

## 链接

**GitHub：**

https://github.com/QVerisAI/open-qveris-skills/tree/main/qveris-official

**ClawHub：**

https://clawhub.ai/linfangw/qveris-official

**获取 API Key：**

https://qveris.ai

**QVeris 文档：**

https://qveris.ai/docs

**QVeris 团队出品 🦞**
