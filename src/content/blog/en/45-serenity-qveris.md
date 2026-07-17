---
title: Serenity, the 45x White-Haired Stock Oracle, Went Viral. We Recreated Her Method
  for Finding Obscure Winners with QVeris
description: A QVeris case study inspired by a viral stock-picking persona, showing
  how obscure winners can be screened with real data instead of vibes.
pubDate: Jun 14 2026
heroImage: ../../../assets/blog-45-serenity-qveris-cover-en.png
category: Product
author: QVeris Team
tags:
- QVeris
- Agent
translationKey: 45-serenity-qveris
draft: true
---
QVeris · Tested with Data



# “45x returns, one sentence, and a 20CM limit-up.”



Recently, one name has taken over investing circles: Serenity, the “white-haired stock oracle” on X. Her historical total return was once rumored to have reached 225x; from January to May this year, her return was reportedly about 45x. More than once, she has called obscure stocks before they surged. Most recently, she sparked another round of market debate after naming companies in China’s A-share robotics supply chain.

Once the attention arrived, everyone asked the same question: who will she name next?

But the more useful question is this: is there anything in her method for spotting overlooked opportunities that ordinary people cannot reproduce?

After reviewing public discussions that break down her research process, the answer is: no. Once disassembled, the method has only two parts: a reasoning framework, plus a set of data validation actions. The reasoning framework is public. The data work is standard. Below, we follow the robotics thread she recently pointed to and run the full method once: the first two reasoning steps are broken down directly, and we also explain how to validate the data and where to go next.
## First, what is her edge?

If you only look at the stocks Serenity has named, you learn the answers. Answers are not reusable. When the next hot theme appears, you still will not know where to look.

**What is actually worth dissecting is the path. Based on public materials, her research process can be summarized in roughly five steps**:

**Step 1: translate market noise into concrete constraints.** Others stop at “robotics is hot.” She keeps asking: which engineering or capacity bottleneck is constraining the whole industry?

**Step 2: lay out the supply chain from top to bottom.** Do not rush to find stocks. Draw the map first: which links look unremarkable, but are unavoidable for the entire chain?

**Step 3: identify the hardest-to-replace positions.** Few suppliers, long certification cycles, difficult capacity expansion, no ready substitute. The stricter the conditions, the more likely an unpriced opportunity is hiding there.

**Step 4: within those critical positions, find companies that have not yet been noticed.** The type that sits in a key link, already has order clues, but still has a small market cap and little analyst coverage.

**Step 5: repeatedly test the thesis with evidence, and define what would make it wrong.** Read announcements, check financials, track catalysts, and list the signals that would overturn the thesis.

![](../../../assets/blog-45-serenity-qveris-1.jpg)

Once you see it this way, the first two steps are reasoning work. The last three are all data work.

Most people do not get stuck because they cannot think of the path. They get stuck because they cannot bear the data work. Laying out a supply chain means reading dozens of research reports. Verifying an order clue means digging into primary sources. Screening small-cap targets means clicking around in market software for a long time. These are exactly the things machines are now best at.
## Let reasoning handle reasoning, and let QVeris handle the data

**This workflow can be split into two sides**:

On the reasoning side: translate constraints, break down supply-chain layers, and design falsification conditions. Give that work to tools that can reason.

**On the data side: give it to QVeris.** QVeris is a search and action engine built for agents. Describe what you want to check in natural language, and it uses semantic discovery to match the request against 10,000+ verified tools and data sources, invokes the right capability, and returns structured results. Sectors, flows, screening, unlocks: ask in Chinese and it works. You do not need to remember which vendor provides which dataset.

For the demo below, all data was run inside the Live Demo, or Playground, on the QVeris website. Open the web page, ask in Chinese, and QVeris finds the data source, calls it, and returns results by itself. Nothing needs to be installed.

![](../../../assets/blog-45-serenity-qveris-2.png)
## Step 1: translate “robotics is hot” into concrete constraints

“Robotics is hot” is not a research object. “Which link is tightening?” is.

The bottleneck for mass-produced humanoid robots is not the whole-machine narrative. It sits in several engineering and capacity constraints: precision transmission, including the accuracy and capacity of harmonic reducers and planetary roller screws; force-control sensing, such as six-axis force/torque sensors; drive systems, including frameless torque motors and coreless motors; and most critically, whether the yield and cost of these core components can be brought down during the mass-production ramp.

At this point, no stock has appeared. But the target has already narrowed from “robotics concept” to several concrete links. That is the value of the first step.
## Step 2: lay out the supply chain, then validate it with data

Next, lay out the humanoid robotics supply chain by layer. From top to bottom, it roughly looks like this: upstream materials, such as specialty steel, rare-earth permanent magnets, and chips → core components, such as reducers, screws, motors, sensors, and controllers → joint modules and dexterous hands → body integration → software and algorithms → downstream applications.

The framework comes from reasoning. But whether the theme is real, and whether money is present, must be validated with data. This is the first type of query we give to QVeris: sector heat. We compare “humanoid robots” with “reducers,” one of the most typical upstream bottleneck links, to see what the market is actually trading.

**1. Period performance**

![](../../../assets/blog-45-serenity-qveris-3.jpg)

Both sectors pulled back by roughly -4.5% to -5% over the past week, with reducers falling slightly more. But once the window is extended, the divergence becomes clear: over the past 20, 30, and 60 days, humanoid robots outperformed reducers across the board. Over the past 30 days, humanoid robots were still positive (+2.74%), while reducers had already turned negative. **Both are falling, but one is pulling back from a high, while the other remains persistently weak.**

**2. Capital scale**

![](../../../assets/blog-45-serenity-qveris-4.jpg)

The gap widens here: on June 12 alone, humanoid robots recorded RMB 438.7 billion in turnover, while reducers had only RMB 74.6 billion, a difference of nearly 6x. Over the past five days, humanoid robots accumulated just over RMB 2 trillion in turnover, while reducers had about RMB 390 billion, still more than a 5x gap. **Both are in correction, but one is falling on massive volume while the other is sliding on shrinking volume. In the humanoid robotics pullback, liquidity has not left at all.**

**3. Attention**

![](../../../assets/blog-45-serenity-qveris-5.jpg)

Humanoid robots had total popularity of 14.03 million over the past week, ranking 23rd across the whole market. Its absolute heat remains firmly at the top. Reducers had only 2.66 million and ranked 147th, a full tier lower in absolute scale. But the interesting part is that reducers are quietly warming up: total popularity rose +8.29% week over week, versus only +2.16% for humanoid robots; search heat rose +16% week over week, versus +4% for humanoid robots. **One is already at a high level and holding attention; the other is still an overlooked low-base theme, but search volume is starting to ignite.**

Read the three tables together, and you get exactly the kind of signal the Serenity method cares about most: **only when the tide goes out can you see who is moving**. Humanoid robots show “price down, but attention stable and liquidity still present”: a correction is a correction, but money and attention are still in the market. Reducers show “price down, but search heat rising quickly”: the absolute level is still cold, but some people have begun quietly looking at it from a low base. The former is an obvious strong track. The latter is an incubating position worth watching to see whether attention can turn into buying. Which one has been mistakenly sold off, and which one is building momentum? The data gives clues, but the answer requires more digging.

![](../../../assets/blog-45-serenity-qveris-6.jpg)

**The first two steps are now complete: we have the target, namely precision transmission, force control, and mass-production yield; we have the map, a six-layer supply chain; and we have used real-time data to understand the market stage. Next, go deeper into the chain.**
## An easily overlooked detail: the data itself must also be verified

When pulling sector data, you will encounter a trap most people never think about: **the same concept may refer to completely different sets of stocks across different data sources.** “Robotics,” “humanoid robots,” and “robot actuators” may be classified into different sectors on different platforms. Their constituents differ, so the calculated performance and turnover differ as well. If the data definitions are misaligned, even rigorous reasoning leads to the wrong conclusion.

This is exactly what QVeris handles at the invocation layer: every data result shows which vendor it came from, what definition it uses, its historical success rate, latency, and cost through Inspect. **The same number can also be cross-checked with another data source.** The last step in the Serenity method is to avoid fooling yourself. But before that, you first have to stop the data from fooling you.
## Steps 3 to 5: drill down from the track to individual stocks

Once the track is clear, the real research begins: drilling down to individual stocks. Along core links such as reducers, screws, motors, and sensors, the next tasks are to identify which stocks have seen sustained recent capital inflows, screen from that group for smaller market caps with moderately rising turnover, and then check upcoming lock-up expirations over the next three months and recent discounted block trades one by one. **QVeris can query these datasets too. Just ask in Chinese.**

This is where the fifth step of Serenity’s method appears: “repeatedly test with evidence, and do not be fooled by surface-level excitement.” Remember the massive turnover in the humanoid robotics sector shown earlier? Pull out capital flows, and you find that over the past five trading days, main funds were actually net sellers, with about RMB -41.7 billion in net outflows, and only one of those five days had a net inflow. High volume does not mean main funds are buying. The excitement in turnover and the true attitude of capital may be two different things. You cannot see this layer by looking only at performance and turnover. You have to keep digging into the data.

But at the individual-stock layer, we will not run the screen for you or list specific names. There are two reasons. First, the screened list is research working material, not an answer. Which companies to study and how to judge them must be run and concluded by you. Second, this article is only a method demo and does not recommend any individual stock. Finally, do not forget to write down the falsification conditions: what signal would invalidate the whole thesis?
## Final thoughts

After running this exercise, one thing is clear: **a stock oracle’s method can be packaged into all kinds of products, but the workflow behind the method is open.** What is truly valuable in this workflow is not “checking faster.” It is that every step can be checked, matched, and reviewed. The conclusion may be wrong, but the working notes must be clean.

In the past, doing this seriously took at least an afternoon, so most people chose not to do it and simply copied the answer. That is why “stock oracles” will always have a market.

But now, on the reasoning side, this generation of models has put the capability into everyone’s hands. **On the data validation side, QVeris connects 10,000+ tools into an entry point you can query in Chinese.** For the first time, “seeing what others have not seen” no longer depends only on talent and information asymmetry. It depends on whether you are willing to run all five steps.

### Get started with QVeris in three steps

1. Open qveris.cn and enter the Live Demo

2. Ask directly in Chinese in the chat box, for example: “查一下人形机器人板块近5日主力资金净流入”

3. QVeris automatically finds the data source, invokes it, and returns structured results

Want to connect it into your own agent workflow? QVeris also provides an MCP Server, CLI, and REST API. Give it to Claude or Cursor and connect in 30 seconds.

**Risk notice:** This article is only intended to demonstrate an AI investment research workflow and does not constitute any investment advice. The sectors and data mentioned are for method demonstration only, and no individual stock is recommended. Serenity’s returns, identity, and market influence are disputed in public discussion. Markets involve risk, and investment decisions require independent judgment.
