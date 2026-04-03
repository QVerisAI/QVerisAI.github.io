---
title: '快速开始'
description: '在 iframe 中嵌入本站并按语言路由。'
pubDate: 'Apr 01 2026'
heroImage: '../../../assets/qveris-brand.png'
---

欢迎使用 QVeris 文档区。本站设计为可嵌入 [qveris.ai](https://qveris.ai/) 的 iframe，且不包含全站页眉与页脚。

## 语言路由

- 路径：英文 `/doc/en/`、中文 `/doc/cn/`；博客为 `/blog/en/`、`/blog/cn/`。
- 查询参数：在任意 URL 后追加 `?lang=cn` 或 `?lang=en`，中间件会重定向到规范的多语言路径。

## 与父页面集成

将 iframe 的 `src` 指向带语言前缀的地址，例如：

`https://your-site.example/doc/cn/getting-started/`

若要从父壳切换语言而手动拼接路径，可使用：

1. 在 iframe 的 URL 上使用 **`?lang=`**（服务端处理）。
2. 向 iframe **`postMessage`**：`{ type: 'qveris:set-locale', locale: 'cn' }`（由嵌入工具条脚本处理）。
