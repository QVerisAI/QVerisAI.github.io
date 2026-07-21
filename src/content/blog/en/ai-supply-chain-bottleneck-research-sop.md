---
title: 'How I Used Codex + QVeris to Build an AI Supply Chain Bottleneck Research SOP'
description: 'A hands-on review: from installing a Skill and configuring an API key to generating an investment research memo.'
pubDate: 'Jul 01 2026'
category: 'Product'
author: 'QVeris Team'
tags: ['QVeris', 'Agent']
translationKey: 'ai-supply-chain-bottleneck-research-sop'
---
# How I Used Codex + QVeris to Build an AI Supply Chain Bottleneck Research SOP

Subtitle: A hands-on review, from installing a Skill and configuring an API key to generating an investment research memo

Recently, I have been thinking about a question: How can ordinary individual investors conduct more systematic research on the industry chain?

Many times, when we see an investment theme, such as AI, semiconductors, medicine, and robots, our first reaction may be to search for news, read research reports, look through announcements, or look for company lists. But when you actually do it, you will find several problems:

**First, the information is too scattered.**

A company has announcements, financial reports, interactive Q&A, news reports, and industry articles, all scattered here and there, making it difficult to quickly put together an industrial chain map.

**Second, there are too many concepts.**

For example, in the AI supply chain, there are computing chips, servers, optical modules, PCBs, liquid cooling, power supplies, advanced packaging, semiconductor equipment, and data center operators. Some people say that every link is important, but it is not easy to judge where the real "bottleneck" is.

**Third, the research process is unstable.**

Today we’re looking at optical modules, tomorrow we’re looking at chips, and the day after tomorrow we’re looking at liquid cooling. The more information you read, the more information you read, but the research framework is not settled, and it can easily become "chasing hot spots" in the end.

So I recently tried to use **Codex + QVeris** to run a set of supply chain bottleneck research processes. My identity is not a professional institutional researcher, but an industry research enthusiast and individual investor. My goal is not to let AI tell me "what to buy", but to let AI help me standardize the research process: first dismantle the industry chain, then find bottlenecks, then use data and announcements to verify, and finally compile it into an investment research memorandum.

---

## 1. What does this QVeris Skill do?

This time I used a Codex Skill called:

```Plain Text
qveris-supply-chain-research
```

To put it simply, it is not an ordinary chat prompt, but a set of investment research workflow specially designed for **supply chain bottleneck research**.

Its core function is to help users start from an industry theme and the system completes the following things:

```Plain Text
1. Break the theme into supply chain layers
2. Identify bottlenecks that are hard to expand, hard to replace, and hard to verify
3. Build a candidate pool of listed companies
4. Use QVeris data capabilities to check company profiles, financial statements, announcements, news, market data, and other evidence
5. Prioritize research targets
6. Spell out the evidence, risks, and disconfirming conditions behind each judgment
7. Compile the final output into an investment research memo
```

If you sum it up in one sentence:

**The purpose of this Skill is not to directly tell you which stock to buy, but to help you break down an investment theme into a complete research process of "industrial chain level → core bottlenecks → candidate companies → data evidence → risk counter-evidence". **

For example, when studying the AI supply chain, it will not give you a "list of AI concept stocks" right away, but first ask:

```Plain Text
Where are the bottlenecks in AI infrastructure?
Are they in chips, optical modules, high-speed PCB, liquid cooling, or semiconductor equipment?
Why are these layers difficult?
Which listed companies are truly exposed to these bottlenecks?
Can financials, announcements, and company profiles verify the thesis?
What would invalidate this judgment?
```

That's what I find valuable about it.

Ordinary AI is more like a question and answer assistant. What you ask, it answers.

This QVeris Skill is more like a set of investment research SOPs. It requires AI to complete research according to fixed steps. It not only gives conclusions, but also explains what data was used, which QVeris capabilities were called, how many credits were consumed, and which evidence is not enough.

The QVeris workflow behind it is mainly divided into three steps:

<sheet sheet-id="cu1BAG" token="VNhtsXOlIh2x8Lt03FhcwkD4nQe"></sheet>

This process is particularly helpful for individual investors.

Because we usually study an industry, it is easy to fall into the state of "reading a lot of information, but not knowing how to organize it." This Skill can fix the research process and allow each topic research to be carried out according to the same framework.

Taking the AI supply chain as an example, it can help me break down the vague judgment of “AI is very popular” into:

```Plain Text
AI compute chips
Optical modules / CPO
High-speed PCB
Liquid cooling / power supply
Semiconductor equipment
Data center infrastructure
```

Then continue to ask:

```Plain Text
Which layer is hardest to expand?
Which layer has the greatest downstream impact?
Which companies are closest to this bottleneck?
Does the evidence come from financial reports and announcements, or only from market narratives?
If demand misses expectations, which judgments are most likely to be overturned?
```

Therefore, my purpose of using Codex + QVeris this time is not to find a "magic answer", but to verify one thing:

**Can individual investors use AI to make industry chain research more like a repeatable, traceable, and reviewable investment research process? **

This article is a complete practical review.

---

## 2. How did I install this Skill?

I'm using Codex. The way to install the skill is very simple, just enter it directly in the Codex:

```Plain Text
Please help me install this Codex Skill:
https://github.com/QVerisAI/open-qveris-skills/tree/main/qveris-supply-chain-research
```

After the installation is complete, the skills will be placed in the skills folder of the local Codex. A similar path is:

```Plain Text
C:\Users\your-username\.codex\skills\qveris-supply-chain-research
```

After the installation is complete, it does not mean that QVeris data can be called immediately.

Because QVeris is an external data capability, an API Key needs to be configured.

---

## 3. Configure QVeris API Key

This step may be a bit unfamiliar to people who are not familiar with the command line, but it is not complicated.

Open PowerShell in Windows and enter:

```Plain Text
[Environment]::SetEnvironmentVariable("QVERIS_API_KEY", "your QVeris API Key", "User")
```

Two credits should be noted here:

First, don’t send your real API Key to others, and don’t take screenshots to leak it.

Second, after the configuration is complete, it is best to close PowerShell and Codex and reopen them. Because environment variables usually require a new window to take effect.

To check whether the configuration is successful, you can enter in PowerShell:

```Plain Text
if ($env:QVERIS_API_KEY) { "SET" } else { "NOT_SET" }
```

If it returns:

```Plain Text
SET
```

The configuration is successful.

If it returns:

```Plain Text
NOT_SET
```

Usually it is because the current window has not read the new configuration. Close PowerShell and Codex, reopen them and try again.

After this step is completed, Codex can call related data capabilities through QVeris.

---

## 4. How do I ask questions to Codex?

After the configuration is complete, the real key is prompt.

I don't recommend just asking:

```Plain Text
Help me analyze the AI supply chain.
```

This kind of question is too broad, and it is easy for AI to give a general summary of the industry.

I prefer to use the following structured questions:

```Plain Text
Use QVeris to deeply research bottlenecks in the AI infrastructure supply chain.
First break down the supply chain layers, then discover and inspect market data, announcements, news, and company-data capabilities.
Call the necessary data sources, identify 5 listed companies to prioritize for research,
explain which QVeris capabilities were used, estimate paid Call counts and credits,
and state what conditions would weaken each judgment.
```

There are several key credits in this prompt.

First, clarify the theme: bottlenecks in the AI infrastructure industry chain.

Second, it is required to first split the industrial chain levels instead of directly giving stocks.

Third, it requires using the data capabilities of QVeris.

Fourth, it is required to list credits, which is the cost of calling.

Fifth, it is required to write counter-evidence conditions, that is, "under what circumstances will this judgment be wrong?"

This last point is very important.

Investment research is not about finding reasons to prove that you are right, but about knowing in advance where you may be wrong.

---

## 5. QVeris workflow: Discover, Inspect, Call

The core of this skill is the QVeris three-step workflow:

<sheet sheet-id="W8DSOZ" token="VNhtsXOlIh2x8Lt03FhcwkD4nQe"></sheet>

Simply put:

**Discover means finding tools first.**
For example, if I want to do research on the A-share AI industry chain, I need to know whether there are market tools, announcement tools, financial statement tools, company information tools, and news tools.

**Inspect means inspecting the tool.**
For example, what parameters should be passed to this tool? What's the success rate? How much does a call cost? What format is returned?

**Call means calling real data.**
This step consumes credits, so it cannot be used indiscriminately.

What I like better about this process is that it does not directly grab information like ordinary search. Instead, it first figures out "what data source I want to use, what it can check, and how much it will cost" before calling it.

This is important for individual investors because we not only have to control the quality of research, but also the cost of data.

---

## 6. How to Break Down Bottlenecks in the AI Supply Chain

Taking AI infrastructure as an example, I asked Codex to dismantle it according to the bottlenecks of the industry chain, rather than according to market concepts.

The final level I got was roughly:

<sheet sheet-id="CUchOi" token="VNhtsXOlIh2x8Lt03FhcwkD4nQe"></sheet>

The most inspiring thing here is:

The AI supply chain is not just about chips.

When many investors mention AI, they first think of GPUs. But the real large-scale AI infrastructure is a systematic project.

The chip is only one of the core links. After the chip, there are a series of constraints such as interconnection, server, PCB, power supply, cooling, data center, manufacturing equipment, etc.

If you only look at the hottest concepts, it is easy to overlook the links that are really difficult to expand production.

The purpose of the bottleneck research is to find those positions that "must be used by the industry, where it is not easy to expand production, and where substitution is not easy."

---

## 7. Case: 5 priority research directions in the AI supply chain

I only use stocks as examples here and do not constitute any recommendations.

In AI infrastructure research, I pay more attention to five types of companies:

**Category 1: optical module / optical interconnect companies.**
The logic is that as the AI cluster scales up, a large amount of data needs to be transferred between servers. Bandwidth, latency, and power consumption will all become issues. Optical modules and future CPO architectures sit directly on the data transmission bottleneck.

**Category 2: AI chip companies.**
This type of company sits at the core of compute, but also faces challenges in R&D, ecosystem development, customer validation, and commercialization.

**Category 3: high-speed PCB companies.**
AI servers and switches require high-frequency and high-speed boards, with high material and manufacturing yield requirements. It is not as conspicuous as a chip, but it is critical in the industrial chain.

**Category 4: power supply and liquid cooling companies.**
As the power density of AI data centers increases, power supply and cooling will become increasingly important. In the past they may have been supporting links, but now they are gradually becoming infrastructure constraints.

**Category 5: semiconductor equipment companies.**
If domestic AI chips want to continue to develop, they cannot do without upstream manufacturing capabilities, and manufacturing capabilities cannot do without equipment, technology and yield.

From this perspective, AI industry chain research is not about finding a “list of AI concept stocks”, but drawing a constraint map.

---

## 8. Final output: investment research memo, not chat history

I recommend that every time after running the QVeris workflow, the Codex output should be in the "investment research memo" format.

You can request this:

```Plain Text
Organize the results as an investment research memo.
It must include:
research scope, key findings, evidence table, risks and counter-evidence, and QVeris calls and credits.
Also explain how QVeris Discover, Inspect, and Call were used,
where the evidence gaps remain, and include a non-investment-advice statement.
```

The advantage of this is that the research results will be more stable.

A qualified investment research memorandum must include at least:

<sheet sheet-id="WAcdrU" token="VNhtsXOlIh2x8Lt03FhcwkD4nQe"></sheet>

I think this step is very important.

Without a fixed format, AI output can easily turn into a text that “looks good” but lacks evidence and counter-evidence.

What investment research really needs is: conclusions, evidence, risks, and matters to be verified.

---

## 9. Who is this method suitable for?

I think this method is suitable for three types of people.

**The first group is individual investors.**
It is not used to directly find buying credits, but to build industry understanding. Especially when faced with complex industrial chain topics such as AI, semiconductors, medicine, and robotics, it can help us quickly build a framework.

**The second group is industry research enthusiasts.**
If you usually like to study industry trends, but suffer from too scattered data, Codex + QVeris can help you organize the data into a unified structure.

**The third group is people doing investment research support.**
It can help you complete candidate company screening, data verification, announcement summaries and risk lists faster.

But it's not suitable for one scenario:

If you want AI to directly tell you "which stock to buy tomorrow", then this method is not suitable.

Because its value is not to predict short-term rises and falls, but to improve industrial research efficiency.

---

## 10. My biggest experience this time

After running this time, my biggest experience is:

**AI should not replace judgment; it should make the judgment process clearer.**

In the past, when I researched an industry, I might first search a lot of articles, then see a bunch of companies, and end up with a mess in my mind.

Now I will first let AI dismantle the industry chain according to the bottlenecks, then use QVeris to collect company information, financial statements, announcement data, and then let it output an investment research memorandum.

This has at least three advantages:

**First, the research sequence is more stable.**
It is no longer a matter of chasing whatever hot spots you see, but starting from the constraints of the industrial chain.

**Second, the evidence is clearer.**
It needs to be clarified why a company enters the candidate pool, whether it is because it is at a key bottleneck, or whether it is just conceptually related.

**Third, risks appear earlier.**
For each judgment, write "what circumstances will weaken it". This can prevent you from only looking at the positives.

For individual investors, this may be more important than simply reading a few more research reports.

Because what can really improve research capabilities in the long term is not a single conclusion, but a set of repeatable research processes.

---

## 11. The SOP I settled down

Finally, organize this process into a simple SOP:

```Plain Text
1. Define the theme
   For example: AI infrastructure, semiconductors, healthcare, robotics.

2. Break down the supply chain first
   Do not ask for stocks directly; first ask how many layers the supply chain has.

3. Identify bottlenecks
   Look for links that are hard to expand, hard to replace, hard to verify, heavily regulated, or dependent on strict customer certification.

4. Build a candidate pool
   Start with roughly 20 companies, then narrow the pool to 3-7.

5. Use QVeris Discover
   Find capabilities for market data, announcements, news, company profiles, and financial statements.

6. Use QVeris Inspect
   Review tool parameters, success rates, and billing rules.

7. Use QVeris Call
   Call the necessary data sources, focusing on company profiles, financials, and announcements.

8. Output an investment research memo
   Include research scope, key findings, evidence table, risks and counter-evidence, and credits.

9. Run counter-evidence checks
   For every company, ask: what would prove my judgment wrong?

10. Make clear that this is not investment advice
   All conclusions are research assistance only, not buy or sell recommendations.
```

The prompt I use more often now is:

```Plain Text
Use QVeris to deeply research bottlenecks in the [theme] supply chain.
First break down the supply chain layers, then discover and inspect market data, announcements, news, and company-data capabilities.
Call the necessary data sources, identify 5 listed companies to prioritize for research,
explain which QVeris capabilities were used, estimate paid Call counts and credits,
and state what conditions would weaken each judgment.
Finally, organize the output as an investment research memo.
```

---

## Conclusion

To me, the significance of the combination of Codex + QVeris is not to turn AI into a "stock recommendation machine", but to allow individual investors to do research in a way that is closer to professional investment research.

What it helps me accomplish is not a final judgment, but a clear breakdown of the research question:

```Plain Text
How many layers does the supply chain have?
Where are the real bottlenecks?
Which companies are closest to those bottlenecks?
What financial and announcement evidence is available?
What evidence gaps remain?
What would invalidate the judgment?
```

This is where I think AI is most valuable in investment research.

Finally, let me explain again: This article is just a sharing of personal tool experience and research methods. The companies mentioned in the article are only used as industry chain research cases and do not constitute any investment advice, buying advice or selling advice. Investment involves risks, and specific decisions need to be combined with personal risk tolerance and independent judgment.
