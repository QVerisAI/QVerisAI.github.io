---
title: 'Stop Letting AI Make Up Financial Analysis: I Built a Small Assistant That Finds Data Sources First'
description: 'Stop Letting AI Make Up Financial Analysis: I Built a Small Assistant That Finds Data Sources First'
pubDate: 'Jun 08 2026'
heroImage: '../../../assets/blog-qveris-wechat-2247485112-hero.jpg'
category: 'Product'
author: 'QVeris Team'
tags: ['QVeris', 'Agent']
translationKey: 'qveris-wechat-2247485112'
---
QVeris · Product Story 

#   

# First, to be clear: this is not investment advice, and it is not an "AI automated stock trading profit tutorial." 

What I wanted to build this time was very simple: describe a financial data need in Chinese, have AI first help me find the right data tools, then inspect the parameters, estimate the cost, and only execute at the end. 

It does not decide whether to buy or sell for me. It is more like a "translator for financial data APIs." 

In the past, whenever I looked at API documentation, I often got stuck on a few questions: Can this endpoint actually retrieve the data I need? How should I fill in the parameters? Do the fields mean what I think they mean? If the call fails, will it still cost credits? 

So I wanted to use Codex + QVeris to build a small assistant that asks these questions first. 
##  

##  

##  

##  

##  

## I Gave It Three Tasks



The first task: help me find the right API. 

For example, if I ask: 

>
> I want to check real-time quotes, fund flows, and announcements for an A-share stock. What tools can I use?
>
It should not start analyzing right away. It should first search QVeris for candidate tools and tell me what each tool is suitable for, which data source it comes from, and what parameters it needs. 

The second task: help me inspect the parameters. 

The hard part of financial APIs is not just "is there an endpoint?" It is "how do I fill it in?" 

For the same stock code, some APIs require symbol, some require code, and some require an exchange suffix. It should first tell me which fields are required, which can use defaults, and what is still missing from my question. 

The third task: help me keep records and leave an audit trail. 

I want to know which tool it used, which provider it came from, whether it succeeded, how many credits it spent, and whether the returned result is actually usable. 

With financial data, you cannot look only at the answer. You also need to know where the answer came from. 
##  

##  

##  

##  

##  

## Why Not Just Ask a Large Model Directly?

At first, I would also ask: 

>
> Help me analyze why Moutai moved unusually today. 
>
A large model can write a fluent answer, but the problem is: where did the data come from? Is it up to date? Did it query a real interface? 

So later I changed the prompt to: 

>
> First help me find tools that can query A-share fund flows and announcements. Do not analyze directly. After finding them, show the tool ID, data source, parameters, cost, and limitations, and wait for my confirmation before calling anything. 
>
This immediately pulled AI out of "essay-writing mode" and back into "work mode." 

This is also where QVeris is valuable: it does not ask the model to answer from memory. It lets the Agent Discover first, then Inspect, and finally Call. 
##  

##  

##  

##  

##  

## What I Asked Codex to Build Was Not a Stock Trading Bot

The goal I gave Codex was: 

>
> Build a small Chinese financial data API assistant. After the user enters a Chinese requirement, it first searches QVeris capabilities, displays candidate tools, then checks parameters, and only executes at the end. Record the source, parameters, cost, and execution result throughout the process. 
>
I broke it into four buttons: 

**Find tools**: enter a Chinese requirement and return candidate tools. 

**Inspect tool**: view the tool description, parameter schema, examples, and cost. 

**Call tool**: call the tool after parameters are filled in. 

**View ledger**: view the call result, latency, cost, and whether valid data was obtained. 

It feels like a colleague who understands APIs. 

I do not have to read every data provider's documentation first. I only need to state clearly what I want to query.
##  

##  

##  

##  

##  

## The Biggest Trap: More Tools Are Not Always Better

At first, I thought the more tools there were, the more powerful the system would be. 

Later I found that the more tools there are, the easier it is for the Agent to choose the wrong one. 

For example, if I ask: 

>
> Check BYD's recent capital changes. 
>
This could mean real-time quotes, main fund flows, northbound capital, margin financing and securities lending balances, changes in turnover, or it could mean capital-related developments in announcements or news. 

If the Agent simply searches by the keyword "capital" or "funds," it can easily find interfaces with similar names that are not actually suitable. 

So the assistant cannot just return the "most similar" tools. It has to explain why it recommends them: 

- This tool checks fund flows.

- That tool checks margin financing and securities lending.

- Another one is news search, not structured market data.

If you need intraday data, prioritize real-time quotes. If you are doing an end-of-day review, daily fund flow data may be a better fit. 

This is where QVeris becomes genuinely useful: it is not about piling APIs together, but about letting the Agent discover capabilities, inspect capabilities, and then call capabilities. 
##  

##  

##  

##  

##  

## Chinese Is Not Just English Translated Word by Word



Translation is especially risky in financial APIs. 

Tool descriptions, parameter descriptions, and field explanations can be localized into Chinese, but these things must not be changed carelessly: 

- parameter names

- enum value

- API path

- HTTP method

- provider id

- tool id

- stock codes

- field key

So I added one principle to the assistant: 

>
> User-facing explanations can be localized into Chinese, but machine-facing parameters must remain unchanged. 
>
This sounds like an engineering detail, but it matters a lot for beginner users. 

Because the user sees Chinese, while the actual execution uses structured parameters. If something gets mistranslated in the middle, the wrong API will be called. 
##  

##  

##  

##  

##  

## Before Batch Calls, Always Check Cost First

Querying one stock is not a big deal. 

But if I say: 

>
> Scan the entire market for me and find the stocks with abnormal fund flows today. 
>
That can turn into a large number of tool calls. 

So I added a rule: 

>
> Before executing a batch task, first estimate the number of calls, cost per call, total cost, and failure retry strategy. Without a budget explanation, do not run it directly. 
>
This prevents it from turning from an "enthusiastic assistant" into a "credit consumption machine."
##  

##  

##  

##  

##  

## What Does It Feel Like to Use?

I ask: 

>
> I want to check whether Kweichow Moutai has unusual fund flows today. Do not analyze yet. First find tools. 
>
It replies: 

>
> Found 3 categories of candidate tools: 
>
> 1. Real-time quote tools: check latest price, percentage change, and turnover. 
>
> 2. Fund flow tools: check main net inflow, super-large orders, and large orders. 
>
> 3. Announcement/news tools: explain possible reasons behind the move. 
>
> Recommended sequence: call real-time quotes and fund flows first, then supplement with announcements/news. Estimated 2 to 3 calls. Please confirm whether to execute. 
>
Then I say: 

>
> Execute, but do not give buy or sell advice. 
>
Only then does it start calling tools, and it outputs the data source, tool id, input parameters, returned fields, and risk notes. 

That is far more useful than simply throwing out a line like "worth watching." 

Because it is not making the judgment for me. It is laying out the data path. 
##  

##  

##  

##  

##  

## Who It Is For, and Who It Is Not For

##  

**Good fit for:**

- People who often query financial data but do not want to read API documentation.

- People who want to build financial Agents with Codex / OpenClaw / MCP.

- People who do not want AI to fabricate financial data.

**Not a good fit for:**

- People who want "a stock code that is guaranteed to rise tomorrow."

- People who want a Bot to place orders automatically.

- People who do not check sources, costs, or risk notes.
##  

##  

##  

##  

##  

## Final Thoughts

I used to think the hard part of financial AI applications was "whether the model is smart enough." 

Now I think the real difficulty is: 

- Can it know which tool to use?

- Can it understand the tool parameters?

- Can it turn a Chinese question into the correct call?

- Can it leave an evidence trail after the call?

- Can it stop and ask me before costs get out of control?

Codex is responsible for turning the idea into a prototype. 

QVeris is responsible for connecting real financial data capabilities and letting the Agent discover first, inspect next, and call last. 

The most interesting part of this combination is not that it turns me into an investment expert, but that it lets me state my needs clearly in Chinese, and then lets the Agent find data through a traceable process. 

Financial judgment should still be made by people. 

AI is responsible for finding the right tools, querying the data clearly, and preserving the process.
