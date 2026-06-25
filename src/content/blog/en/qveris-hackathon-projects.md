---
title: '4 Hours, 10 Agent Projects: A Closer Look at the Winners'
description: 'The full QVeris hackathon recap: 10 Agent projects built in 4 hours, with a project-by-project look at the winners.'
pubDate: 'Mar 13 2026'
heroImage: '../../../assets/blog-qveris-hackathon-projects-1.jpg'
category: 'Announcement'
author: 'QVeris Team'
tags: ['黑客松', 'qveris', '案例']
translationKey: 'qveris-hackathon-projects'
---

Last Sunday, at the offline hackathon hosted by **QVeris Friends × Origin Academy**, nearly 100 developers, product managers, and creators built and shipped 10 AI Agent projects in just **4 hours**.

We saw financial Agents that could gather data and analyze markets on their own; multimodal Agents that let users create with gestures alone; dashboard Agents that connected more than a dozen real APIs into a working product...

Below, we will focus on **four award-winning Agent projects, with detailed introductions and GitHub links.**

## 🏆
## QVeris Special Award
##
### LOF Fund Arbitrage Data Analysis System（funds_advice）
This project **hands a real financial analysis workflow over to an Agent for automated execution**.

Built around LOF fund arbitrage scenarios, it addresses a practical problem: **fund data, news, and policy information are scattered across sources, making manual analysis costly.**

Powered by CC（Claude Code）, the system automatically retrieves information through **QVeris Skill + Web Fetch**, including:

- Core LOF fund data
- Market news and policy events
- External information sources such as Jisilu

The Agent performs analysis according to predefined prompts, organizes the results into **structured JSON** for the backend, and the frontend displays the arbitrage analysis conclusions with clear investment risk labels.

The process is not a chat-style “suggestion.” It is a complete and traceable **Agent action loop**: **data retrieval → analysis → result presentation → risk disclosure**.

By running on real financial data and policy information, the project delivered an executable investment analysis Agent loop. It demonstrates the potential of Agents in **complex data integration and decision-support scenarios**.

***👉https://github.com/QverisFriends/funds_advice***

![qveris-hackathon-projects-1](../../../assets/blog-qveris-hackathon-projects-1.jpg)

![qveris-hackathon-projects-2](../../../assets/blog-qveris-hackathon-projects-2.png)

![qveris-hackathon-projects-3](../../../assets/blog-qveris-hackathon-projects-3.png)

![qveris-hackathon-projects-4](../../../assets/blog-qveris-hackathon-projects-4.jpg)

![qveris-hackathon-projects-5](../../../assets/blog-qveris-hackathon-projects-5.jpg)

![qveris-hackathon-projects-6](../../../assets/blog-qveris-hackathon-projects-6.jpg)

> ⚠️ Project disclaimer: For learning and entertainment purposes only. This does not constitute any investment advice.

---

### QVeris Smart Life Dashboard（qveris-dashboard）
This is a **super demo built to explore the boundaries of QVeris capabilities**.

Using a modern glassmorphism dashboard as the interface, the project runs more than ten categories of real capabilities on a single page through the **QVeris unified tool-calling interface**, including:

- 🌤️ Weather, air quality, and location queries
- 📈 Stock quotes, multi-period candlestick charts, and market sentiment
- 📰 Real-time news, cryptocurrency updates, and Hacker News
- 🤖 AI chat, image generation, speech synthesis, and video generation
- 🔍 QVeris API Explorer（search and test real tools）

Behind every module is a complete **Agent → tool → real-time data → visual feedback** loop, rather than a static display.

One especially notable feature is the built-in **QVeris API Explorer**: users can directly search platform tools, view success rates and response times, and invoke real tools with one click, **turning “Agent infrastructure” itself into an interactive product**.

Through dense, multimodal API calls, the project visualizes QVeris action capabilities as an immediately tangible system-level demo. It clearly shows the breadth of what Agents can do when they “**move at the same time**.”

***👉https://github.com/QverisFriends/qveris-dashboard***

![qveris-hackathon-projects-7](../../../assets/blog-qveris-hackathon-projects-7.jpg)

![qveris-hackathon-projects-8](../../../assets/blog-qveris-hackathon-projects-8.jpg)

## 🎨
## Just For Fun: Most Interesting Award
##
## Magic Art Workshop（Magic Art）
This is a **multimodal creative Agent project** with a very direct goal: **complete AI creation using only gestures and voice, without a keyboard or mouse.**

The project is based on a “frontend perception + cloud Agent” architecture:

- The browser uses **MediaPipe Hands** to recognize gestures locally in real time（no video upload required, protecting privacy）
- The cloud side is based on **QVeris Agent System**, dynamically dispatching search, speech, drawing, and other tools according to intent
- A fallback mechanism is supported to keep generation stable

The creative workflow is fully orchestrated by the Agent:

- ✊ Make a fist to input ideas by voice
- 🖐️ Open your hand to explore inspiration trends
- ✌️🤘🤟 Inject different artistic styles
- 👌 Confirm and generate the final work

![qveris-hackathon-projects-9](../../../assets/blog-qveris-hackathon-projects-9.png)

![qveris-hackathon-projects-10](../../../assets/blog-qveris-hackathon-projects-10.png)

![qveris-hackathon-projects-11](../../../assets/blog-qveris-hackathon-projects-11.png)

The user is only responsible for expressing intent, while **the Agent organizes the prompt, calls the model, and executes the creation**.

The interaction, experience, and creative idea are highly intuitive. It does not need much explanation: once demonstrated, its appeal is immediately clear.

It proves one thing: Agents do not always have to be “heavy.” **Lightweight, fun, and perceptible experiences matter just as much.**

***👉https://github.com/QverisFriends/MagicArt***

## **🏆**
## **The Best PMF: Most Commercial Potential Award**
**SkiCoach AI**
This is a super demo built to “explore the boundaries of AI-powered ski instruction.” Using a lightweight web-based interaction model, the project combines a **multimodal large model + professional skiing knowledge base + real-time ski resort data interfaces** to run a full range of skiing assistance capabilities in one system, including:

- ❄️ Real-time ski resort weather, snow condition analysis, and pre-trip gear recommendations
- 🏂 Snowboard / ski movement recognition, multi-stage technical diagnosis, and personalized correction reports
- 📊 Step-by-step training goals, movement progress curves, and in-depth conversational review
- 🎯 Beginner / intermediate / advanced instruction, targeted movement libraries, and risk warnings

Behind every module is a complete **user upload → AI analysis → professional output → interactive follow-up** loop, rather than a static collection of technique articles. One especially notable feature is the built-in **tiered training system**:

By combining multimodal movement recognition with a professional knowledge base, the project visualizes the companionship capabilities of an AI coach as an immediately tangible system-level demo. It clearly demonstrates the depth of AI in personalized sports instruction scenarios.

![qveris-hackathon-projects-12](../../../assets/blog-qveris-hackathon-projects-12.png)

![qveris-hackathon-projects-13](../../../assets/blog-qveris-hackathon-projects-13.png)

![qveris-hackathon-projects-14](../../../assets/blog-qveris-hackathon-projects-14.png)

![qveris-hackathon-projects-15](../../../assets/blog-qveris-hackathon-projects-15.jpg)

![qveris-hackathon-projects-16](../../../assets/blog-qveris-hackathon-projects-16.jpg)

## **Final Notes**

There were only a limited number of awards, but that does not mean the other projects were not good enough. On the contrary, precisely because **everyone completed an Agent action loop**, these awards simply highlighted strengths in different directions.

If this hackathon leaves behind one shared conclusion, it is this:

> **In the Agent era, ideas are not in short supply. What is becoming scarce is action completeness.**

Want to keep seeing how QVeris AI lands in real-world use cases? Join us at the next hackathon as we unlock more possibilities across vertical Agent scenarios.

QVeris AI is continuously recruiting partners for its co-creation camp. We look forward to having you join us👇
![qveris-hackathon-projects-17](../../../assets/blog-qveris-hackathon-projects-17.jpg)
