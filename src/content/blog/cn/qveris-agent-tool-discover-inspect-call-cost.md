---
title: Agent 调用工具前，应该先知道三件事：能不能用、怎么调用、要花多少钱
description: QVeris 将工具调用拆成 Discover、Inspect 和 Call 三个阶段，让 Agent 在真实执行和产生费用前先完成可检查、可确认、可追溯的决策。
pubDate: Jul 24 2026
heroImage: ../../../assets/blog-qveris-agent-tool-discover-inspect-call-cost-cover-cn.png
category: Product
author: QVeris Team
tags:
- Agent
- CLI
- QVeris
translationKey: qveris-agent-tool-discover-inspect-call-cost
draft: true
---
当 AI Agent 从“回答问题”走向“完成任务”，真正困难的往往不再是模型能不能生成一段文本，而是它能否在成千上万种外部能力中选对工具、构造正确参数，并在产生费用前做出可解释的决策。

如果把搜索工具和执行工具混成一步，Agent 很容易出现三类问题：发现了名字相似但能力不匹配的接口；沿用旧参数或另一个 Provider 的 schema；还没确认计费规则，就直接发起了真实调用。

QVeris 将这个过程拆成 Discover、Inspect 和 Call 三个明确阶段。它不是为了让 Agent 多走两步，而是把一次不可见的“猜测并执行”，变成一条可以检查、确认和追溯的决策链。

## 从“找到一个工具”到“选择一个可用能力”

传统工具调用通常从一个函数名开始：模型看到工具描述，猜测最合适的函数，然后直接生成参数。这个模式适合少量、稳定、由开发者亲自维护的内部工具；当 Agent 面对大量第三方数据源和实时能力时，工具名称本身远远不够。

它还需要知道这个能力由谁提供、覆盖什么数据、参数是否完整、成功率和延迟如何、数据时效到哪里，以及成功调用可能产生多少费用。只有把这些信息放进调用决策，Agent 才是在“选择能力”，而不是“猜一个接口”。

| 阶段 | Agent 要解决的问题 | 典型输出 | 费用 |
| --- | --- | --- | --- |
| Discover | 有哪些候选能力？ | 候选工具、Provider、质量和成本信号 | 免费 |
| Inspect | 这个工具到底怎么调用？ | 完整参数 schema、必填项、枚举、示例和计费规则 | 免费 |
| Call | 是否确认执行真实操作？ | 调用结果、execution ID、状态、耗时和预结算信息 | 按所选能力的 billing rule |

## 实战：让 Coding Agent 调研 NVIDIA 最新财报与市场表现

下面的案例可以在 Codex、Claude Code、Cursor 或其他支持远程 MCP 的 Agent 中完成。假设我们要分析 NVIDIA 最新财报、当前股价和市场反应，但不希望 Agent 在找到第一个相关工具后立即付费调用。

### 第一步：只发现候选能力，不执行

先给 Agent 一个明确的决策边界：

```text
我要分析 NVIDIA 最新一季财报、当前股价和市场反应。
请先只使用 QVeris Discover 搜索候选能力，不要执行任何 Call。
按数据覆盖、可靠性、延迟和计费规则比较候选工具，并说明你的选择依据。
```

Agent 此时应该返回候选能力，而不是最终投资结论。一个合格的中间结果应说明：哪些工具负责财报或公司基本面，哪些工具负责实时或延迟行情，候选结果来自什么 Provider，以及当前是否能看到成功率、延迟和预计成本。

![](../../../assets/blog-qveris-agent-tool-discover-inspect-call-cost-1.png)

### 第二步：Inspect 最佳候选

确定候选后，不要根据记忆构造参数，而是让 Agent Inspect 当前返回的真实 tool ID：

```text
Inspect 你推荐的财报工具和行情工具。
列出每个工具的必填参数、枚举限制、时间范围、示例参数和调用前成本。
如果 Discover 与 Inspect 的信息有冲突，以 Inspect 的当前 schema 为准。
仍然不要执行 Call。
```

这一步可以提前暴露大量真实问题。例如，工具要求证券代码还是公司名称；交易所需要使用 NASDAQ、US 还是其他枚举；财报周期是季度、财年还是具体日期；实时行情和历史行情是否由不同能力提供。

![Inspect 最佳候选界面，展示多个候选工具 ID 和执行方案确认区域。](../../../assets/blog-qveris-agent-tool-discover-inspect-call-cost-2.png)

### 第三步：让 Agent 给出执行计划和费用说明

在真实调用前，让 Agent 把准备执行的内容翻译成人能检查的计划：

```text
根据 Inspect 结果生成最终执行计划。
逐项列出：工具、Provider、用途、实际参数、预计费用和失败后的处理方式。
在我明确确认前不要调用；不要自动切换到未展示的付费工具。
```

这一步尤其适合可能调用多个数据源的任务。用户可以删除不必要的调用、调整时间范围，或者只批准其中一部分。Agent 获得的不是无限制授权，而是针对当前任务的一次明确确认。

![](../../../assets/blog-qveris-agent-tool-discover-inspect-call-cost-3.png)

### 第四步：确认后 Call，并保留执行证据

确认执行后，Agent 应使用刚刚 Inspect 的 tool ID 和 schema 构造参数。调用结果中应保留 execution ID、成功状态、耗时和计费字段。若 Provider 拒绝、参数错误或上游不可用，Agent 应明确报告失败原因，而不是用一段看似合理的文本掩盖调用失败。

```text
我确认执行上面的两个调用。
完成后请分别报告 execution ID、成功状态、实际耗时、计费摘要和数据时间。
任一调用失败时停止后续综合分析，先解释失败原因和是否产生费用。
```

![](../../../assets/blog-qveris-agent-tool-discover-inspect-call-cost-4.png)

### 第五步：用 Usage History 和 Credits Ledger 做最终核对

调用响应中的费用字段适合即时展示，但最终结算应回到调用历史和积分账本核对。对于团队 Agent，这一步能够回答三个实际问题：这次调用由哪个任务产生；成功、失败或未执行分别如何结算；余额变化是否与调用记录一致。

因此，一个真正闭环的 Agent 任务不是“得到了答案”，而是同时留下选择依据、参数来源、用户确认、执行状态和最终结算记录。

![](../../../assets/blog-qveris-agent-tool-discover-inspect-call-cost-5.png)

## 这种工作流适合哪些场景

**金融与商业研究。** 同一个问题经常需要行情、财报、新闻和宏观数据，先比较数据覆盖与时效，可以减少拿错口径后重新调用。

**合规与企业核验。** KYC、制裁名单和企业登记工具通常有严格参数与地区覆盖，Inspect 能让 Agent 在执行前发现覆盖边界。

**开发与运维 Agent。** 面对 GitHub、监控、云服务和外部状态数据时，可以先以只读方式发现和检查能力，再批准会产生费用或改变状态的操作。

**长时间运行的自动化。** 将 Discover、Inspect 与 Call 分开后，团队可以给不同阶段配置不同策略：发现和检查可以自动完成，真实调用则根据金额、工具类型或风险进入人工确认。

## 给 Agent 开发者的四条建议

1. 不要根据工具名称猜参数；始终使用当前 Discover 或 Inspect 返回的 tool ID 和 schema。
2. 把 billing rule 作为路由条件，而不是调用结束后的附属信息。
3. 保留 search ID、execution ID 和任务 ID，便于把选择、执行和结算关联起来。
4. 对高费用、写操作和敏感数据设置明确的 Human-in-the-loop 门槛。

## 结语

Agent 的自主性不等于“无需确认地调用一切”。更可靠的自主系统，应该能够先发现选项、检查约束、解释选择，再在合适的权限和预算内执行。

QVeris 将 10,000+ 种真实世界能力组织为 Discover、Inspect 和 Call 的统一流程，让 Coding Agent 不只会调用工具，也能在调用前做出可检查的决定。

你可以在 QVeris 的工具搜索页面体验能力发现，也可以通过 Hosted MCP 将这套流程接入 Codex、Claude Code、Cursor 等 Agent 客户端。
