---
title: Agents Need More Than Tool Calls. They Need Execution Ledgers.
description: Once agents enter business workflows, every execution needs a reviewable,
  reusable, and transferable ledger.
pubDate: Jul 03 2026
heroImage: ../../../assets/blog-agent-execution-ledger-cover-en.png
category: Product
author: QVeris Team
tags:
- QVeris
- Agent
translationKey: agent-execution-ledger
---
# Agents Need More Than Tool Calls. They Need Execution Ledgers.

## One sentence summary



After the Agent actually enters the business process, the most important thing is not whether a call is successful, but whether each execution can be reviewed, reused, and handed over. What QVeris wants to make up for is the layer where Agent can move from "being able to call tools" to "being able to manage execution".

![This picture shows a main link for Agent execution, which corresponds to the core requirement that Agent execution needs to leave a reproducible execution record. The link starts from the user task entered by the business problem, and passes through the three links of Discover (discovering available tools), Inspect (checking parameters and costs), and Call (executing real tools), and finally enters the fifth step of executing the ledger link, leaving corresponding execution evidence. At the bottom of the picture, it is clearly marked that each step needs to record tool selection, calling parameters, data sources and other information to achieve the requirements that answers can be quoted, processes can be checked, and questions can be reviewed. It visually presents the complete link logic of the Agent from tool invocation to management execution.](../../../assets/blog-agent-execution-ledger-1.png)

For many people building an Agent for the first time, the most exciting moment is often when the tool call finally works.

The user says a word, and the Agent automatically breaks down the task, finds tools, fills in parameters, returns results, and then organizes it into a seemingly complete answer.

This step is of course important.

But once you actually put an Agent into a business process, you will find that "getting tool calls working" is only the beginning.

More troublesome problems soon emerged:

Why did it choose this tool?

Who filled in the parameters?

What data sources were used?

How many times did you fail?

Was there any downgrade?

How much did it cost?

That last conclusion, can you go back to the original record?

If these questions cannot be answered, the Agent may appear to be performing tasks, but in fact it is just packaging a series of invisible processes into a smooth result.

This is also something we have become increasingly clear about recently when working on QVeris workflows:

Agents cannot just call tools.

It also needs to leave a checkable execution ledger for every call.



## 01 | The real danger is not that the call fails, but that the call is successful but cannot be reviewed

![The picture shows the dialogue interface of the two AI models QVeris and moonshotai/kimi-k2.6. The user asked "Help me search for the real-time quotation of Moutai stock", and there was a blue button on the right that said "Help me search for the real-time quotation of Moutai stock." The AI ​​model below replies "Let me help you check the real-time market conditions of Moutai (Kweichow Moutai, 600519)." The picture is closely related to the context and visually presents the content of the user's question and the AI ​​model's reply. It is an example of "Agent call is successful and the answer is generated" mentioned in the context. It is used to illustrate the dangerous situation where the Agent call is successful but cannot be reviewed.](../../../assets/blog-agent-execution-ledger-2.png)

A failed tool call is not actually the scary part.

Failure at least exposes it.

Interface timeout, insufficient permissions, parameter errors, and missing fields can all be fixed later as long as they are recorded.

The real danger is another situation:

The Agent call succeeded and the answer was generated, but no one knows how it succeeded.

It may be using a data source that is not suitable for the current task.

It may automatically guess a default value when a parameter is missing.

It may turn a partial result into a complete conclusion.

It may have switched to another tool after the first call failed without telling the user.

It may also get only a summary but write a judgment as certain as the original evidence.

These problems are not obvious in the demo.

Because the demo is more concerned about "whether the results come out."

However, in scenarios such as finance, risk control, sales, recruitment, compliance, and investment research, the results do not mean the results are credible.

What the business really needs to know is:

Where does this result come from.

What steps does it go through.

Which places are certain.

Which places are just temporary replacements.

Which areas require manual review.

Therefore, the Agent system cannot only save the final answer.

It must save the execution process.



## 02 | The execution ledger is not a log, but a set of available evidence structures



Tool execution failed: token endpoint HTTP 503

Parameters:

{
  "stockObject": [
    "Kweichow Moutai"
  ]
}

Response:

{
  "execution_id": "a3e10c38-40fa-41e4-8c7c-886766f16d5a",
  "tool_id": "hangseng_polysource.a_shares_live_quote.query.v2.10fe0581",
  "parameters": {
    "stockObject": [
      "Kweichow Moutai"
    ]
  },
  "result": {
    "status_code": -1,
    "data": null,
    "error_type": "execution_error",
    "error_details": "token endpoint HTTP 503"
  },
  "success": false,
  "error_message": "Tool execution failed: token endpoint HTTP 503",
  "elapsed_time_ms": 5432.54,
  "created_at": "2026-07-02T15:10:23.283822+00:00",
  "cost": 0,
  "execution_outcome": {
    "schema_version": "execution_outcome.v1",
    "raw_success": false,
    "transport_success": true,
    "provider_success": false,
    "result_valid": false,
    "billable_success": false,
    "outcome": "provider_error",
    "status": "not_charged",
    "reason_code": "provider.error",
    "message": "provider status code -1",
    "provider_status_code": -1,
    "provider_status_message": "provider status code -1",
    "valid_result_count": 0,
    "raw_result_count": 0,
    "raw_success_rate_excluded": false,
    "retryable": false,
    "display_severity": "error"
  },
  "billing": {
    "price": {
      "amount_credits": 1,
      "per": 1,
      "unit": "call",
      "unit_label": "call"
    },
    "list_amount_credits": 0,
    "summary": "Execution failed; Provider returned an error; this call was not charged",
    "execution_outcome": "failure"
  },
  "remaining_credits": 615.51
}

Many systems already have logs.

But logs and execution ledgers are not the same thing.

The log is more like a running trace for engineers to see.

The execution ledger is an evidence structure used by Agents, developers, business personnel, and audit processes.

It should contain at least several types of information:

what is the task;

What steps does Agent break down into?

Which tools were selected at each step;

Why you ultimately chose your current tool;

What are the calling parameters;

What is the return result?

where the original evidence is;

Whether a failure, retry, or degradation occurred;

How much cost was consumed;

which conclusions can be cited;

Which conclusions need to be bounded.

If only the tool returns a value, the Agent gets a result.

If there is an execution ledger, the Agent gets a context that can continue to be used.

There is a big difference between the two.

A result can only answer the current question.

A ledger can support follow-up review, secondary analysis, manual review, failure troubleshooting, and process handover.

This is also a layer that Agent must add when moving from personal assistant to enterprise process.



## 03 | Tool selection also needs to be recorded, rather than just recording the call results

Many Agent workflows will focus on Call.

That is, whether the tool was executed successfully.

But in real tasks, the selection process before calling is equally important.

For example, a user asks: "Help me check a company's recent risk signals."

Agents may have many candidate tools:

Business information;

judicial risks;

Bidding records;

News search.

If the Agent directly calls one of the tools and then gives an answer, the answer may be one-sided.

A more stable approach is to record the tool discovery and screening process first.

What candidate capabilities did it search for?

What data does each tool cover?

Are permissions required?

How much does it cost?

How frequent are updates?

Can the results be traced back to the original source?

Why is A used first instead of B in the current task?

These choices themselves are part of the evidence.

Because in a business scenario, what is not checked is as important as what is checked.

If an agent only tells you "no risk found" but does not tell you what range it checked, it is difficult to trust this statement.

If it could explain that "this inspection covered industrial and commercial, announcement, news and judicial data, but did not cover internal CRM and paid public opinion database", then the conclusion would have boundaries.

Boundaries are not the answer to weakening.

Boundaries are protecting answers.



## 04 | Execution ledger allows Agent to change from one-time answer to handover process

![The picture shows an execution ledger interface. The upper part displays information such as "Thought" and "Discover", and the lower part lists multiple tool call records, such as "hangseng_polysource_a_shares_live_quote.query.v2.10fe0581", etc. Each record contains tool name, call time, success rate, delay and other data. There is a "SUCCESS - LATENCY - COST" tab in the upper right corner of the interface. This picture is related to the content in the document that "the execution ledger allows the Agent to change from a one-time answer to a handover process". It visually presents the tool calls and records when the Agent performs tasks, helping to understand the function of the execution ledger.](../../../assets/blog-agent-execution-ledger-3.png)

Many Agents are still like disposable Q&A tools.

Ask once, answer once.

It's over after reading it.

But that's not how business processes work.

A lead may be given to BD.

A risk flag may be referred to compliance.

An investment research conclusion may need to be followed up.

A recruiting opportunity may be assigned to a regional team.

At this point, the final answer is far from enough.

The person taking over needs to know:

Why is this task triggered?

What checks has the Agent done?

Which fields have been confirmed;

Which fields are missing;

what evidence can be adduced;

Which judgments are just model inferences;

Where should we look manually next?

The value of executing the ledger is to turn an answer into a handover object.

It doesn't make the Agent appear more complex.

Instead, what the Agent has done can advance to the next step.

In an enterprise, whether a process can be handed over is often more important than whether the answer itself is beautiful or not.



## 05 | The position of QVeris: turning tool calls into manageable execution links

![This picture shows the real-time market overview data of Kweichow Moutai (600519), presenting relevant indicators and corresponding values ​​in tabular form. The title of 0.1.1 Real-time Market Overview is clearly marked, and the indicators and corresponding values included are: latest price 1,203.00 yuan, increase or decrease +9.99 yuan, increase or decrease +0.84%, opening The price was 1,193.01 yuan, the closing price yesterday was 1,193.01 yuan, the highest price was 1,215.52 yuan, the lowest price was 1,190.51 yuan, the average price was 1,203.53 yuan, and the amplitude was 2.10%. These data comprehensively present the real-time trading information of the stock.](../../../assets/blog-agent-execution-ledger-4.png)

![The picture shows content related to "Transaction and Valuation Data". The table lists a number of indicators and corresponding values, such as trading volume of 50,900 lots (approximately 5.087 million shares), turnover of 6.122 billion yuan, turnover rate of 0.41%, volume ratio of 1.03, etc. Among them, the total market value and circulating market value are both 1.503848 billion yuan, the price-to-book ratio is 6.46, and the total share capital is 1.250 billion shares. This picture is related to the task process in the document such as "understanding tasks; discovering capabilities; checking tools; filling in parameters; initiating calls; receiving results; generating evidence; organizing responses; and keeping records", and may be used to assist in explaining the data situation of a certain link.](../../../assets/blog-agent-execution-ledger-5.png)

![The picture shows the five levels of market information in stock trading. For the bid part, buying one is 1,203.00 yuan - 13.36 lots, buying two is 1,202.98 yuan - 2 lots, buying three is 1,202.96 yuan - 1 lot, buying four is 1,202.91 yuan - 1 lot, and buying five is 1,202.88 yuan - 1 lot. In the Ask part, the first sell is 1,204.00 yuan - 8 lots, the second sell is 1,204.03 yuan - 2 lots, the third sell is 1,204.04 yuan - 11 lots, the fourth sell is 1,204.30 yuan - 2 lots, and the fifth sell is 1,204.63 yuan - 3 lots. This image is related to the stock trading handicap information introduced in the context, and visually presents the handicap data.](../../../assets/blog-agent-execution-ledger-6.png)

![This picture shows the record information of the relevant execution link. The "Other Information" section is listed above, including the transaction date is 2026-07-02, the transaction status is closed (ends at 15:00), as well as the upper limit price, lower limit price, external price, The following summarizes the trend of Moutai's stock price on the day based on internal trading, commission ratio and other data. It rose slightly, fluctuated upward after the opening, with an amplitude of 2.1% throughout the day, active transactions, and closed firmly at the 1,200 yuan mark. The bottom also shows tool calls and various token data. This information corresponds to the execution records and results related to the Agent execution process mentioned in the document.](../../../assets/blog-agent-execution-ledger-7.png)

Understand the task;

discovery ability;

inspection tools;

Fill parameters;

Initiate a call;

receive results;

generate evidence;

organize answers;

Keep records.

Large models are good at understanding and expressing.

The Agent framework is good at splitting tasks and scheduling.

But a more stable infrastructure is needed between the tools and the real world.

This is also where QVeris comes in.

QVeris not only gives Agent an additional API entry.

More importantly, it allows the Agent to discover tools through semantic search, understand the tools before calling, get structured results after calling, and leave execution_id, parameters, source, cost and error information in the link.

This thing doesn't sound as obvious as "generating a beautiful answer".

But it determines whether the Agent can enter real business.

Because real business is about more than just results.

In real business, you need to know whether the results can be checked, whether the process is controllable, whether the costs can be calculated, and whether failures can be reviewed.



## 06 | The difference between Agents in the future may not be in the answers, but in the ledger



Next, the Agent will become better and better at writing.

Summarizing, outlining, reporting, analyzing, emailing, and speaking skills are all becoming more and more common.

What really widens the gap may not be whose writing is more expert.

But who can clearly manage every execution.

It’s the same conclusion. Can we go back to the original data?

It’s the same call. Can you see the parameters at that time?

It is also a failure. Can you know where the failure occurred?

In the same analysis, can we distinguish between evidence, inference and suggestion?

It is also a workflow. Can it be handed over to the next person to continue processing?

These questions determine whether the Agent stays in the demonstration or enters the business.

So I feel more and more that the next stage of Agent is not just a stronger model, nor more tools.

But a clearer execution ledger.

Because only when the execution process can be seen, the Agent really begins to become credible.
