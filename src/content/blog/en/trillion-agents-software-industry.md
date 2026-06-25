---
title: 'Trillion-Scale AI Agents Are Coming: The Software Industry Is About to Change Completely'
description: 'Trillion-scale AI agents are coming. The software industry is about to be fundamentally reshaped, and this article examines the underlying logic behind that transformation.'
pubDate: 'Mar 13 2026'
heroImage: '../../../assets/blog-trillion-agents-software-industry-1.jpg'
category: 'Research'
author: 'QVeris Team'
tags: ['智能体', '软件行业', '趋势']
translationKey: 'trillion-agents-software-industry'
---

Recently, Aaron Levie published a long, in-depth post on X about the future software world shaped by AI agents.

Aaron Levie is the founder and CEO of Box. He has long been active in Silicon Valley’s technology and startup circles, and has followed the development of AI and the software industry for many years.

In the article, he makes an important argument:

The software users of the future may no longer be humans, but AI agents.

To make the piece more accessible to Chinese readers, we have translated and organized the full article here for sharing.

![trillion-agents-software-industry-1](../../../assets/blog-trillion-agents-software-industry-1.jpg)

## Building Software for the Era of Trillion-Scale Agents

Over the past few months, the agent space has undergone a major shift. Around the end of last year, coding agents became capable of independently completing **longer-horizon tasks** with far less human intervention during development.

These agents are no longer chatbots that merely call basic tools. They typically have their own sandboxed computing environments, can write and run code to address whatever problem they encounter, interact directly with APIs and command lines, and maintain dedicated file systems, long-term memory, and more. This set of foundational capabilities, the rapid improvement of best practices for agent orchestration, and the fast progress of large models in tool use and software development have brought us to the early form of agents that can **handle arbitrary tasks**.

Although this architecture was first defined by various coding agents such as Claude Code, Devin, Codex, Factory, Cursor, and Replit, we have recently crossed the chasm and extended agents across the full domain of **personal experiences and knowledge work**. Examples include Claude Cowork, Perplexity Computer, Manus, and of course OpenClaw, which pushes the vision even further by creating agents that can run **24/7** in persistent environments.

As their capabilities accelerate, agents will permeate almost every work scenario: reviewing every contract, handling the vast majority of frontline customer-support tickets, auditing corporate finances, organizing the full body of medical research to support drug discovery, writing most code, producing most sales and consulting presentations, completing transactions across the internet on users’ behalf, and more. In short, they will participate in nearly every economically valuable form of work in society.

And this is not merely about **replacing tasks humans already perform**. We will use agents to do far more work than before: running simulations that used to be prohibitively expensive, producing multiple prototype options for every idea, advancing large numbers of projects because the startup cost is extremely low and termination is easy, and reviewing all information instead of sampling data.

Taken together, it is foreseeable that almost every employee in a company will have **multiple agents working for them**. It is not hard to imagine a future in which a company has **100 times or 1,000 times** more agents than employees. When trillions of agents are running at the same time, **agents will become the primary users of all future software**.

Yet most software today is designed for humans. That means **the future of software is headed for a fundamental shift**. So what comes next?

## Building Products Agents Want

Paul Graham once summarized software development in the simplest possible terms: **make something people want**.

That advice gave rise to some of the most successful software of the 21st century and shaped a generation of tools: simple to use, easy to adopt, free of jargon, clear in the problems they solve, straightforward in pricing, and so on.

Now the direction is becoming: **make software that agents want**. Today, the primary users of agents are still developers and technical power users, who have their own tool preferences. But in an era where agents handle everything on behalf of knowledge workers, these personal preferences will gradually matter less. Unless an enterprise already has established standards, **agents will drive tool selection across workflows**.

That includes the tools they sign up for, the code they write, the libraries they use, the capabilities they call, and more. Platforms that are more agent-friendly and solve agents’ and users’ problems best will far outperform competitors. Agents will not watch your webinars or ads. They will simply **choose the best tool for the task**. And you will want that tool to be yours.

The core implication of this advice is that **everything you build must be API-first**. If a feature does not have an API, it effectively does not exist. If you cannot expose interfaces through the command line or the Model Context Protocol (MCP), you are at a disadvantage. If your API design is confusing or your routes conflict, you are essentially giving up the chance to be used by agents. At Box, we are committed to building a file system for agents. We are now reviewing every API to identify where it will break down in the agent era, bringing the same level of care once reserved for user-experience design into interface usability.

Just as designing software for humans requires empathy, so does designing for agents. YC’s Jared Friedman once reminded everyone: “Even the best developer tools often do not support automated account registration through an API. In the era of agents like Claude Code, this is a huge oversight, because Claude cannot sign up on its own. Putting all account-management functionality into the API is now table stakes.” If agents cannot easily register for and use your service, then for agents your product is basically “nonfunctional.”

Agents becoming the primary users of software will also bring major business-model changes. In some scenarios, having a user account launch an agent can still fit the traditional per-seat pricing model. But many agent scenarios are not tied to existing users, and the scale of work is entirely different. For example, with just a few sentences or lines of text, an agent may complete within software what would have taken a human several hours, then present only the final result to the end user.

This will ultimately push some software business models to evolve. Any tool that wants to survive in the agent era must build in **usage-based or consumption-based pricing**, and may even need to support autonomous payments by agents.

## Next-Generation Infrastructure and Tools for Agents

Perplexity’s Aravind Srinivas has said: “Giving computers to humans was a good idea. Giving computers to computers so they can do work for us on computers is an even better idea.”

When agents have their own “computers,” can write and execute code, invoke common skills, and connect to external tools and services, an entirely new **technology stack designed specifically for agents** begins to emerge. Imagine everything humans do on computers. Agents will need a version of those capabilities designed specifically for them.

Some core services will naturally be provided by existing vendors, because agents need to call on existing data, and because collaboration and connection between human users and agents inside systems are valuable. But entirely **new categories** will also emerge, because the problem scenarios are fundamentally different from what humans have historically needed, and services will need to be designed from scratch.

For example, agents will clearly need dedicated infrastructure at an unprecedented scale. The next supercomputing cloud provider, whether a new entrant or an existing giant, will be built on this idea: **future server clusters will no longer serve human applications, but agents**. E2B, Daytona, Modal, and Cloudflare are all moving in this direction. The compute scale of these sandbox environments will exceed anything we have seen before.

Agents will also need access to core enterprise files and the ability to manage their own memory and long-running task data. This is exactly the direction Box is building toward. Likewise, major enterprise systems must become fully API-enabled so agents can operate critical enterprise services and data, such as HR systems, CRM systems, workflows, data lakes, and more. Products that provide the most seamless data operations for agents will win the workloads of the future.

Agents will likely also need **digital identities** and communication capabilities. Agentmail, for example, is providing dedicated persistent email addresses for agents. Parallel, Exa, and others are rebuilding search engines for an era of agent-led information retrieval on the web. Many agents will need to manage budgets through wallets such as Stripe and Coinbase. We may finally see real-world use cases for micropayments, with agents autonomously invoking paid tools and information.

Security, compliance, and governance will become central challenges in the agent era. When agents access sensitive information and execute regulated workflows, such as in medicine or finance, enterprises must control and retain records of every agent action. Long-running agents need independent identities for service authentication, with strict controls over their permissions and data access. We need an entirely new set of software and platforms to address these challenges, just as we once built them for humans and applications.

In short, we are clearly entering a new era of software: **tools must be designed and built specifically for large-scale agent use**. In a world where trillions of agents work together, the way humans and machines collaborate will be completely reshaped.
