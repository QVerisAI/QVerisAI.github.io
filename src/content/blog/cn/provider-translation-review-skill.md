---
title: 'Provider 翻译审核：从一次表格修订到可复用 Skill'
description: 'Provider 翻译审核：从一次表格修订到可复用 Skill'
pubDate: 'Jun 14 2026'
heroImage: '../../../assets/blog-provider-translation-review-skill-hero.jpg'
category: 'Product'
author: 'QVeris Team'
tags: ['QVeris', 'Agent']
translationKey: 'provider-translation-review-skill'
---
QVeris · 工程实践 
## 背景

Provider 名称看起来只是一个很小的字段。

但在 QVeris 里，它会直接影响用户和 Agent 对工具的理解：这个 provider是公司、数据源、API、SDK，还是某个第三方平台上的接口？如果名称只写成 `API Reference`、`AI/ML API`、`Spotify_Rapid`，用户很难判断它到底能做什么，Agent 在选择和解释工具时也会缺少稳定语义。

所以这次 provider 翻译审核，目标不是把英文机械翻成中文，而是让每个 provider 名称变得更可识别、更可搜索、更可复核。
```
原始 provider 数据 ↓ 逐条查证官网 / 官方文档 / 权威来源 ↓ 判断官方中文名、英文品牌名、业务标签 ↓ 生成推荐 name JSON、理由、置信度、证据链接 ↓ 同事标注与二次修订 ↓ 沉淀为可复用 Skill 和脚本
```
## 难点

这项工作真正麻烦的地方，是 provider 名称并不总是一个"公司名"。

### 表面问题

- 大量记录的 `zh` 直接等于英文，或者为空。

- 部分名称带有导入痕迹，比如 `_Rapid`。

- 有些名称只是文档标题，比如 `API Reference`、`Public API`。

- 有些缩写没有上下文，比如 `AEM`。

### 真实风险

- 容易把第三方 RapidAPI 接口误写成官方 API。

- 容易把母公司、产品线、文档页标题混成一个 provider。

- 纯英文品牌如果没有业务标签，用户看不出用途。

- 没有证据链，后续同事复核只能重新查一遍。

因此，好的翻译不是"看起来中文更多"，而是让 provider 的真实身份更清楚。
## 我们做了什么

第一步是把原始数据和审核数据拆开。原始的 `id/name/url` 保留不动，后面追加审核字段，保证任何改动都能追溯。

| 字段 | 用途 |
| --- | --- |
| 修改后的name | 最终推荐的 JSON，里面的 en 和 zh 都允许优化。 |
| 官网/权威来源 | 记录采用哪个官网、官方文档或权威来源作为依据。 |
| 公司做什么 | 用一句话说明 provider 的真实业务或数据能力。 |
| 候选译名 / 最终译名 | 保留命名选择过程，而不是只留下一个结果。 |
| 理由 / 置信度 / 证据链接 | 让后续审校能快速判断这条是否可靠。 |

**第二步是调整命名口径。我们明确了几个原则**：

- 有官方中文名时，优先采用官方中文名。

- 没有稳定中文名时，不强行音译品牌名。

- 品牌名本身看不出用途时，补一个极短业务标签。

- API、SDK、平台类名称必须保留产品语义，不能只写"公共 API"或"开发者 API"。

- 如果原始 `en` 本身过泛或错误，`修改后的name.en` 也要一起优化。

这最后一点很关键。比如 `AEM Admin API` 不能只翻成 "AEM 管理 API"，因为用户仍然不知道 AEM 是什么。更合适的写法是：
```
{"en":"Adobe Experience Manager (AEM) Admin API","zh":"Adobe Experience Manager（AEM）管理 API"}
```
## 一个具体例子

最近我们又拿数据库里的几条 provider 做了一次小样本验证。它们很好地覆盖了几类典型问题：官方机构、官方 API、第三方 RapidAPI、异常描述字段。

![](../../../assets/blog-provider-translation-review-skill-1.png)

>
> 💡 这里的重点不是"RapidAPI 要不要翻译"，而是不能让导入痕迹变成最终展示名，也不能把第三方接口包装成官方 provider。 
>
## 从一次审核到可复用 Skill 

如果这件事只停留在一次 Excel 修改，后面还会反复踩同样的问题。于是我们把这套经验沉淀成了一个 provider 翻译审核 Skill。

### SKILL.md

定义什么时候触发、审核流程怎么走、输出哪些文件、最后如何校验。

### translation_rules.md

沉淀翻译决策树、命名矩阵、好坏示例、置信度规则。

### evidence_chain.md

沉淀审校表字段、证据链、断点进度、风险项和同事标注流程。

**同时还配了一个脚本，用来做结构化文件检查和辅助输出**：
```
provider_translation_review.py inspect provider_translation_review.py export-marked provider_translation_review.py validate provider_translation_review.py progress-export provider_translation_review.py risk-export provider_translation_review.py apply
```

这样后续再遇到 provider 翻译任务，就不需要从零讨论"怎么翻、怎么标、怎么留证据"。Agent 可以直接按 Skill 的规则工作：先看来源，再做命名，再写理由和置信度，最后导出风险项和写回建议。

>
> 💡 **开源位置预留：** 这里可以放 GitHub 仓库链接、安装方式和一个最小使用示例。当前 Skill 已经整理成可开源结构，包含 \`SKILL.md\`、\`references\` 和 \`scripts\`。 
>
## 用户会感受到什么

第一，provider 列表会更容易读懂。

用户看到的不再是一堆 `AI/ML API`、`API Reference`、`Spotify_Rapid`，而是带有品牌、产品和业务范围的名称。哪怕保留英文，也会知道它大概是做什么的。

第二，同事复核成本会下降。

每条修改都带来源、理由、候选译名和置信度。标注列也能清楚区分"已解决"和"待人工确认"，不会把问题埋在备注里。

第三，后续批量翻译质量会更稳定。

以前翻译质量更多依赖当次模型发挥。现在有了固定规则、few-shot、证据链和脚本校验，Agent 的输出会更接近一套可复用的审校流程。
## 为什么这件事重要

Agent 能不能稳定使用工具，不只取决于工具本身能不能调用，也取决于系统是否能准确理解每个 provider 的身份和边界。

Provider 名称是工具体系里很靠前的一层语义入口。如果这里模糊，后面的选择、解释、审核、搜索都会变得更难。

这次工作把 provider 翻译从"人工修表"推进到"有规则、有证据、有复核、有沉淀"的流程。它不是一次性的翻译任务，而是在给 QVeris 的工具生态补一层更稳的语义基础。

---

原文链接：[微信公众号原文](https://mp.weixin.qq.com/s?src=11&timestamp=1782306755&ver=6802&signature=ZTARrA9sslALul3HMSjo7l29ljsjB2I3UGwY3bGIayp7gihKZgx45qNRGhmkiZnZqiKnRh3i6SjOLhiqlsvD6xk5Q8WtIW-2N0bOTO1zPjzsBNNApvfeabzrY5isJovy&new=1)
