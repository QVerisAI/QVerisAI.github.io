---
title: 'From 0 to 1: Building a Financial Research Agent and the Pitfalls I Hit'
description: A practical walkthrough of building a financial research agent from scratch,
  including data access, tool selection, and workflow pitfalls.
pubDate: May 22 2026
heroImage: ../../../assets/blog-0-1-agent-cover-en.png
category: Product
author: QVeris Team
tags:
- QVeris
- Agent
translationKey: 0-1-agent
---
QVeris · Product Practice

 

**Last week I was leading a POC for an enterprise customer. Their requirement was very clear**:

"Can I ask in natural language for an analysis comparing Apple's and Google's R&D spending, and have the AI automatically pull and run the data?"

The request sounds straightforward, but in practice it cuts across several technical layers. This POC gave us a good chance to review the issues we ran into and turn them into notes for product and business teams building Agents.

##  

### Pitfall 1: No Matter How Good the Prompt Is, It Cannot Save Broken Data Access

At first, we focused on prompt optimization: how to write instructions that make AI output more stable and better formatted.

But once we connected real data, the problems all surfaced:

FMP's "income statement" API returned field names that did not match the documentation.

Some annualized financial statement data was calculated by fiscal year, while some used calendar year, so it needed additional processing. One field was unavailable in the free tier, but the AI did not know that and kept trying to call it.

**Lesson 1: An Agent's ceiling is not determined by the prompt. It is determined by the data layer.**

Spending three hours tuning a prompt is less useful than spending ten minutes validating the data interface.

  

### Pitfall 2: The Data AI "Thinks" It Knows Is Often Data It Does Not Actually Know

We were using Claude together with QVeris. Claude has strong reasoning ability and can produce analysis that looks professional based on public knowledge, but that is not real data. It is inference from training data.

The customer asked: "What was META's capital expenditure last quarter?"

Claude confidently returned a number. In the backend, we pulled the real data through QVeris, and the result differed by two percentage points.

The customer said: "If your number is fabricated, how can I trust it in a research report?"

**Lesson 2: AI + real data = AI's value. AI - real data = AI's risk.**

Both parts must be true. Missing either one is not acceptable.

###  

### Pitfall 3: Integration Is Not the Finish Line. It Is the Starting Line

Getting the data connected does not mean the Agent can run reliably.

After the first version went live, we ran into real operational issues:

1.  One day, FMP response time went from 200ms to 3s, and the Agent timed out

2.  One day, a field suddenly became null, and the AI treated it as 0

3.  One day, the free quota was exhausted, and the Agent failed directly with no alert at all

  

QVeris's three-layer discover/inspect/call structure solved some of these problems:

At the inspect stage, QVeris tells the Agent the interface's stability rating, whether it has a rate limit, and whether it is currently callable.

At the call stage, QVeris handles retry logic, timeouts, and circuit breaking.

  

**Lesson 3: Integration is only 20%. The remaining 80% is operations and stability.**

Agent developers do not need to understand every detail of financial APIs, but they do need an infrastructure layer that can absorb the complexity for them.

###  

### Pitfall 4: Compliance Is Not Something You Remember Later. It Has to Be Designed In

The customer provides B2B financial services, and their content is aimed at institutional investors.

In our initial design, the Agent's output went directly to users, including the AI's analytical conclusions and signal judgments.

The customer's legal team said no. If the AI's conclusions were understood as "investment advice," they would not be compliant under the customer's regulatory framework.

In the end, we adjusted the positioning: the Agent provides "data analysis assistance," not "investment advice." The difference of one phrase determined whether the product could go live compliantly.

**Lesson 4: For financial AI products, compliance is a functional requirement, not a bonus.**

You need to define from the very beginning what this Agent is telling users, and what it is not.

  

This POC gave me a clearer understanding of QVeris's real role in Agent development:

It is not that QVeris replaces anyone's work. Rather, **  
**

**QVeris automatically handles the things developers should not have to spend time on**: finding data, validating data, connecting data, and managing stability.

Developers should spend their time on "what problem should this Agent solve," not on "how do I integrate this API."
