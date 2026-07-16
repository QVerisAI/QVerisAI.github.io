---
title: "From 2.34% to 23.4%: The Most Dangerous Hallucination in Financial AI Is Often Not Invented"
description: The tool was right, and the data source was right. The real danger is a correct data point quietly changing by one digit when the model writes the report.
pubDate: Jul 10 2026
heroImage: ../../../assets/blog-feishu-e5rid02e6oaxx4xhcczclbkuncg-1.png
category: Product
author: QVeris Team
tags:
  - QVeris
  - Finance
translationKey: feishu-e5rid02e6oaxx4xhcczclbkuncg
---
The tool was right, and the data source was right. The real danger is a correct data point quietly changing by one digit when the model writes the report.

![The image shows a fintech work scene: a formally dressed man looks at virtual screens displaying a financial data processing flow. The left screen shows original percentage data, while the same type of percentage on the right screen changes after passing through an intermediate process. The scene reflects the financial AI data error described in the article and visually presents the risk of distortion during financial tool output.](../../../assets/blog-feishu-e5rid02e6oaxx4xhcczclbkuncg-1.png)

A small-looking numerical error can travel all the way into morning meetings, client briefings, and public account drafts.

**The tool returned 2.34%, but the model wrote 23.4%. The data source was not broken. The error happened when the tool result entered natural-language output.**

## **A Small Monday Morning Incident**

On Monday morning, a researcher named Lin asked an AI assistant to draft a short abnormal-movement brief.

The tool returned perfectly normal data: a stock was up 2.34%, trading volume had expanded versus the previous day, and one intraday announcement had drawn market attention. A few seconds later, the AI draft came back, fluent and plausible: the company's share price surged 23.4%, capital was clearly chasing the name, and short-term sentiment was heating up quickly.

Lin thought it read smoothly at first. On a second look, he broke into a cold sweat.

2.34% had become 23.4%. The tool was not wrong. The data source was not wrong. The mistake happened at the moment the model copied the data into the report. The bigger problem is that if no human had caught it, the sentence could have continued into a morning meeting memo, a client briefing, a public account draft, and eventually become an error that appeared to have a source.

## **The More Common Hallucination Is Not Fabrication, but Miswriting**

Many people understand AI hallucination as a model inventing a fact out of thin air. In financial settings, a more common and harder-to-detect hallucination is different: the data is real, but the final written output is wrong.

For example, a tool returns figures in ten-thousand-yuan units, but the report writes hundred-million-yuan units. US dollars and renminbi get mixed together. Year-on-year and quarter-on-quarter figures are reversed. Quarterly and annual metrics appear in the same table. "May be affected by an event" becomes "the confirmed reason for the rise." These errors do not look like nonsense. They often hide inside professional, fluent prose.

That is why financial AI is harder than ordinary question answering: the answer must not only look reasonable, but every key number and conclusion must also trace back to evidence.

## **Why Prompting Alone Is Not Enough**

You can certainly write instructions in the prompt: do not fabricate, check carefully, every data point must have a source.

The problem is that the model is still generating text. Asking it to write, remember every field definition, calculate precisely, and judge compliance boundaries at the same time is unrealistic. Key facts in financial reports cannot depend only on the model "being careful."

The idea behind QVeris Data Harness is simple: do not make the model carry the blame alone, and do not make it do the accounting alone.

## **How QVeris Data Harness Catches This Error**

After an Agent calls a tool, Data Harness first seals the tool result into an Evidence Packet. It does not just save a number. It records which tool, provider, and field returned the number, when it was returned, what unit it used, whether there was latency, and how many credits the call cost.

The LLM can then write a draft. But the draft cannot be delivered directly. Data Harness extracts the key claims from the draft, especially numbers, dates, entities, calculation results, and judgment-heavy conclusions. Claim Checker then compares those claims against the Evidence Packet, field definitions, and formula templates.

In the example above, the draft wrote "up 23.4%," while the evidence packet said "change_pct = 2.34." Claim Checker does not need to guess. It only needs to check whether the number matches the evidence. It does not match, but it can be corrected, so the status becomes corrected and the corrected text is "up 2.34%."

![The image shows how QVeris Data Harness stops an incorrect number. Tool outputs such as market data, announcements, and financial reports first return structured data. The data is then frozen into an evidence packet that records source, field, unit, timestamp, and call cost. The LLM writes the draft, but does not self-certify correctness. Claims are verified one by one by extracting numbers, dates, and conclusions, then comparing them against evidence and formulas. The final trusted report marks content as verified, corrected, uncertain, or blocked.](../../../assets/blog-feishu-e5rid02e6oaxx4xhcczclbkuncg-2.png)

The core idea of QVeris Data Harness is to freeze evidence first, let the model write second, and verify each claim last.

## **Four States Are More Useful Than "AI Verified"**

QVeris does not package every result as "confirmed." It breaks key outputs into four status types.

verified means the evidence matches and the output can proceed normally. corrected means a transcription, unit, or calculation error was found and can be fixed automatically. uncertain means the evidence is insufficient or the definitions conflict, so the user should be prompted to confirm. blocked means key data is missing or the risk is too high, so the system would rather not output anything than package an error as a certain conclusion.

These four words sound technical, but the plain meaning is simple: confirm what can be confirmed, fix what can be fixed, state what cannot be confirmed, and do not force an answer when the risk is too high.

![The image explains the four verification states in financial reporting. "verified" means data, formulas, and definitions match and the output can proceed. "corrected" means an error was found and fixed, such as changing 23.4% back to 2.34%, with the correction recorded in the trace. "uncertain" means evidence is insufficient, sources conflict, or definitions are unclear, so the user should confirm. "blocked" means output is stopped because key data is missing or risk is too high.](../../../assets/blog-feishu-e5rid02e6oaxx4xhcczclbkuncg-3.png)

The four verification states tell users what is trustworthy, what has been corrected, and what still needs confirmation.

## **This Is Not a Correction Plugin, but a Fact-Preservation Layer for Financial Agents**

The value of Data Harness is not just "error correction." It makes financial AI output explainable: users can see which parts of a report are facts, which are inferences, which have been recalculated with formulas, and which require human confirmation.

For developers, this means they do not need to repeatedly write fragile validation logic inside every Agent. For investment research and content teams, it means reports can be generated faster without exposing key numbers. For institutional clients, it means PoCs, audits, and postmortems can use a complete Trace Ledger instead of a polished paragraph with no audit trail.

So QVeris is not trying to make AI "more confident." It is trying to make AI confidence evidence-backed.

![The image shows a QVeris verification example, illustrating how tool JSON, an LLM draft, and Claim Checker output form a closed verification loop. First, tool JSON returns structured data such as change_pct = 2.34%. Next, the LLM draft contains the wrong number, such as "the current gain is 23.4%." Finally, Claim Checker returns a corrected status, changes the text back to "the current gain is 2.34%," and explains that the draft number does not match the Evidence Packet.](../../../assets/blog-feishu-e5rid02e6oaxx4xhcczclbkuncg-4.png)

Code illustration: how tool JSON, an LLM draft, and Claim Checker output form a closed verification loop.

## **Give AI Confidence Evidence**

In finance, the most expensive errors are often not cases where the model completely invents something. They are cases where it changes one digit in a correct data point, turns an ordinary fluctuation into a strong signal, or writes information that still needs confirmation as a definite judgment.

Data Harness adds a gate at those critical gaps: tools provide data, the model writes text, and QVeris reconciles the two sides.

A truly trustworthy financial Agent should not only answer. It should tell you where the answer came from, which parts were verified, which parts were corrected, and which parts remain uncertain.

That is the value of QVeris Data Harness: it connects AI Agents to real-world data, and it makes every output reviewable afterward.

**If you are building financial Agents, investment research assistants, data tool-calling systems, or enterprise AI workflows, QVeris Data Harness can serve as the foundation: it helps Agents find real capabilities, call real tools, and leave evidence behind in the final output.**

![The image shows the four things QVeris Data Harness adds to financial Agents: connecting real capabilities through APIs and other data access methods, freezing evidence packets that record key data sources, verifying key outputs through reconciliation and automatic correction, and supporting governance and review through a Trace Ledger. The core message is that every output should have an evidence chain, moving from "can answer" to "trustworthy, inspectable, and reviewable."](../../../assets/blog-feishu-e5rid02e6oaxx4xhcczclbkuncg-5.png)

QVeris Data Harness: giving every financial Agent output an evidence chain.
