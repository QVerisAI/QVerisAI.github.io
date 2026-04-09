---
title: '如何在 Cursor 中使用 QVeris'
description: '在 Cursor 中接入 QVeris 的完整教程：安装插件、获取 API Key、调用真实工具一气呵成。'
pubDate: 'Mar 25 2026'
heroImage: '../../../assets/blog-qveris-in-cursor-1.png'
category: 'Engineering'
author: 'QVeris Team'
tags: ['cursor', 'qveris', '教程']
translationKey: 'qveris-in-cursor'
---

![qveris-in-cursor-1](../../../assets/blog-qveris-in-cursor-1.png)

## Cursor+QVeris能干嘛？

很多人用 AI的体验是：

> 💬「AI 很聪明，但只能说，不能做」

比如：

- 能分析市场，但拿不到**实时金融数据**
- 能规划流程，但**调API经常失败**
- 能写代码，但**不知道该用哪个工具**

QVeris的目的是：让AI在混乱的互联网里，稳定、低成本、可确定地“调用工具和数据”。

当你在Cursor里接入QVeris后：

- AI不再“瞎编数据”
- 不需要你手动集成几十个API
- Agent 可以完成完整的**Search →Decide→Act**

## 如何在Cursor中使用QVeris

Step 1：安装QVeris插件

打开 Cursor

![qveris-in-cursor-2](../../../assets/blog-qveris-in-cursor-2.png)

左上角点击最右侧小箭头展开，打开 Extensions

![qveris-in-cursor-3](../../../assets/blog-qveris-in-cursor-3.png)

搜索QVeris AI，点击Install安装

![qveris-in-cursor-4](../../../assets/blog-qveris-in-cursor-4.png)

Step 2：注册QVeris，获取API KEY

安装完成后在刚刚的拓展界面重新找到QVeris AI

![qveris-in-cursor-5](../../../assets/blog-qveris-in-cursor-5.png)

点击Sign in with Browser，右边弹窗点open，跳转到QVeris官网，注册登录

![qveris-in-cursor-6](../../../assets/blog-qveris-in-cursor-6.png)

完成后得到一个API KEY（注意：这一步很重要，之后要用到）

![qveris-in-cursor-7](../../../assets/blog-qveris-in-cursor-7.jpg)

以上准备工作完成。

Step 3：创建一个项目

点击左上角File，打开Open Folder

![qveris-in-cursor-8](../../../assets/blog-qveris-in-cursor-8.png)

新建一个文件夹，这里示例为“code for example”，选择文件夹

![qveris-in-cursor-9](../../../assets/blog-qveris-in-cursor-9.png)

现在就可以在右侧栏与AI交流你想实现的项目了。

![qveris-in-cursor-10](../../../assets/blog-qveris-in-cursor-10.png)

![qveris-in-cursor-11](../../../assets/blog-qveris-in-cursor-11.png)

![qveris-in-cursor-12](../../../assets/blog-qveris-in-cursor-12.png)

接下来演示如何利用QVeris做一个案例。

直接对 AI 说你要什么

在 Cursor Chat 中输入类似：

> 请帮我借助FMP做一个金融实时分析网站。

![qveris-in-cursor-13](../../../assets/blog-qveris-in-cursor-13.jpg)

![qveris-in-cursor-14](../../../assets/blog-qveris-in-cursor-14.png)

展开也可以看具体调用了哪些工具。

这里需要特别注意，在通过QVeris调用工具的时候，需要特地**@qveris.mdc**，@号前与文字内容相隔一格，再附上注册QVeris时的API KEY。

![qveris-in-cursor-15](../../../assets/blog-qveris-in-cursor-15.jpg)

Cursor 解决的是：**AI 怎么更好地“写”**QVeris 解决的是：**AI 怎么真正“做”**

当两者连在一起，你写的不再只是代码，而是**能行动的 Agent**。
