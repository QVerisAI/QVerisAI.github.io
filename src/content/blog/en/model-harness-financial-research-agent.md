---
title: 'The Stronger the Model, the More Important the Harness: What Financial Research Agents Reveal About the Engineering Boundary of Next-Generation AI Systems'
description: Why production-grade AI agents need a harness that governs facts, actions, state, and publication, especially in financial research.
pubDate: Aug 03 2026
heroImage: ../../../assets/blog-model-harness-financial-research-agent-1.png
category: Engineering
author: QVeris Team
tags: ['QVeris', 'Agent', 'Harness']
translationKey: model-harness-financial-research-agent
---

> What often determines whether an Agent can enter production is not what the model can do at its smartest moment. It is what the system can still hold onto when data is incomplete, tools fail, state is lost, costs are incurred, and the model makes the wrong judgment.

Over the past few weeks, we have been refining the Agent Harness for the launch of QVeris Lab. The deeper we go, the more convinced I am of one thing: in the Agent era, the most underestimated technology is not the model, and it is not the number of tools. It is the Harness between the model and the real world.

The word "Harness" can easily sound like a thin engineering shell, as if it merely glues prompts, tool calls, and interfaces together. In a real production system, however, it is closer to an operating institution. It decides what the model can see, what it is allowed to do, which results can be trusted, how the system recovers after errors, and whether the system can be accountable for a decision.

This article is not about a specific framework, nor is it an attempt to introduce yet another vocabulary for Agents. I want to share the recurring problems we have encountered in financial research, and the judgment that has emerged from them: the stronger the model becomes, the less dispensable the Harness becomes. On the contrary, it gradually evolves from "code that calls the model" into the epistemic core and execution control plane of an intelligent system.

![Figure 1 | How a trustworthy research Agent moves from a question to an auditable conclusion](../../../assets/blog-model-harness-financial-research-agent-1.png)

# 1. From Demo to Production: Where the Real Gap Lies

An Agent demo can be impressive very quickly: the model understands the question, calls a few tools, and produces a clearly structured answer. But once it enters a real business setting, the evaluation criteria change abruptly.

Andrej Karpathy put this gap between demo and product very plainly: **"Demo is easy, a product takes a decade."** Using autonomous driving as the example, he described the long, difficult work as the "march of nines": moving from 90% to 99%, then 99.9%, with each additional nine requiring another round of hard engineering.

![Figure 2 | The difference between a demo and a product: one successful run is not sustained reliability](../../../assets/blog-model-harness-financial-research-agent-2.png)

Users no longer ask only, "Can it answer?" They keep asking: when is this data from? Where did this number come from? When sources conflict, why did the system choose this one? What formula was used? If a timeout happened halfway through, did the action run twice? Has a cost already been incurred? If the task was interrupted, why can it still resume? When I open it next time, am I seeing historical fact, or an illusion left behind by a cache?

None of these questions can be solved by a longer prompt. They require the system to maintain its own boundaries of fact, state, and responsibility outside the model.

## 1. The Model Understands the Question, But Retrieves the Wrong Data

This is the most common, and often the most hidden, failure mode for tool-using Agents. A user asks for a real-time price, and the Agent returns yesterday's close. A user asks for a quarterly margin, and the Agent mixes in full-year data. A user asks about one company's metrics, and the model drifts between entities with similar names.

Usually the problem is not that the tool does not exist, nor that the model completely misunderstands the question. The problem is that the system treats "which tool should I choose?" as a language judgment, without expressing the user's actual data requirements as machine-verifiable conditions.

Tool names are not semantics. A tool whose name contains "market data" or "financials" does not prove that it satisfies requirements for freshness, period, currency, adjustment method, data coverage, or authorization. The model can propose a choice, but it cannot also serve as its own validator.

## 2. A Number Can Be True While the Conclusion Is Still Wrong

Financial research makes this problem especially visible. A number can be real and still lead to a completely wrong judgment because its time, definition, or context is wrong.

For example, the same "margin" may refer to a single quarter, year-to-date, or trailing twelve months. The same "price" may be real-time, delayed, previous close, or adjusted historical price. The same valuation multiple may use different denominator periods. The model sees a value; the research conclusion depends on "value plus context."

A trustworthy Agent therefore cannot store only values. It must also store the entity, time, period, currency, unit, data scope, source, and processing method. When this information is missing, the system should reduce the strength of the conclusion, and when necessary refuse to generate a definitive judgment.

## 3. Tool Calls Are Not Pure Functions; They Are Remote Actions With Side Effects

Many Agent architectures draw tool calls as a simple arrow: send a request, receive a result. The real world is not that clean.

A call may time out after the remote side has already executed it. Local cancellation does not mean the other side stopped. A retry may trigger duplicate billing. A success response does not necessarily mean the bill has settled. After a process crash, a new worker may not know how far the previous request got.

If the system equates "no result received" with "nothing executed," it may perform duplicate actions. If it displays an unknown cost as zero, it creates false certainty.

Production Agents therefore need to maintain execution truth independently of the model: who owns the task, whether the request has been submitted, whether the remote result is known, whether retry is allowed, and whether the cost is pending or settled. The core issue is not to chase a careless promise of "Exactly Once." It is to represent uncertainty honestly and ensure that every uncertain state has a safe next step.

## 4. Long Conversations Do Not Mean Resending the Entire History to the Model

When an Agent evolves from one-off Q&A into a long-running research partner, another problem appears quickly: the user needs complete history, but the model should not reread the entire history on every turn.

If conversation records, the current task, verified facts, raw tool outputs, and temporary reasoning are all mixed together, the context becomes slower, more expensive, and more vulnerable to interference from old questions. Caching can reduce part of the cost, but it cannot remove the attention burden the model still has to process.

A better approach separates "the complete history visible to the user" from "the working set the model currently needs." The system continuously maintains the current task, key entities, user constraints, confirmed facts, unresolved items, and historical references; it retrieves earlier material only when needed.

In other words, long-term memory is not unlimited context. It is structured forgetting and on-demand recall.

Anthropic's [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) also frames context as a critical but limited resource, and notes that as context grows, models suffer from diluted attention and declining relevance of information. Its direction is not to keep piling in material, but to find the smallest high-signal information set sufficient for the current task. That closely matches our own practical view of long-term memory.

## 5. Observability Can Also Create Hallucinations

Agent teams are easily encouraged by polished P95 charts, token reductions, and cost curves. But if the sample is too small, the control group uses a different version, task difficulty is inconsistent, or cached input is mixed with genuinely new input, even precise numbers may have no explanatory power.

The principle we have gradually settled on is this: structural correctness, research quality, latency, and cost must be measured separately; when sample size is insufficient, the system should explicitly state that there is not enough evidence; old and new approaches must be compared pairwise using the same model, configuration, and tasks; and evaluation artifacts themselves must make version and completeness verifiable.

A trustworthy system must first refuse to prove its trustworthiness with the wrong measurement.

This risk is not theoretical. In [Separating signal from noise in coding evaluations](https://openai.com/index/separating-signal-from-noise-coding-evaluations/), OpenAI audited a major coding benchmark and estimated that roughly 30% of tasks contained disruptive issues, explicitly pointing out that flawed evaluations can create a mistaken understanding of model capability. For Agent teams, evaluation sets, graders, and statistical definitions are also product components that need to be audited.

# 2. Why Financial Research Is an Ideal Testbed for Agents

Financial research is not the only domain that requires high trust, but it concentrates the main difficulties of Agents in one place.

Data is highly time-sensitive; the same fact changes as markets move and disclosures arrive. Metrics depend heavily on period, definition, currency, and adjustment method. Multiple sources may conflict. Research requires both open-ended reasoning and deterministic calculation. Tool calls carry cost, permission, and licensing constraints. Final conclusions may influence real capital decisions.

This means a financial research Agent cannot merely aim to be "right most of the time." At a minimum, it must:

- Know the time point and data definition for every key fact;
- Trace conclusions back to sources and calculations;
- Express uncertainty when sources conflict or information is insufficient;
- Complete machine validation before publishing key numbers;
- Preserve true execution state after interruption, timeout, and retry;
- Let users review the evidence instead of asking them to trust the model's confident tone.

I prefer to understand "audit-grade" as an engineering property rather than a marketing label: the system does not promise that it will never be wrong, but errors must be discoverable, explainable, blockable, and recoverable, and fluent language must not be allowed to conceal missing evidence.

# 3. What Exactly Is a Harness?

If we compare a large model to an exceptionally talented researcher who learns quickly, the Harness is not the researcher's secretary, nor merely a toolbox. It is closer to the research institution itself: data standards, research process, permission system, calculation methods, archive system, quality control, and accountability mechanism.

The model is responsible for understanding open-ended questions, proposing hypotheses, developing strategies, identifying relationships, and organizing expression. The Harness turns those open intentions into executable and verifiable requirements, manages external actions, and decides what kind of evidence is sufficient to support what kind of conclusion.

OpenAI's 2026 article [Harness engineering](https://openai.com/index/harness-engineering/) summarizes this division of labor as **"Humans steer. Agents execute."** Our more important lesson is that we should not micromanage every implementation step for the model. Instead, we should make the environment understandable, turn critical constraints into mechanically enforceable invariants, and establish continuous feedback loops. This is how the Harness moves from a "model wrapper" toward a production operating system.

> Question -> evidence requirements -> data and actions -> quality validation -> deterministic calculation -> conclusion-evidence binding -> output

![Figure 3 | The model handles openness; the Harness establishes boundaries for facts, actions, and responsibility](../../../assets/blog-model-harness-financial-research-agent-3.png)

In this flow, the model is not excluded. It is placed where it is strongest. The Harness is not competing with the model's intelligence; it turns that intelligence into dependable system capability.

# 4. Will Stronger Models Eat the Harness?

They will eat part of it, and they should.

Keyword routing, fragile prompt tricks, large numbers of hand-written tool-selection branches, fixed and verbose planning templates, and pure format conversion will all shrink as models improve. A good Harness should not permanently fossilize today's model weaknesses into tomorrow's architecture.

But stronger models cannot reason external facts into existence. Nor can they know by "thinking" whether a remote request has already incurred a charge, whether a user has a data license, what happened before a process crashed, which reporting period a financial field belongs to, or whether a cache has expired.

The Harness that endures is therefore not the part that thinks for the model. It is the part that assumes four kinds of responsibility the model cannot prove on its own:

**Responsibility for facts.** Where the data comes from, and what time and context it belongs to.

**Responsibility for actions.** What the system did, who authorized it, whether it can be retried, and whether side effects occurred.

**Responsibility for state.** What remains true after interruption, concurrency, and recovery.

**Responsibility for publication.** What evidence is sufficient to support which conclusions, and what content must be blocked or downgraded.

The stronger the model becomes, the longer the tasks it can carry out autonomously, the more tools it can call, and the more external systems it can affect. The error radius grows with that capability. The value of the Harness therefore does not decline; it upgrades from "helping the model work" to "governing model capability."

Anthropic's evolution offers useful supporting evidence. In [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), Anthropic recommends starting with the simplest composable patterns and adding complexity only when necessary. In its 2026 experiment on [Harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps), the team goes further: every Harness component implicitly encodes an assumption about what the model still cannot do, and those assumptions must be continuously retested as models improve. When models advance, obsolete scaffolding should be removed. Components that still carry responsibility for facts, evaluation, and boundaries should remain.

# 5. How to Design a Harness That Co-Evolves With Models

## 1. Start From Evidence, Not Tools

Do not ask the model to guess from a tool list at the beginning. First ask it to specify what entities, time ranges, data capabilities, quality standards, and result formats are required to answer the question. Tools are only one implementation for satisfying those requirements.

This keeps the research semantics stable even when data sources, models, and tool interfaces change.

## 2. Let the Model Propose and the System Verify

The model should have broad planning space, but it should not define the rules, execute the rules, and declare that it passed the rules all by itself. Permission, budget, time semantics, data quality, retry boundaries, and publication conditions should be independently verified by the system.

This is not distrust of the model. It is the basic discipline of any mature system: critical components do not self-certify.

## 3. Make Evidence a First-Class Object

If research output exists only in chat messages and tool-returned text, the system has a hard time replaying, comparing, and reusing it. A better approach stores source facts, derived calculations, and final claims as versioned objects.

Answers, tables, charts, downloads, and audit views all reference the same evidence. This prevents one set of data from being used in prose while another set is interpreted in charts.

## 4. Separate Calculation From Generation

Models are well suited to proposing what should be calculated and explaining what the result means. Deterministic financial calculations should, as much as possible, be performed by versioned formulas or controlled compute environments.

This does not deny the model's ability to write code, nor does it seek rigidity. It simply acknowledges that when a number enters a formal conclusion, reproducibility is usually more important than improvisational cleverness.

## 5. Preserve Execution Truth, Not Just Chat History

Chat history tells us what the user and the model said. Execution truth tells us what the system actually did. Production Agents must persist task ownership, action state, evidence versions, cost state, and recovery boundaries.

Real-time caches and event streams can serve the user experience, but they should not be the only source of truth.

## 6. Put Model Upgrades Through Paired Evaluation, Not Impression-Based Evaluation

Models, prompts, tools, and Harnesses often change together. Without controlled comparisons bound to the same task, environment, and version, it is difficult for teams to know where a quality change actually came from.

Every model upgrade should be observed across answer quality, evidence coverage, tool behavior, latency, cost, failure recovery, and external side effects. A stronger model should not merely produce a higher score; it should also earn more autonomous space. The system, meanwhile, continues to hold the same fact and execution boundaries.

Anthropic's [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) clearly distinguishes "trajectory" from "outcome": the fact that an Agent claims in a conversation that a task is complete does not mean the correct result was actually produced in the external environment. When evaluating an Agent, we evaluate the whole composed system of model and Harness. OpenAI's [guide to trustworthy third-party evaluations](https://openai.com/index/trustworthy-third-party-evaluations-foundations/) makes the same point that Harnesses, tools, and budgets materially change measured capability. Any claim of a model upgrade must specify the system conditions under which that upgrade was measured.

## 7. Turn Every Failure Into System Capability

When an error occurs, the cheapest fix is often to add one more sentence to the prompt. The more valuable fix is to ask whether the system is missing a data semantic, a quality rule, a state record, a regression sample, or a user-visible way to express evidence.

When production failures continuously become contracts, validators, evaluation sets, and product feedback, the Harness grows alongside the model. The model expands the boundary of what is possible; the Harness turns what has been learned into stable foundation.

# 6. QVeris Lab: What We Are Building

QVeris Lab will soon launch on web and desktop. We want it to be neither a financial skin on a generic chat product nor a natural-language entry point for a traditional financial terminal.

Generic Agents are strong at open-ended understanding and cross-domain reasoning, but they usually lack time semantics for financial data, deterministic calculation, and execution audit. Traditional vertical products have high-quality databases and fixed workflows, but often struggle to support open questions, dynamic research paths, and long-cycle collaboration.

QVeris Lab is our attempt to connect these two ends: preserve the model's open research capability while building financial data contracts, evidence, calculation, permission, cost, and recovery mechanisms into the runtime foundation.

![Figure 4 | QVeris Lab Web preview: an evidence-oriented workspace built around models, transparent execution, and recoverable sessions](../../../assets/blog-model-harness-financial-research-agent-4.png)

**It is centered on capabilities rather than tools.** The user expresses a research goal; the system understands the required data and action capabilities, then chooses the concrete implementation.

**It is centered on evidence rather than messages.** Research output first becomes reusable, verifiable evidence objects; the answer is only one presentation of them.

**It pays attention to what was known at the time.** Time, disclosures, market state, and historical versions are not annotations; they are part of the research conclusion.

**It binds key claims to evidence.** Important numbers and judgments can be drilled down to sources, fields, time points, and calculation processes.

**It treats long conversations as research workspaces.** Users can continue a full research process across web and desktop, while the model uses organized, effective context rather than repeatedly ingesting all history.

![Figure 6 | QVeris Lab Desktop preview: a focused workspace for long-running tasks and continuous cross-device research](../../../assets/blog-model-harness-financial-research-agent-5.png)

**It brings execution and cost into the trust boundary.** Tool calls, failure recovery, and cost state are not backend black boxes. They are part of the research activity.

**It provides a human-oriented audit experience.** Ordinary users first see conclusions, progress, and key evidence. When review is needed, they can step down layer by layer into data sources, quality, calculation, and execution details, instead of facing a long stream of raw tool logs.

These capabilities will not all reach their final form in the first version. What matters more to us is establishing a foundation that can keep evolving: models can be replaced, tools can be added, data sources can migrate, but responsibility for facts, actions, state, and publication always has a clear owner.

# 7. Our View of the Next Generation of Agents

Industry discussion today often swings between two extremes. One side believes model capability will eat every engineering layer. The other tries to constrain models completely with ever more complex workflows.

I think both underestimate the real change.

As models improve, the parts of the Harness that exist only to compensate for model weakness will continue to shrink. At the same time, the parts that exist to carry greater model autonomy will continue to strengthen. Future Harnesses will tell models less about how to think step by step, but they will be much clearer about which facts may be used, which actions may occur, which state can be recovered, and which conclusions may be published.

In the end, the difference between excellent Agents will not be only a few points on a model leaderboard, nor simply the number of connectors in a tool marketplace. The real difference will be this: when a model enters the real world, can the system turn its intelligence into a reliable, accumulative, governable form of productivity?

That is the starting point for building QVeris, and it is the long-term question I believe every Agent and Agent Harness developer will face.

> The model determines the ceiling of intelligence. The Harness determines whether that intelligence can truly be trusted by society, organizations, and users.

---

## References and Further Reading

- [Andrej Karpathy — AGI is still a decade away](https://www.dwarkesh.com/p/andrej-karpathy), Dwarkesh Podcast, 2025
- [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/), OpenAI, 2026
- [Separating signal from noise in coding evaluations](https://openai.com/index/separating-signal-from-noise-coding-evaluations/), OpenAI, 2026
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), Anthropic, 2024
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), Anthropic, 2025
- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), Anthropic, 2026
- [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps), Anthropic, 2026
