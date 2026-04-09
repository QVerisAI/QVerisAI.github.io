---
title: 'QVeris CLI: Your Universal API Gateway from the Terminal'
description: 'QVeris CLI turns your terminal into a universal API gateway — call any of 10,000+ tools from a single command line.'
pubDate: 'Apr 08 2026'
heroImage: '../../../assets/blog-qveris-cli-1.png'
category: 'Engineering'
author: 'QVeris Team'
tags: ['cli', 'qveris', 'terminal', 'developer-tools']
translationKey: 'qveris-cli'
---

April 7, 2026

Discover, inspect, and call 10,000+ APIs from your terminal — in natural language, in under 30 seconds.

---

## What is QVeris CLI?

QVeris CLI is a command-line tool that lets developers and AI agents discover, inspect, and execute 10,000+ API capabilities using natural language. No documentation hunting, no boilerplate code, no third-party signups.

Install it in one line. Search for any API in plain English. Call it with a single command.

![qveris-cli-1](../../../assets/blog-qveris-cli-1.png)

## Quick Start

```shell

## Install (macOS / Linux)

curl -fsSL https://qveris.ai/cli/install | bash

## Or via npm

npm install -g @qverisai/cli

## Login

qveris login

## Your first API search

qveris discover "real-time stock quotes"

```

That's it. From zero to your first API call in **30 seconds**.

![qveris-cli-2](../../../assets/blog-qveris-cli-2.png)

<callout emoji="gift" background-color="light-green">

**New users get 1,000 free credits.** Search is always free. No credit card required.

</callout>

---

## How It Works: Discover → Inspect → Call

QVeris CLI follows a three-step workflow — like a search engine for APIs.

### Discover

Describe what you need in plain language:

```shell

qveris discover "real-time stock quotes"

```

```plaintext

Found 6 tools:

  1. finance.stock_quote       Real-time stock quotes    ⚡ 320ms  99.2%
  2. market.live_price         Live market prices        ⚡ 450ms  98.7%
  3. trading.ticker_data       Ticker data & history     ⚡ 280ms  99.5%

```

Every result includes latency and success rate metrics. **Search is free — zero credit cost.**

[📸 Placeholder: terminal screenshot of `qveris discover` output with colorized results]

### Inspect

Check the details before you call:

```shell

qveris inspect 1

```

```plaintext

finance.stock_quote

Real-time stock price quotes from major exchanges

Provider: MarketData Pro  ·  Avg: 320ms  ·  Success: 99.2%

Parameters:

  symbol    string (required)   Stock ticker symbol

  exchange  string (optional)   Exchange code

```

### Call

Execute and get results:

```shell

qveris call 1 --params '{"symbol": "AAPL"}'

```

```json

{ "symbol": "AAPL", "price": 198.52, "change": +2.31, "volume": 45230100 }

```

**Three commands. From "I need a stock API" to live data. Under 30 seconds.**

![qveris-cli-3](../../../assets/blog-qveris-cli-3.png)

---

## Key Features

<grid cols="2">

  <column width="50">

    <callout emoji="mag" background-color="light-blue">

    **Natural Language Search** — Describe what you need. QVeris semantic-matches across 10,000+ tools. No API names to memorize.

    </callout>

    <callout emoji="wrench" background-color="light-blue">

    **Code Generation** — `codegen curl|python|javascript` generates ready-to-use API call code for your project.

    </callout>

    <callout emoji="robot_face" background-color="light-blue">

    **Agent-Optimized** — `--json` output + stdin pipes + structured exit codes. Built for automation from day one.

    </callout>

  </column>

  <column width="50">

    <callout emoji="zap" background-color="light-green">

    **Zero-Config Setup** — One-line `curl` install. Interactive `qveris login`. From zero to productive in 30 seconds.

    </callout>

    <callout emoji="speech_balloon" background-color="light-green">

    **Interactive REPL** — `qveris interactive` opens an exploratory shell to discover and test APIs conversationally.

    </callout>

    <callout emoji="gift" background-color="light-green">

    **Built-in Diagnostics** — `qveris doctor` checks Node.js version, API key, and network connectivity in one command.

    </callout>

  </column>

</grid>

---

## The Most Token-Efficient Way for Agents to Use APIs

If you're building AI agents, QVeris CLI is the lowest-overhead way to give them API access.

Compared to MCP Server (which injects full tool schemas into LLM context — often thousands of tokens), CLI keeps it simple: **one shell command in, JSON result out.**

<lark-table rows="6" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>

    <lark-td>

      Dimension

    </lark-td>

    <lark-td>

      QVeris CLI

    </lark-td>

    <lark-td>

      MCP Server

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      **Best for**

    </lark-td>

    <lark-td>

      Terminal, scripts, agent shell calls

    </lark-td>

    <lark-td>

      IDE agents (Cursor, Claude Code, VS Code)

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      **Install**

    </lark-td>

    <lark-td>

      One-line `curl`

    </lark-td>

    <lark-td>

      IDE configuration

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      **Token cost**

    </lark-td>

    <lark-td>

      ~50–100 tokens per command

    </lark-td>

    <lark-td>

      Schema injection scales with tool count

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      **Output**

    </lark-td>

    <lark-td>

      Human-friendly + `--json`

    </lark-td>

    <lark-td>

      MCP protocol format

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      **Interaction**

    </lark-td>

    <lark-td>

      REPL, pipes, scripts

    </lark-td>

    <lark-td>

      IDE-embedded chat

    </lark-td>

  </lark-tr>

</lark-table>

```shell

## Structured output, agent-ready

qveris discover "aggregate news or financial indicators into structured data" --json --limit 3

## stdin pipe for automation workflows

echo '{"tickers":["AAPL","MSFT","GOOGL"],"interval":"1d"}' | \

  qveris call 1 --params - --json

## Dry-run validation — zero credit cost

qveris call 1 --params '{"tickers":["AAPL","MSFT"],"interval":"1d"}' --dry-run --json

```

<callout emoji="bulb" background-color="light-yellow">

**Why 80%+ token savings?** MCP injects all tool schemas into LLM context (scales linearly with tool count). CLI sends one shell command (~50–100 tokens) and returns structured JSON. At 10+ tools, the difference is massive.

</callout>

Works with **Claude Code, OpenCode, Cursor, custom agent scripts** — anything that can execute a shell command.

<callout emoji="bulb" background-color="light-blue">

**Pro tip:** CLI and MCP Server aren't mutually exclusive. Use CLI for terminal and automation, MCP for IDE workflows. You can run both.

</callout>

---

## Use Cases

### Developer Daily Workflow

Need to verify an API response without leaving the terminal?

```shell

qveris discover "geocoding API"

qveris call 1 --params '{"address": "San Francisco, CA"}'

```

Then run `codegen python` to generate production-ready code you can paste directly into your project.

### Agent Automation Pipelines

Let your AI agent discover, validate, and call APIs through shell:

```shell

## Agent auto-discovers, selects best tool, and calls it

qveris discover "weather forecast" --json --limit 1 | \

  jq -r ".results[0].tool_id" | \

  xargs -I {} qveris call {} --params '{"location":"Shanghai"}' --json

```

### Batch Data Collection

Combine with shell pipes for batch operations:

```shell

## Batch query multiple stocks

for symbol in AAPL GOOGL MSFT; do

  qveris call finance.stock_quote --params "{\"symbol\":\"$symbol\"}" --json

done | jq -s "."

```

---

## Command Reference

<lark-table rows="12" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>

    <lark-td>

      Command

    </lark-td>

    <lark-td>

      Description

    </lark-td>

    <lark-td>

      Cost

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris discover <query>`

    </lark-td>

    <lark-td>

      Natural language API search

    </lark-td>

    <lark-td>

      Free

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris inspect <id>`

    </lark-td>

    <lark-td>

      View tool details, params, examples

    </lark-td>

    <lark-td>

      Free

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris call <id>`

    </lark-td>

    <lark-td>

      Execute a tool and get results

    </lark-td>

    <lark-td>

      1–100 credits

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris interactive`

    </lark-td>

    <lark-td>

      Start interactive REPL

    </lark-td>

    <lark-td>

      —

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris login` / `logout`

    </lark-td>

    <lark-td>

      Authentication management

    </lark-td>

    <lark-td>

      —

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris whoami`

    </lark-td>

    <lark-td>

      Check current auth status

    </lark-td>

    <lark-td>

      —

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris credits`

    </lark-td>

    <lark-td>

      Check remaining balance

    </lark-td>

    <lark-td>

      —

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris config list|set|get|reset`

    </lark-td>

    <lark-td>

      Manage CLI configuration

    </lark-td>

    <lark-td>

      —

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris history`

    </lark-td>

    <lark-td>

      View/clear session history (30min TTL)

    </lark-td>

    <lark-td>

      —

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris doctor`

    </lark-td>

    <lark-td>

      Check Node.js, API key, connectivity

    </lark-td>

    <lark-td>

      —

    </lark-td>

  </lark-tr>

  <lark-tr>

    <lark-td>

      `qveris completions <shell>`

    </lark-td>

    <lark-td>

      Generate shell auto-completion script

    </lark-td>

    <lark-td>

      —

    </lark-td>

  </lark-tr>

</lark-table>

All commands support `--json` output · `--api-key` override · `--timeout` configuration.

![qveris-cli-4](../../../assets/blog-qveris-cli-4.png)

---

## Get Started

```shell

curl -fsSL https://qveris.ai/cli/install | bash

qveris login

qveris discover "any API you need"

```

<callout emoji="rocket" background-color="light-green">

**Three commands. 10,000+ APIs. Free to start.**

- 1,000 free credits on signup — no credit card required
- Search is always free
- Fully open source: [github.com/QVerisAI/QVerisAI](https://github.com/QVerisAI/QVerisAI/tree/main/packages/cli)

</callout>

---

## About QVeris AI

QVeris AI builds **action infrastructure for the agent era** — a semantic search and execution engine that lets AI agents discover and call 10,000+ tools through a single interface.

**Products:**

- **QVeris CLI** — Universal API gateway from the terminal (this article)
- **QVeris MCP Server** — Tool gateway for IDE agents
- **QVerisBot** — Production-grade AI assistant built on OpenClaw
- **QVeris REST API** — Standard HTTP interface for any language and platform

**Website:** [https://qveris.ai](https://qveris.ai)**CLI Docs:** [https://qveris.ai/docs/cli](https://qveris.ai/docs/cli)**GitHub:** [https://github.com/QVerisAI/QVerisAI](https://github.com/QVerisAI/QVerisAI)**X (Twitter):** [@QVerisAI](https://x.com/QVerisAI)

---

## X Thread Draft

> Ready-to-post thread for X (Twitter). Each tweet is ≤ 280 characters.

**1/7** 🧵We just shipped QVeris CLI — discover and call 10,000+ APIs from your terminal using natural language.

One `curl` install. One `discover` command. Done.

github.com/QVerisAI/QVerisAI

**2/7**The workflow is dead simple:

```plaintext

qveris discover "stock quotes"  → semantic search

qveris inspect 1                → check params

qveris call 1 --params '{}'     → get data

```

From "I need an API" to live data in <30 seconds.

[Attach: terminal screenshot showing discover → inspect → call flow]

**3/7**Search is always free. Every result shows latency + success rate so you pick the best tool instantly.

New users get 1,000 free credits. No credit card.

**4/7**Building AI agents? CLI is the most token-efficient way to give them API access.

MCP Server → injects full schemas into context (thousands of tokens)CLI → one shell command + JSON output (~50-100 tokens)

80%+ token savings at 10+ tools.

**5/7**`qveris interactive` — a REPL to explore APIs like a conversation.

`codegen curl|python|js` — generate production-ready code.

`--dry-run` — validate params without spending credits.

[Attach: terminal GIF of interactive REPL session]

**6/7**Works everywhere:

- Claude Code
- OpenCode
- Cursor
- Custom agent scripts
- CI/CD pipelines

Anything that runs shell commands can use QVeris CLI.

**7/7**Get started in 10 seconds:

```plaintext

curl -fsSL https://qveris.ai/cli/install | bash

```

⭐ Star us: github.com/QVerisAI/QVerisAI🌐 Website: qveris.ai📖 Docs: qveris.ai/docs/cli
