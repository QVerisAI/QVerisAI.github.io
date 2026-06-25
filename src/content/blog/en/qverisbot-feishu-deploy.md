---
title: 'QVerisBot (Enhanced Clawdbot) Feishu Deployment Guide from Zero to One'
description: 'A complete hands-on guide to deploying QVerisBot (Enhanced Clawdbot) on Feishu from zero to one.'
pubDate: 'Mar 13 2026'
heroImage: '../../../assets/blog-qverisbot-feishu-deploy-1.jpg'
category: 'Engineering'
author: 'QVeris Team'
tags: ['qverisbot', 'clawdbot', '飞书', '部署', '教程']
translationKey: 'qverisbot-feishu-deploy'
---

Before you start deploying, you can scan the Feishu QR code to join the group and see what QVerisBot looks like after deployment👇

![qverisbot-feishu-deploy-1](../../../assets/blog-qverisbot-feishu-deploy-1.jpg)

![qverisbot-feishu-deploy-2](../../../assets/blog-qverisbot-feishu-deploy-2.jpg)

Also, please log in to the QVeris official website, register, and get your API KEY. You will need it later:

https://qveris.ai/

## 01.

## Project Overview

## 1.1 Introduction to QVerisBot

**QVerisBot** is a personal AI assistant developed by the QVeris AI team, deeply customized and enhanced based on the open-source Moltbot project. QVerisBot is not just a chatbot. It is a versatile AI assistant that can call tens of thousands of professional tools and data sources.

![qverisbot-feishu-deploy-3](../../../assets/blog-qverisbot-feishu-deploy-3.jpg)

**Core features**:

- **QVeris universal toolbox** integrates with the QVeris platform to search and call professional tools and data across finance, research, healthcare, sports, and other domains (
- **Native Feishu support** deeply integrates with Feishu (Feishu/Lark), making it especially suitable for enterprise users in China
- **Multi-channel access** supports WhatsApp, Telegram, Slack, Discord, Signal, Feishu, and many other messaging platforms
- **Local deployment** runs on your own device, keeping data secure and under your control
- **LLM proxy support** supports HTTP proxies, making it easier to use in restricted network environments

**GitHub repository**:

**https://github.com/QVerisAI/QVerisBot（欢迎star⭐）**

### 1.2 QVeris Universal Toolbox

QVerisBot integrates the universal toolbox from the QVeris platform. It can search and call trusted external tools, upgrading the assistant from a simple chatbot into a versatile professional assistant. Supported domains include:

- **Financial data** stock quotes, financial statements, market analysis
- **Research tools** paper retrieval, data analysis, experimental calculations
- **Healthcare** medical knowledge bases, drug information lookup
- **Sports data** event information, player data, score lookup
- **Web search** intelligent search, news aggregation, real-time information

QVeris tools are implemented through two core APIs:

- `**qveris_search**` searches available tools using natural language
- `**qveris_execute**` executes the specified tool and retrieves results

### 1.3 Deep Feishu Support

QVerisBot natively supports Feishu (Feishu/Lark), making it especially suitable for enterprise users in China:

- **Group chat support** supports Feishu group message handling
- **WebSocket long connection** does not require a public IP and is friendly to local development environments
- **Message recall handling** supports message recall events and automatically stops tasks currently being processed *(🚧 In development)*
- **Rich text messages** supports Markdown message rendering
- **Image messages** supports sending and receiving images *(🚧 In development)*

### 1.4 LLM Proxy Support

You can configure an HTTP proxy for all LLM API calls, making it easier to use in restricted network environments:

```plaintext

{  "models": {    "proxy": "http://user:pass@proxy:8080"  }}

```

### 1.5 Moltbot Base Platform

QVerisBot is built on Moltbot, formerly Clawdbot, and inherits its powerful platform capabilities:

- **Local-first gateway architecture** manages sessions, channels, tools, and events from a single control plane
- **Multi-channel support** connects to multiple instant messaging platforms
- **Multi-agent routing** routes inbound messages to isolated agents, each with its own workspace and session
- **Voice interaction** supports voice wake-up and conversation modes on macOS, iOS, and Android
- **Real-time canvas** provides an agent-driven visual workspace
- **First-class tool support** includes browser control, canvas, nodes, scheduled tasks, and more

## 02. 

## Install Dependencies

### 2.1 System Requirements

![qverisbot-feishu-deploy-4](../../../assets/blog-qverisbot-feishu-deploy-4.png)

### 2.2 macOS Installation

#### .1 Install Homebrew if you have not installed it yet

```plaintext

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

```

#### .2 Install Node.js 22+

```plaintext

## Option 1: Use Homebrewbrew install node@22echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrcsource ~/.zshrc# Option 2: Use nvm (recommended)curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh| bashsource ~/.zshrcnvm install 22nvm use 22nvm alias default 22

```

#### .3 Install pnpm

```plaintext

## Option 1: Use the official installation script (recommended)curl -fsSL https://get.pnpm.io/install.sh | sh -source ~/.zshrc# Option 2: Install with npmnpm install -g pnpm@latest# Option 3: Use Homebrewbrew install pnpm# Verify the installationpnpm --version

```

#### .4 Install Python 3.12+

```plaintext

## Use Homebrewbrew install python@3.12# Verify the installationpython3 --version

```

### 2.3 Linux Installation

The examples below are based on Ubuntu 24.04 LTS / Debian 12. For other distributions, refer to the corresponding package manager commands.

#### .1 Update system packages

```plaintext

sudo apt update && sudo apt upgrade -y

```

#### .2 Install Node.js 22+

```plaintext

## Option 1: Use the NodeSource repositorycurl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -sudo apt install -y nodejs# Option 2: Use nvm (recommended)curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh| bashsource ~/.bashrcnvm install 22nvm use 22nvm alias default 22# Verify the installationnode --version  # Should show v22.x.xnpm --version

```

#### .3 Install pnpm

```plaintext

## Option 1: Use the official installation script (recommended)curl -fsSL https://get.pnpm.io/install.sh | sh -source ~/.bashrc# Option 2: Install with npmnpm install -g pnpm@latest# Verify the installationpnpm --version

```

#### .4 Install Python 3.12+

```plaintext

## Ubuntu 24.04 includes Python 3.12 by default# For older systems, use the deadsnakes PPAsudo add-apt-repository ppa:deadsnakes/ppasudo apt updatesudo apt install -y python3.12 python3.12-venv python3.12-dev python3-pip# Verify the installationpython3.12 --version

```

#### .5 Install other required dependencies

```plaintext

## Build tools (required by some npm packages)sudo apt install -y build-essential# Gitsudo apt install -y git

```

### 2.4 Python Library Dependencies

### QVerisBot's Python test scripts and skills use the following libraries:

![qverisbot-feishu-deploy-5](../../../assets/blog-qverisbot-feishu-deploy-5.png)

Installation:

```plaintext

## Install commonly used libraries globallypip3 install requests matplotlib# Skill development dependencies (optional)pip3 install fastapi httpx uvicorn pytest

```

## 03. 

## Prepare Your Feishu Account

Feishu configuration requires two steps:

1.Complete all configuration except event configuration2.After starting QVerisBot, configure event subscriptions

### 3.1 Apply for a Feishu Developer Account

1. Visit the Feishu Open Platform
1. Log in with your Feishu account. You need enterprise administrator permissions or a personal developer account
1. Enter the developer console

### 3.2 Create an App

1. Click **Create App** → select **Enterprise Custom App**
1. Fill in the app information:
  - **App name** such as "QVerisBot"
  - **App description** AI intelligent assistant
  - **App icon** upload an icon
1. Click **Confirm Create**

### 3.3 Add Bot Capability

1. Open the app details page
1. Select **Add App Capability** from the left menu
1. Click **Add Capability** on the **Bot** card
1. Configure bot information:
  - **Bot Name** the name shown for the bot in chats
  - **Bot Description** the bot description

### 3.4 Configure Permissions

On the **Permission Management** page, add the following permissions:

![qverisbot-feishu-deploy-6](../../../assets/blog-qverisbot-feishu-deploy-6.png)

#### User Information Permissions (Optional)

![qverisbot-feishu-deploy-7](../../../assets/blog-qverisbot-feishu-deploy-7.png)

### 3.5 Get Credentials

On the **Credentials and Basic Info** page, get:

- **App ID** similar to `cli_xxxxxxxxxxxxxxxxxx`
- **App Secret** click to view and obtain the secret

> ⚠️ **Security note**: App Secret is sensitive information. Store it properly and do not commit it to version control.

### 3.6 Publish the App (After Completing Step One)

1. Go to **Version Management and Release**
1. Create a version
1. **Set availability scope**
  - In the release configuration, you need to select the **bot's availability scope**
  - Click **Add User** or **Add Department**, and select users who can use the bot
  - **Important**: only users added to the availability scope can add the bot to group chats
1. Submit for review
1. Wait for administrator approval
1. Publish the app

> Note: The app must be published before it can receive messages normally. During development, you can first use it in a test tenant.

### 3.7 Event Subscription Configuration (Step Two, Start QVerisBot First)

> ⚠️ **Important**: This step can only be completed after QVerisBot starts successfully, because QVerisBot will start the WebSocket long-connection listener process required by Feishu.

On the **Event Subscription** page:

1. **Select subscription method**: choose **Receive events using long connection (recommended)**
- Long connection mode does not require a public IP, which makes local development easier
- QVerisBot uses this mode by default
1. **Add events**:

![qverisbot-feishu-deploy-8](../../../assets/blog-qverisbot-feishu-deploy-8.png)

1. Save the configuration

## 04.

## Clone the Code

```plaintext

## Clone the QVerisBot repositorygit clone https://github.com/QVerisAI/QVerisBot.gitcd QVerisBot

```

## 05.

## Build the Project

### 5.1 Install Dependencies

```plaintext

## Install all Node.js dependencies, including extensionspnpm install

```

### 5.2 Build the UI (Required on First Run)

```plaintext

pnpm ui:build

```

### 5.3 Compile TypeScript

```plaintext

pnpm build

```

### 5.4 Verify the Build Output

```plaintext

## Check whether the dist directory has been generatedls -la dist/# Verify that the CLI is executablepnpm moltbot --version

```

### 5.5 Development Mode (Optional)

If you need automatic recompilation during development:

```plaintext

## Watch file changes and automatically restart the gatewaypnpm gateway:watch

```

## 06.

## Configuration

### 6.1 Configuration File Location

QVerisBot's configuration file is located at `~/.moltbot/moltbot.json`.

```plaintext

## Create the configuration directorymkdir -p ~/.moltbot

```

### 6.2 Complete Configuration Example

Create the configuration file `~/.moltbot/moltbot.json`:

```plaintext

{  "agent": {    "model": "anthropic/claude-opus-4-5"  },  "channels": {    "feishu": {      "enabled": true,      "appId": "cli_xxxxxxxxxxxxxxxxxx",      "appSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",      "eventMode": "websocket",      "startupChatId": "oc_xxxxxxxxxxxxxxxxxxxxxxxxxx",      "dmPolicy": "open",      "groupPolicy": "open"    }  },  "tools": {    "qveris": {      "enabled": true,      "apiKey": "your-qveris-api-key"    },    "web": {      "search": {        "enabled": true,        "provider": "qveris",        "qveris": {          "toolId": "xiaosu.smartsearch.search.retrieve.v2.6c50f296_domestic"        }      }    }  },  "models": {    "proxy": "http://127.0.0.1:7890"  }}

```

### 6.3 Configuration Details

#### .1 Agent Configuration

```plaintext

{  "agent": {    "model": "anthropic/claude-opus-4-5"  }}

```

Supported model format: `provider/model-name`, for example:

- `anthropic/claude-opus-4-5`
- `openai/gpt-4o`
- `google/gemini-2.0-flash`

#### .2 Feishu Configuration

```plaintext

{  "channels": {    "feishu": {      "enabled": true,      "appId": "cli_xxx",      "appSecret": "xxx",      "eventMode": "websocket",      "startupChatId": "oc_xxx",      "allowOnlyStartupChats": false,      "dmPolicy": "open",      "groupPolicy": "open",      "requireMention": true,      "groups": {        "oc_xxx": {          "requireMention": false,          "systemPrompt": "你是这个群组的专属助手"        }      }    }  }}

```

![qverisbot-feishu-deploy-9](../../../assets/blog-qverisbot-feishu-deploy-9.png)

##### startupChatId Configuration Notes

`startupChatId` is the unique identifier of a Feishu group. It is used to:

1. Send a startup notification to the group when QVerisBot starts
1. Work with `allowOnlyStartupChats: true` to restrict the bot so it only responds in the specified groups

**How to get the group ID (chat_id)**:

1. **Method 1: Get it from Feishu group settings**
- Open the target group chat in Feishu
- Click the group name to enter group settings
- Scroll down and find **Group ID**, which is the chat_id, in the format `oc_xxxxxxxxxxxxxxxxxx`
1. **Method 2: Get it from bot logs**
- Start QVerisBot first without configuring startupChatId
- Add the bot to the target group chat
- Mention the bot in the group and send a message
- Check the QVerisBot logs. You will see something like:

```plaintext

feishu: message context created - chatId=oc_xxxxxxxxxxxxxxxxxx, ...

```

```plaintext

Copy the chatId value from the log

```

1. **Method 3: Use the Feishu Open Platform API**
- Use the API for getting the group list
- Or use the test script in the project: `python test_scripts/test_feishu_connection.py`

**Configuration example**:

```plaintext

{  "channels": {    "feishu": {      "startupChatId": "oc_xxxxxxxxxxxxxxxxxxxxxxxxxx",      "allowOnlyStartupChats": false    }  }}

```

Multiple groups are supported:

```plaintext

{  "channels": {    "feishu": {      "startupChatId": ["oc_group1", "oc_group2", "oc_group3"]    }  }}

```

#### .3 QVeris Configuration

```plaintext

{  "tools": {    "qveris": {      "enabled": true,      "apiKey": "your-qveris-api-key",      "baseUrl": "https://qveris.ai/api/v1",      "timeoutSeconds": 60,      "maxResponseSize": 20480,      "searchLimit": 10    }  }}

```

![qverisbot-feishu-deploy-10](../../../assets/blog-qverisbot-feishu-deploy-10.png)

#### .4 LLM Proxy Configuration

```plaintext

{  "models": {    "proxy": "http://user:pass@proxy:8080",    "providers": {      "custom-openai": {        "baseUrl": "https://your-proxy.com/v1",        "apiKey": "your-api-key",        "models": [          {            "id": "gpt-4o",            "name": "GPT-4o via Proxy",            "reasoning": false,            "input": ["text", "image"],            "cost": { "input": 2.5, "output": 10, "cacheRead": 1.25, "cacheWrite": 2.5 },            "contextWindow": 128000,            "maxTokens": 16384          }        ]      }    }  }}

```

#### .5 web_search Configuration

The default web_search is Brave Search, which requires applying for an API key and incurs costs. You can configure it to use QVeris tools for web search instead. There are multiple QVeris tools to choose from, such as Xiaosu's search tool. Configure it as follows:

```plaintext

    "tools": {        "qveris": {            "enabled": true,            "apiKey": "your-qveris-api-key"        },        "web": {            "search": {                "enabled": true,                "provider": "qveris",                "qveris": {                  "toolId": "xiaosu.smartsearch.search.retrieve.v2.6c50f296_domestic"                }                        }        }    }

```

### 6.4 Environment Variable Configuration

You can also configure sensitive information through environment variables:

```plaintext

## Feishu credentialsexport FEISHU_APP_ID="cli_xxx"export FEISHU_APP_SECRET="xxx"# QVeris API keyexport QVERIS_API_KEY="your-api-key"# LLM API keysexport ANTHROPIC_API_KEY="sk-ant-xxx"export OPENAI_API_KEY="sk-xxx"# HTTP proxy (optional)export HTTP_PROXY="http://127.0.0.1:7890"export HTTPS_PROXY="http://127.0.0.1:7890"

```

We recommend adding these configurations to `~/.profile` or `~/.zshrc`.

## 07.

## Run

### 7.1 First Run (Setup Wizard Recommended)

```plaintext

## Run the setup wizardpnpm moltbot onboard --install-daemon

```

The wizard will guide you through:

- Gateway configuration
- Workspace setup
- Channel configuration
- Skill installation

### 7.2 Start the Gateway

```plaintext

## Run in the foreground (recommended during development)pnpm moltbot gateway --port 18789 --verbose# Run in the backgroundnohup pnpm moltbot gateway --port 18789 > /tmp/moltbot-gateway.log 2>&1 &

```

### 7.3 Verify Runtime Status

```plaintext

## Check channel statuspnpm moltbot channels status# Deep check, including connection probingpnpm moltbot channels status --deep# Check Feishu connectionpnpm moltbot channels status feishu

```

### 7.4 Run Diagnostics

If you encounter issues, run the diagnostic tool:

```plaintext

pnpm moltbot doctor

```

### 7.5 Feishu Event Configuration (Step Two)

When the gateway starts successfully and shows logs similar to the following:

```plaintext

feishu: connecting to Feishu WebSocket server...feishu: WebSocket connection establishedfeishu: connected as "QVerisBot" (ou_xxx)

```

```plaintext

You can now return to the Feishu Open Platform and complete the event subscription configuration in 3.7.

```

## 08.

## Usage

### 8.1 Basic Conversation

Chat with the bot in Feishu:

1. **Direct message** send messages directly to the bot
1. **Group chat** mention the bot before sending a message, if requireMention is configured

### 8.2 Chat Commands

Send the following commands in Feishu chat:

![qverisbot-feishu-deploy-11](../../../assets/blog-qverisbot-feishu-deploy-11.png)

### 8.3 Use QVeris Tools

QVerisBot automatically identifies scenarios where external tools are needed. You can also request them explicitly:

```plaintext

Help me check today's weather in BeijingSearch for the latest AI technology newsCheck Tencent's real-time stock quote

```

### 8.4 CLI Commands

```plaintext

## Send a messagepnpm moltbot message send --to oc_xxx --message "Hello from QVerisBot"# Chat with the assistantpnpm moltbot agent --message "帮我写一个 Python 脚本" --thinking high# View helppnpm moltbot --helppnpm moltbot gateway --helppnpm moltbot channels --help

```

### 8.5 View Logs

```plaintext

## Send a messagepnpm moltbot message send --to oc_xxx --message "Hello from QVerisBot"# Chat with the assistantpnpm moltbot agent --message "帮我写一个 Python 脚本" --thinking high# View helppnpm moltbot --helppnpm moltbot gateway --helppnpm moltbot channels --help

```

### 8.6 FAQ

#### Q: Why am I not receiving Feishu messages?

1. Check whether the app has been published
1. Check whether permissions are configured correctly
1. Confirm that the WebSocket connection has been established. Check whether the logs show "WebSocket connection established"
1. Confirm that event subscriptions have been configured on the event subscription page of the Feishu Open Platform
1. Confirm that the user is within the app's availability scope, which is the user list configured during release
1. Check whether the group ID configured in `startupChatId` is correct

#### Q: Why do QVeris tool calls fail?

1. Check whether the API key is correct
1. Check the network connection. A proxy may be required
1. Review the error messages in the logs

#### Q: Why do LLM API calls time out?

1. Configure an HTTP proxy: `models.proxy`
1. Check whether the proxy service is working normally
1. Try switching model providers

## Appendix

### A. Configuration File Template

Complete configuration file template: `~/.moltbot/moltbot.json`

```plaintext

{  "agent": {    "model": "anthropic/claude-opus-4-5"  },  "agents": {    "defaults": {      "workspace": "~/clawd"    }  },  "gateway": {    "port": 18789,    "bind": "loopback"  },  "channels": {    "feishu": {      "enabled": true,      "appId": "cli_xxx",      "appSecret": "xxx",      "eventMode": "websocket",      "startupChatId": ["oc_xxx"],      "dmPolicy": "open",      "groupPolicy": "open",      "groups": {        "oc_xxx": {          "requireMention": false        }      }    }  },  "tools": {      "qveris": {          "enabled": true,          "apiKey": "your-qveris-api-key"      },      "web": {          "search": {              "enabled": true,              "provider": "qveris",              "qveris": {                "toolId": "xiaosu.smartsearch.search.retrieve.v2.6c50f296_domestic"              }                      },          "fetch": {              "enabled": true          }      }  },  "models": {    "proxy": "http://127.0.0.1:7890"  }}

```

### Related Links

- QVeris official website
- **https://qveris.ai**
- QVerisAI GitHub
- **https://github.com/QverisAI/QverisAI**
- QVerisBot open-source repository
- **https://github.com/QVerisAI/QVerisBot**
