---
title: 'QVerisBot（Clawdbot 增强版）从 0 到 1 飞书部署指南'
description: 'QVerisBot（Clawdbot 增强版）从 0 到 1 在飞书完成部署的完整实操指南。'
pubDate: 'Mar 13 2026'
heroImage: '../../../assets/blog-qverisbot-feishu-deploy-1.jpg'
category: 'Engineering'
author: 'QVeris Team'
tags: ['qverisbot', 'clawdbot', '飞书', '部署', '教程']
translationKey: 'qverisbot-feishu-deploy'
---

在开始部署前可以飞书扫码进群看一下QVerisBot部署后的效果👇

![qverisbot-feishu-deploy-1](../../../assets/blog-qverisbot-feishu-deploy-1.jpg)

![qverisbot-feishu-deploy-2](../../../assets/blog-qverisbot-feishu-deploy-2.jpg)

另外请登录QVeris官网注册登录获取你的API KEY，后续会用到：

https://qveris.ai/

## <text color="purple">01.</text>

## 项目简介

## <text color="purple">1.1 QVerisBot 简介</text>

**QVerisBot** 是由 QVeris AI 团队开发的个人 AI 助手，基于开源项目 Moltbot 进行了深度定制和增强。QVerisBot 不仅仅是一个聊天机器人，而是一个能够调用上万专业工具和数据的多功能AI 助手。

![qverisbot-feishu-deploy-3](../../../assets/blog-qverisbot-feishu-deploy-3.jpg)

**核心特性**：

- **QVeris 万能工具箱**集成 QVeris 平台，可搜索和调用金融、科研、医疗、体育等多领域的专业工具和数据（
- **飞书原生支持**深度集成飞书（Feishu/Lark），特别适合中国企业用户
- **多渠道接入**支持 WhatsApp、Telegram、Slack、Discord、Signal、飞书等多种消息平台
- **本地部署**在你自己的设备上运行，数据安全可控
- **大模型代理**支持 HTTP 代理，方便在网络受限环境中使用

**GitHub 仓库**：

**https://github.com/QVerisAI/QVerisBot（欢迎star⭐）**

### <text color="purple">1.2 QVeris 万能工具箱</text>

QVerisBot 集成了 QVeris 平台的万能工具箱，可以搜索和调用各类外部可信工具，将助手从简单的聊天机器人升级为多功能专业助手。支持的领域包括：

- **金融数据**股票行情、财务报表、市场分析
- **科研工具**论文检索、数据分析、实验计算
- **医疗健康**医学知识库、药物信息查询
- **体育数据**赛事信息、球员数据、比分查询
- **网络搜索**智能搜索、新闻聚合、实时信息

QVeris 工具通过两个核心 API 实现：

- `**qveris_search**`使用自然语言搜索可用工具
- `**qveris_execute**`执行指定工具并获取结果

### <text color="purple">1.3 飞书深度支持</text>

QVerisBot 原生支持飞书（Feishu/Lark），特别适合中国企业用户：

- **群聊支持**支持飞书群组消息处理
- **WebSocket 长连接**无需公网 IP，本地开发环境友好
- **消息撤回处理**支持消息撤回事件，自动停止正在处理的任务 *(🚧 开发中)*
- **富文本消息**支持 Markdown 格式的消息渲染
- **图片消息**支持发送和接收图片 *(🚧 开发中)*

### <text color="purple">1.4 大模型代理支持</text>

支持为所有 LLM API 调用配置 HTTP 代理，方便在网络受限环境中使用：

```plaintext

{  "models": {    "proxy": "http://user:pass@proxy:8080"  }}

```

### <text color="purple">1.5 Moltbot 基础平台</text>

QVerisBot 基于 Moltbot（前身为 Clawdbot）开发，继承了其强大的平台能力：

- **本地优先的网关架构**单一控制平面管理会话、渠道、工具和事件
- **多渠道支持**连接多种即时通讯平台
- **多代理路由**将入站消息路由到隔离的代理（独立工作区 + 会话）
- **语音交互**支持 macOS/iOS/Android 的语音唤醒和对话模式
- **实时画布**代理驱动的可视化工作区
- **一流的工具支持**浏览器控制、画布、节点、定时任务等

## <text color="purple">02. </text>

## 安装依赖

### <text color="purple">2.1 系统要求</text>

![qverisbot-feishu-deploy-4](../../../assets/blog-qverisbot-feishu-deploy-4.png)

### <text color="purple">2.2 macOS 安装</text>

#### .1 安装 Homebrew（如果尚未安装）

```plaintext

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

```

#### .2 安装 Node.js 22+

```plaintext

## 方式一：使用 Homebrewbrew install node@22echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrcsource ~/.zshrc# 方式二：使用 nvm（推荐）curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh| bashsource ~/.zshrcnvm install 22nvm use 22nvm alias default 22

```

#### .3 安装 pnpm

```plaintext

## 方式一：使用官方安装脚本（推荐）curl -fsSL https://get.pnpm.io/install.sh | sh -source ~/.zshrc# 方式二：使用 npm 安装npm install -g pnpm@latest# 方式三：使用 Homebrewbrew install pnpm# 验证安装pnpm --version

```

#### .4 安装 Python 3.12+

```plaintext

## 使用 Homebrewbrew install python@3.12# 验证安装python3 --version

```

### <text color="purple">2.3 Linux 安装</text>

以下示例基于 Ubuntu 24.04 LTS / Debian 12，其他发行版请参考对应的包管理器命令。

#### .1 更新系统包

```plaintext

sudo apt update && sudo apt upgrade -y

```

#### .2 安装 Node.js 22+

```plaintext

## 方式一：使用 NodeSource 仓库curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -sudo apt install -y nodejs# 方式二：使用 nvm（推荐）curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh| bashsource ~/.bashrcnvm install 22nvm use 22nvm alias default 22# 验证安装node --version  # 应显示 v22.x.xnpm --version

```

#### .3 安装 pnpm

```plaintext

## 方式一：使用官方安装脚本（推荐）curl -fsSL https://get.pnpm.io/install.sh | sh -source ~/.bashrc# 方式二：使用 npm 安装npm install -g pnpm@latest# 验证安装pnpm --version

```

#### .4 安装 Python 3.12+

```plaintext

## Ubuntu 24.04 自带 Python 3.12# 对于旧版本系统，使用 deadsnakes PPAsudo add-apt-repository ppa:deadsnakes/ppasudo apt updatesudo apt install -y python3.12 python3.12-venv python3.12-dev python3-pip# 验证安装python3.12 --version

```

#### .5 安装其他必要依赖

```plaintext

## 编译工具（部分 npm 包需要）sudo apt install -y build-essential# Gitsudo apt install -y git

```

### <text color="purple">2.4 Python 库依赖</text>

### QVerisBot 的 Python 测试脚本和技能（skills）使用以下库：

![qverisbot-feishu-deploy-5](../../../assets/blog-qverisbot-feishu-deploy-5.png)

安装方式：

```plaintext

## 全局安装常用库pip3 install requests matplotlib# 技能开发依赖（可选）pip3 install fastapi httpx uvicorn pytest

```

## <text color="purple">03. </text>

## 飞书账号准备

飞书配置需要分两步完成：

1.完成除事件配置之外的所有配置2.启动 QVerisBot 后，再配置事件订阅

### <text color="purple">3.1 申请飞书开发者账号</text>

1. 访问飞书开放平台
1. 使用飞书账号登录（需要企业管理员权限或个人开发者账号）
1. 进入开发者后台

### <text color="purple">3.2 创建应用</text>

1. 点击 **创建应用** → 选择 **企业自建应用**
1. 填写应用信息：
  - **应用名称**如 "QVerisBot"
  - **应用描述**AI 智能助手
  - **应用图标**上传一个图标
1. 点击 **确定创建**

### <text color="purple">3.3 添加机器人能力</text>

1. 进入应用详情页
1. 在左侧菜单选择 **添加应用能力**
1. 点击 **机器人** 卡片的 **添加能力**
1. 配置机器人信息：
  - **Bot Name**机器人在聊天中显示的名称
  - **Bot Description**机器人描述

### <text color="purple">3.4 配置权限</text>

在 **权限管理** 页面，添加以下权限：

![qverisbot-feishu-deploy-6](../../../assets/blog-qverisbot-feishu-deploy-6.png)

#### 用户信息权限（可选）

![qverisbot-feishu-deploy-7](../../../assets/blog-qverisbot-feishu-deploy-7.png)

### <text color="purple">3.5 获取凭证</text>

在 **凭证与基础信息** 页面获取：

- **App ID**类似 `cli_xxxxxxxxxxxxxxxxxx`
- **App Secret**点击查看获取密钥

> ⚠️ **安全提示**：App Secret 是敏感信息，请妥善保管，不要提交到版本控制系统。

### <text color="purple">3.6 发布应用（第一步完成后）</text>

1. 进入 **版本管理与发布**
1. 创建版本
1. **设置可用范围**
  - 在发布配置中，需要选择 **机器人的可用范围**
  - 点击 **添加用户** 或 **添加部门**，选择可以使用该机器人的用户
  - **！重要**：只有被添加到可用范围内的用户才能将机器人添加到群聊中
1. 提交审核
1. 等待管理员审核通过
1. 发布应用

> 注意：应用需要发布后才能正常接收消息。开发阶段可以先在测试企业中使用。

### <text color="purple">3.7 事件订阅配置（第二步，需要先启动 QVerisBot）</text>

> ⚠️ **重要**：此步骤需要在 QVerisBot 成功启动后才能完成，因为 QVerisBot 会启动飞书需要的 WebSocket 长连接监听进程。

在 **事件订阅** 页面：

1. **选择订阅方式**：选择 **使用长连接接收事件（推荐）**
- 长连接模式无需公网 IP，本地开发更方便
- QVerisBot 默认使用此模式
1. **添加事件**：

![qverisbot-feishu-deploy-8](../../../assets/blog-qverisbot-feishu-deploy-8.png)

1. 保存配置

## <text color="purple">04.</text>

## 克隆代码

```plaintext

## 克隆 QVerisBot 仓库git clone https://github.com/QVerisAI/QVerisBot.gitcd QVerisBot

```

## <text color="purple">05.</text>

## 编译项目

### <text color="purple">5.1 安装依赖</text>

```plaintext

## 安装所有 Node.js 依赖（包括扩展）pnpm install

```

### <text color="purple">5.2 构建 UI（首次运行需要）</text>

```plaintext

pnpm ui:build

```

### <text color="purple">5.3 编译 TypeScript</text>

```plaintext

pnpm build

```

### <text color="purple">5.4 验证编译结果</text>

```plaintext

## 检查 dist 目录是否生成ls -la dist/# 验证 CLI 可执行pnpm moltbot --version

```

### <text color="purple">5.5 开发模式（可选）</text>

如果需要在开发时自动重新编译：

```plaintext

## 监听文件变化并自动重启网关pnpm gateway:watch

```

## <text color="purple">06.</text>

## 配置

### <text color="purple">6.1 配置文件位置</text>

QVerisBot 的配置文件位于 `~/.moltbot/moltbot.json`。

```plaintext

## 创建配置目录mkdir -p ~/.moltbot

```

### <text color="purple">6.2 完整配置示例</text>

创建配置文件 `~/.moltbot/moltbot.json`：

```plaintext

{  "agent": {    "model": "anthropic/claude-opus-4-5"  },  "channels": {    "feishu": {      "enabled": true,      "appId": "cli_xxxxxxxxxxxxxxxxxx",      "appSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",      "eventMode": "websocket",      "startupChatId": "oc_xxxxxxxxxxxxxxxxxxxxxxxxxx",      "dmPolicy": "open",      "groupPolicy": "open"    }  },  "tools": {    "qveris": {      "enabled": true,      "apiKey": "your-qveris-api-key"    },    "web": {      "search": {        "enabled": true,        "provider": "qveris",        "qveris": {          "toolId": "xiaosu.smartsearch.search.retrieve.v2.6c50f296_domestic"        }      }    }  },  "models": {    "proxy": "http://127.0.0.1:7890"  }}

```

### <text color="purple">6.3 配置项详解</text>

#### .1 Agent 配置

```plaintext

{  "agent": {    "model": "anthropic/claude-opus-4-5"  }}

```

支持的模型格式：`provider/model-name`，例如：

- `anthropic/claude-opus-4-5`
- `openai/gpt-4o`
- `google/gemini-2.0-flash`

#### .2 飞书配置

```plaintext

{  "channels": {    "feishu": {      "enabled": true,      "appId": "cli_xxx",      "appSecret": "xxx",      "eventMode": "websocket",      "startupChatId": "oc_xxx",      "allowOnlyStartupChats": false,      "dmPolicy": "open",      "groupPolicy": "open",      "requireMention": true,      "groups": {        "oc_xxx": {          "requireMention": false,          "systemPrompt": "你是这个群组的专属助手"        }      }    }  }}

```

![qverisbot-feishu-deploy-9](../../../assets/blog-qverisbot-feishu-deploy-9.png)

##### startupChatId 配置说明

`startupChatId` 是飞书群组的唯一标识符，用于：

1. QVerisBot 启动时向该群组发送启动通知
1. 配合 `allowOnlyStartupChats: true` 可限制机器人只在指定群组中响应

**如何获取群组 ID (chat_id)**：

1. **方法一：通过飞书群设置获取**
- 在飞书中打开目标群聊
- 点击群名称进入群设置
- 向下滚动找到 **群号**（即 chat_id），格式为 `oc_xxxxxxxxxxxxxxxxxx`
1. **方法二：通过机器人日志获取**
- 先启动 QVerisBot（不配置 startupChatId）
- 将机器人添加到目标群聊
- 在群里 @机器人 发送一条消息
- 查看 QVerisBot 日志，会显示类似：

```plaintext

feishu: message context created - chatId=oc_xxxxxxxxxxxxxxxxxx, ...

```

```plaintext

复制日志中的 chatId值

```

1. **方法三：通过飞书开放平台 API**
- 使用 获取群列表 API
- 或使用项目中的测试脚本`python test_scripts/test_feishu_connection.py`

**配置示例**：

```plaintext

{  "channels": {    "feishu": {      "startupChatId": "oc_xxxxxxxxxxxxxxxxxxxxxxxxxx",      "allowOnlyStartupChats": false    }  }}

```

支持配置多个群组：

```plaintext

{  "channels": {    "feishu": {      "startupChatId": ["oc_group1", "oc_group2", "oc_group3"]    }  }}

```

#### .3 QVeris 配置

```plaintext

{  "tools": {    "qveris": {      "enabled": true,      "apiKey": "your-qveris-api-key",      "baseUrl": "https://qveris.ai/api/v1",      "timeoutSeconds": 60,      "maxResponseSize": 20480,      "searchLimit": 10    }  }}

```

![qverisbot-feishu-deploy-10](../../../assets/blog-qverisbot-feishu-deploy-10.png)

#### .4 大模型代理配置

```plaintext

{  "models": {    "proxy": "http://user:pass@proxy:8080",    "providers": {      "custom-openai": {        "baseUrl": "https://your-proxy.com/v1",        "apiKey": "your-api-key",        "models": [          {            "id": "gpt-4o",            "name": "GPT-4o via Proxy",            "reasoning": false,            "input": ["text", "image"],            "cost": { "input": 2.5, "output": 10, "cacheRead": 1.25, "cacheWrite": 2.5 },            "contextWindow": 128000,            "maxTokens": 16384          }        ]      }    }  }}

```

#### .5 web_search配置

默认的web_search是Brave Search，需要申请Apikey并产生费用。可以设置成使用QVeris的工具进行web search，有多个QVeris的工具可选，例如小宿的搜索工具，配置如下：

```plaintext

    "tools": {        "qveris": {            "enabled": true,            "apiKey": "your-qveris-api-key"        },        "web": {            "search": {                "enabled": true,                "provider": "qveris",                "qveris": {                  "toolId": "xiaosu.smartsearch.search.retrieve.v2.6c50f296_domestic"                }                        }        }    }

```

### <text color="purple">6.4 环境变量配置</text>

也可以通过环境变量配置敏感信息：

```plaintext

## 飞书凭证export FEISHU_APP_ID="cli_xxx"export FEISHU_APP_SECRET="xxx"# QVeris API 密钥export QVERIS_API_KEY="your-api-key"# 大模型 API 密钥export ANTHROPIC_API_KEY="sk-ant-xxx"export OPENAI_API_KEY="sk-xxx"# HTTP 代理（可选）export HTTP_PROXY="http://127.0.0.1:7890"export HTTPS_PROXY="http://127.0.0.1:7890"

```

建议将这些配置添加到 `~/.profile` 或 `~/.zshrc` 中。

## <text color="purple">07.</text>

## 运行

### <text color="purple">7.1 首次运行（推荐使用向导）</text>

```plaintext

## 运行安装向导pnpm moltbot onboard --install-daemon

```

向导会引导你完成：

- 网关配置
- 工作区设置
- 渠道配置
- 技能安装

### <text color="purple">7.2 启动网关</text>

```plaintext

## 前台运行（推荐开发时使用）pnpm moltbot gateway --port 18789 --verbose# 后台运行nohup pnpm moltbot gateway --port 18789 > /tmp/moltbot-gateway.log 2>&1 &

```

### <text color="purple">7.3 验证运行状态</text>

```plaintext

## 检查渠道状态pnpm moltbot channels status# 深度检查（包括连接探测）pnpm moltbot channels status --deep# 检查飞书连接pnpm moltbot channels status feishu

```

### <text color="purple">7.4 运行诊断</text>

如果遇到问题，运行诊断工具：

```plaintext

pnpm moltbot doctor

```

### <text color="purple">7.5 飞书事件配置（第二步）</text>

当网关成功启动并显示类似以下日志时：

```plaintext

feishu: connecting to Feishu WebSocket server...feishu: WebSocket connection establishedfeishu: connected as "QVerisBot" (ou_xxx)

```

```plaintext

现在可以返回飞书开放平台完成 3.7 事件订阅配置。

```

## <text color="purple">08.</text>

## 使用说明

### <text color="purple">8.1 基本对话</text>

在飞书中与机器人对话：

1. **私聊**直接发送消息给机器人
1. **群聊**@机器人 后发送消息（如果配置了 requireMention）

### <text color="purple">8.2 聊天命令</text>

在飞书聊天中发送以下命令：

![qverisbot-feishu-deploy-11](../../../assets/blog-qverisbot-feishu-deploy-11.png)

### <text color="purple">8.3 使用 QVeris 工具</text>

QVerisBot 会自动识别需要使用外部工具的场景。你也可以显式请求：

```plaintext

帮我查询一下北京今天的天气搜索最新的 AI 技术新闻查询腾讯股票的实时行情

```

### <text color="purple">8.4 CLI 命令</text>

```plaintext

## 发送消息pnpm moltbot message send --to oc_xxx --message "Hello from QVerisBot"# 与助手对话pnpm moltbot agent --message "帮我写一个 Python 脚本" --thinking high# 查看帮助pnpm moltbot --helppnpm moltbot gateway --helppnpm moltbot channels --help

```

### <text color="purple">8.5 日志查看</text>

```plaintext

## 发送消息pnpm moltbot message send --to oc_xxx --message "Hello from QVerisBot"# 与助手对话pnpm moltbot agent --message "帮我写一个 Python 脚本" --thinking high# 查看帮助pnpm moltbot --helppnpm moltbot gateway --helppnpm moltbot channels --help

```

### <text color="purple">8.6 常见问题</text>

#### Q: 飞书消息收不到？

1. 检查应用是否已发布
1. 检查权限是否正确配置
1. 确认 WebSocket 连接已建立（查看日志是否显示 "WebSocket connection established"）
1. 确认事件订阅已配置（在飞书开放平台的事件订阅页面）
1. 确认用户在应用的可用范围内（发布时设置的用户列表）
1. 检查 `startupChatId` 配置的群组 ID 是否正确

#### Q: QVeris 工具调用失败？

1. 检查 API 密钥是否正确
1. 检查网络连接（可能需要代理）
1. 查看日志中的错误信息

#### Q: 大模型 API 调用超时？

1. 配置 HTTP 代理：`models.proxy`
1. 检查代理服务是否正常工作
1. 尝试切换模型提供商

## 附录

### A. 配置文件模板

完整配置文件模板：`~/.moltbot/moltbot.json`

```plaintext

{  "agent": {    "model": "anthropic/claude-opus-4-5"  },  "agents": {    "defaults": {      "workspace": "~/clawd"    }  },  "gateway": {    "port": 18789,    "bind": "loopback"  },  "channels": {    "feishu": {      "enabled": true,      "appId": "cli_xxx",      "appSecret": "xxx",      "eventMode": "websocket",      "startupChatId": ["oc_xxx"],      "dmPolicy": "open",      "groupPolicy": "open",      "groups": {        "oc_xxx": {          "requireMention": false        }      }    }  },  "tools": {      "qveris": {          "enabled": true,          "apiKey": "your-qveris-api-key"      },      "web": {          "search": {              "enabled": true,              "provider": "qveris",              "qveris": {                "toolId": "xiaosu.smartsearch.search.retrieve.v2.6c50f296_domestic"              }                      },          "fetch": {              "enabled": true          }      }  },  "models": {    "proxy": "http://127.0.0.1:7890"  }}

```

### 相关链接

- QVeris官网链接
- **https://qveris.ai**
- QVerisAI GitHub
- **https://github.com/QverisAI/QverisAI**
- QVerisBot开源链接
- **https://github.com/QVerisAI/QVerisBot**
