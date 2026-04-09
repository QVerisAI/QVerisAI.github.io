---
title: 'Why We Didn''t Build Another LangChain'
description: 'Our underlying judgment about how agents should run autonomously — and why we deliberately did not build another LangChain.'
pubDate: 'Mar 25 2026'
heroImage: '../../../assets/blog-why-not-another-langchain-hero.png'
category: 'Research'
author: 'QVeris Team'
tags: ['langchain', 'agents', 'architecture']
translationKey: 'why-not-another-langchain'
---

**Author:** Linfang Wang, Founder & CEO at QVeris AI

**Date:** February 27, 2026

**Keywords:** LangChain, QVeris, Agent Infra, Autonomous Agents, Dynamic Workflows, Tool Discovery

## Before We Begin

Let me be clear: **LangChain is an excellent project.**

As fellow builders in the AI Agent space, we deeply respect what the LangChain team has accomplished. Their open-source framework helped countless developers enter the world of Agent development, and their $1.25B valuation is a well-deserved validation of the Agent infrastructure opportunity.

But we keep getting asked: **"How are you different from LangChain? Why not just build a LangChain plugin?"**

This post isn't a feature comparison. It's about something deeper — **a fundamental disagreement about how agents will actually work in the real world.**

## I. Three Core Beliefs About the Future of Agents

Before founding QVeris, our hands-on experience building both consumer-facing AI assistants and enterprise agent systems gave us some hard-won convictions. Here are three beliefs that shaped everything we've built:

Belief 1: Workflows Won't Be Hardcoded — They'll Be Dynamic Loops

**LangChain's assumption:** Agent workflows can be predefined and hardcoded. Developers wire up steps A→B→C using Chains, and the agent executes accordingly.

**Our belief:**Useful agent workflows**can never be fully determined before runtime.**

Real-world agent execution looks more like this:

Need → Plan → Execute → Feedback → Replan → Execute → Feedback →

Discover new need → Search for new capability → Evaluate → Select →

Call → Verify → Keep iterating → ... → Goal achieved

This is a **dynamic loop**, not a predefined chain.

**A concrete example:**

- You say: "Help me prepare for tomorrow's investor meeting."
- The agent starts executing and discovers: needs company financials → finds incomplete data → needs competitor updates → discovers a competitor just shipped a new product → needs to adjust the pitch → needs to generate new comparison charts → can't find a suitable visualization tool → needs to search for one → ...

Every step of execution can spawn new requirements. Every new requirement might demand new capabilities. **A predefined Chain simply can't handle this level of complexity.**

Belief 2: No Single Model Can Do 100% of the Work

**The current illusion:** Many believe that GPT-5 or Claude Opus is powerful enough to handle everything on its own.

**Our belief:****No model, however powerful, can complete complex work independently.**

Why?

- **Data boundaries:** Models don't have real-time data — no live stock prices, weather, or breaking news
- **Capability boundaries:** Models can't send emails, query databases, or call APIs
- **Permission boundaries:** Models can't access your internal systems, customer data, or private knowledge bases
- **Physical boundaries:** Models can't control hardware, robots, or IoT devices

**Getting real work done requires calling external data, tools, and capabilities.**

This isn't a flaw in the models. It's an **architectural inevitability**. LLMs handle the "thinking." External tools handle the "doing." The two must work together.

Belief 3: Dynamic Capability Discovery Is Core Infrastructure

**If workflows are dynamic, and external capabilities are essential, what's the real problem to solve?**

We believe the core process for how agents will use external capabilities looks like this:

Dynamic need identification → Capability search → Evaluation →

Selection → Invocation → Verification → Payment

**This isn't just "calling an API." It's a complete decision chain:**

1. **Dynamic need identification:** Based on current context, determine what capability is needed — in real time
1. **Capability search:** Discover matching tools from a massive pool (not hardcoded — live search)
1. **Evaluation:** Multiple options available. Which is most reliable? Fastest? Cheapest?
1. **Selection:** Based on evaluation, dynamically pick the best tool
1. **Invocation:** Execute the call, handle parameter mapping, error retries
1. **Verification:** Did the call return correct results? Retry needed?
1. **Payment:** If it's a commercial API, how is billing handled?

**This process is the core infrastructure for autonomous agent operation.**

## II. LangChain's Design Philosophy: Predefinition & Assembly

With our three beliefs as context, LangChain's design choices become clearer — and so does why we took a different path.

**LangChain's core abstractions are Chains and Agents.**

Chains: Predefined Workflows

## A typical LangChain pattern

chain = LLMChain(

    llm=OpenAI(),

    prompt=PromptTemplate(template="..."),

    output_parser=OutputParser()

)

result =

[chain.run](https%3A%2F%2Fchain.run%2F)

(input)

The essence of Chains: **developers predefine the steps, and the agent follows them.**

This works well in many scenarios:

- Customer service bots: classify question → retrieve from knowledge base → generate answer
- Data analysis: read CSV → clean data → generate chart → explain results
- Content generation: research topic → draft outline → write paragraphs → polish

**But these scenarios share a common trait: the workflow is relatively predictable.**

Agents: Limited Dynamic Decision-Making

LangChain also offers Agents that appear to make dynamic decisions:

agent = initialize_agent(tools, llm, agent="zero-shot-react-description")

The agent can decide which tool to call based on context. **But the tool set is predefined:**

tools = [tool_1, tool_2, tool_3]  # Hardcoded by the developer

**If the agent discovers mid-execution that it needs tool_4 — and tool_4 isn't in the predefined list — it's stuck.**

Summary of LangChain's Philosophy

- **Workflows:** Predefined (Chains) or limited dynamic (Agents)
- **Tools:** Hardcoded; developers configure them upfront
- **Best for:** Predictable workflows, known tool sets, teams willing to invest in configuration

**There's nothing wrong with this. But we believe it's only part of the story — not the whole picture.**

## III. QVeris's Design Philosophy: Autonomous Operation & Dynamic Discovery

Based on the three beliefs above, QVeris took a fundamentally different approach.

Core Idea: When Agents Run Autonomously, "Configuration" Shouldn't Exist

LangChain asks developers to:

- Predefine all tools
- Pre-write all prompt templates
- Pre-design all workflow steps

We asked a different question: **If an agent is truly going to run autonomously, how can it depend on a developer's upfront configuration?**

**A truly autonomous agent should be able to:**

- Understand what capabilities it needs based on current context — in real time
- Discover suitable capabilities with zero prior configuration
- Dynamically evaluate, select, invoke, and verify

QVeris Today: Search & Execute

What QVeris provides right now is a **unified capability search and execution interface** for agents. No tools need to be preconfigured — agents discover and invoke capabilities at runtime:

import qveris

## Step 1: Search — describe what you need in natural language

results =

[qveris.search](https%3A%2F%2Fqveris.search%2F)

("real-time stock price for AAPL")

## Returns: ranked list of matching tools with success_rate,

## latency, provider info — from 10,000+ options

## Step 2: Execute — call through one unified interface

data = qveris.execute(

    tool_id=results[0].id,

    params={"symbol": "AAPL"}

)

## QVeris handles: auth, parameter mapping, error retries,

## result normalization — regardless of underlying protocol

**The key difference from LangChain: no tools were configured upfront.**

The agent didn't need to know which financial API to use, how to authenticate with it, or what its parameter format looks like. It described a need, QVeris found the best option, and a single execute call handled the rest.

**In a real agent workflow**, this plays out naturally:

- Agent is preparing an investor meeting → needs financial data →
- [qveris.search](https%3A%2F%2Fqveris.search%2F)
- ("company financials") → gets results → qveris.execute(...) → data retrieved
- Discovers it also needs competitor info →
- [qveris.search](https%3A%2F%2Fqveris.search%2F)
- ("competitor analysis tool") → finds one → executes it
- Each new need is resolved dynamically, without any prior configuration

What Makes This Work: Two Pillars

1. **Semantic Capability Search (10,000+ tools)**
- Not a predefined tool list — a live, semantic search engine over capabilities
- Agents describe needs in natural language; the system returns the best matches ranked by reliability (success rate), speed (latency), and relevance
- Quality signals are real: every tool has measured success rates and execution time statistics from actual usage
1. **Unified Execution Layer**
- One standardized interface to invoke any tool — whether the underlying implementation is a REST API, GraphQL endpoint, or custom service
- Handles automatically: authentication, parameter mapping, error retries, result normalization
- Consistent output format regardless of which tool was called
- Dynamic routing: when a tool is unavailable, QVeris can suggest alternatives from the same capability category

What's Next: QVerisFlow

Today's search-and-execute layer is the foundation. But our vision goes further.

**QVerisFlow** (in development) will add the orchestration layer on top — enabling agents to execute fully autonomous workflows:

Dynamic need identification → Capability search → Evaluation →

Selection → Invocation → Verification → Billing → Loop

Where agents don't just find and call individual tools, but autonomously **plan, execute, verify, and iterate** through complex multi-step tasks — with QVeris handling capability discovery at every step.

Think of it this way: **QVeris today is the "Google Search" for agent capabilities. QVerisFlow will be the "Google Workspace" — the complete productivity layer built on top of that search foundation.**

## IV. Two Philosophies, Two Sweet Spots

Understanding the philosophical difference makes it easy to answer "when should I use which?"

Use LangChain when:

- **Your workflow is predictable:** customer service bots, standard data analysis pipelines
- **Your tool set is known:** you only need 5–10 internal tools
- **You're willing to invest in configuration:** your team has time to write Chains and configure Tools
- **You need fine-grained control:** you want precise logic at every step
- **Your team has strong engineering talent:** professional Python developers available

**Typical scenarios:**

- Internal enterprise automation
- Standardized customer service / sales assistants
- Data processing pipelines with known tool sets

Use QVeris when:

- **Your workflow is unpredictable:** every execution may encounter new situations and needs
- **Your tool requirements are dynamic:** impossible to know upfront which tools you'll need
- **You don't want to spend time configuring:** you want "describe the need, get it done"
- **You need access to a broad range of capabilities:** 100+ or even 1,000+ tools
- **Your team doesn't have dedicated AI engineers:** product managers and business users should be able to use it too

**Typical scenarios:**

- Personal productivity assistants ("help me do X" where X is different every time)
- Research assistants (need to query various data sources, generate various formats)
- Startup teams building rapid prototypes (no dedicated AI engineer)
- Cross-domain tasks (requiring diverse, unrelated tools)

## V. The Future: Complementary Ecosystem, Not Zero-Sum Competition

I didn't write this to argue QVeris is better than LangChain.

In fact, we believe **both are necessary — and they should be complementary.**

A Possible Future Architecture

┌──────────────────────────────────────────────┐

│  Application Layer: Vertical Agents           │

│  (writing, coding, customer service)          │

│  Users: End users                             │

├──────────────────────────────────────────────┤

│  Discovery & Orchestration Layer (QVeris)     │

│  Need understanding → Capability discovery    │

│  → Dynamic invocation                         │

├──────────────────────────────────────────────┤

│  Framework Layer (LangChain)                  │

│  Memory management, error handling,           │

│  logging, tracing                             │

├──────────────────────────────────────────────┤

│  Tool Layer: Concrete Capability Providers    │

│  Third-party SaaS, open-source tools,         │

│  internal systems                             │

└──────────────────────────────────────────────┘

In this architecture:

- **LangChain** provides the underlying infrastructure (memory, logging, error handling)
- **QVeris** provides dynamic capability discovery and orchestration
- **Developers** compose them as needed

A Practical Example

Say you're building an "investment research assistant":

**With LangChain alone:**

- You preconfigure: financial data API, news API, stock data API, deck generation tool
- You design a Chain: fetch financials → fetch news → analyze → generate deck
- If one day you need "patent data," you modify the code and add a new tool

**With LangChain + QVeris:**

- LangChain handles: conversation management, memory, error handling
- QVeris handles: when the agent says "I need patent data," it discovers a patent search tool in real time and invokes it
- You never preconfigured a patent tool. QVeris handled it automatically.

**That's the value of complementarity.**

## VI. Closing Thoughts: On the Future of Agents

Coming back to the three beliefs:

1. **Workflows are dynamic loops, not predefined chains** — This demands a fundamentally different orchestration layer
1. **No single model can do 100% of the work** — This makes tool discovery and invocation core infrastructure
1. **Dynamic capability discovery is the core process** — This means "semantic discovery + dynamic routing" is next-generation infrastructure

QVeris was designed from the ground up around these beliefs.

We're not trying to build another LangChain.

We're building **the infrastructure that agents need when they truly start operating autonomously and collaborating at scale.**

The heart of that infrastructure isn't "how to assemble tools." It's "how to enable agents to discover, evaluate, invoke, and verify external capabilities — with zero prior configuration."

**That's QVeris.**

## About the Author

**Linfang Wang** is the Founder & CEO of QVeris AI. Previously CTO at Liblib AI, he holds BS and MS degrees in Electronic Engineering from Tsinghua University and was a researcher at Microsoft Research Asia. At Microsoft Bing, he led large-scale information retrieval and knowledge graph systems. At Liblib, he built one of China's leading open-source multimodal model communities. He founded QVeris in 2025 to build the discovery and execution infrastructure for the AI Agent era.

**We believe:** Future agents shouldn't depend on human preconfiguration. They should be able to autonomously discover, evaluate, and invoke external capabilities to accomplish complex tasks.

**Further Reading:**

- [QVeris Documentation](https%3A%2F%2Fqveris.ai%2Fdocs)

**Discussion:** What are your beliefs about how agents will work in the future? I'd love to hear your thoughts.

*Original content. Please credit the source when sharing.*
