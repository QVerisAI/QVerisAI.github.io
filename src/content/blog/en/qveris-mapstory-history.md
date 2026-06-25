---
title: 'From Armchair Strategy to Spatiotemporal Exploration: How QVeris Empowers MapStory to Reinvent Historical Storytelling'
description: 'How QVeris empowers MapStory: moving from armchair strategy to spatiotemporal exploration, using agents to reshape historical storytelling.'
pubDate: 'Mar 13 2026'
heroImage: '../../../assets/blog-qveris-mapstory-history-1.png'
category: 'Product'
author: 'QVeris Team'
tags: ['mapstory', 'qveris', '案例']
translationKey: 'qveris-mapstory-history'
---

## Rereading History Through Maps: This AI Tool Makes the Life Journeys of Li Bai and Su Shi Instantly Visible

"If Li Bai had location sharing on social media, what would his footprint map look like?"

When we read, "Above Mount Emei, an autumn half-moon; its shadow flows into the Pingqiang River," have we ever wondered which cities the 24-year-old Li Bai passed through when he left Shu?

When we recite, "Ask me about my life's work: Huangzhou, Huizhou, Danzhou," have we ever considered what kind of painful journey lies hidden in the route map of Su Shi's exiles?

A project called MapStory can now generate footprint maps corresponding to lines of poetry. Here are a few examples:

"Above Mount Emei, an autumn half-moon; its shadow flows into the Pingqiang River."

![qveris-mapstory-history-1](../../../assets/blog-qveris-mapstory-history-1.png)

"Ask me about my life's work: Huangzhou, Huizhou, Danzhou."

![qveris-mapstory-history-2](../../../assets/blog-qveris-mapstory-history-2.png)

"East of the Pass, righteous men rise in arms to punish the villains."

![qveris-mapstory-history-3](../../../assets/blog-qveris-mapstory-history-3.png)

MapStory uses a spatial narrative logic built around "people, time-space, and events" to rediscover the life trajectories of historical figures from a geographic perspective.

So how does it work?

## MapStory: Bringing Historical Figures to Life on the Map

MapStory is a historical-figure footprint visualization system based on large language models. Enter "Li Bai," and 3-10 minutes later you receive an interactive map marking several key cities he visited, his age at the time, and the poems or historical events associated with each place.

Its core logic is clear: it follows the thread of "person, time-space, and event." Rather than simply extracting a passage of text, it uses spatial storytelling to let users intuitively see the geographic distribution of a historical figure across different stages of life.

## MapStroy's System Logic

## In-Depth Biographical Research (LLM-Generated)

It calls an LLM to generate a biography, intelligently extracting key places and events without requiring manual organization of massive volumes of historical material.

When a user enters "Su Shi," MapStory first calls a large language model (LLM) to scan his complete life story and accurately extract 6-20 key life nodes. Each place is no longer an isolated coordinate, but a structured node carrying specific events, the figure's age, and historical significance.

## Precise Geocoding (Core Enablement by QVeris)

This is a critical part of the project. There is a huge gap between historical place names, such as "Danzhou" or "Youzhou," and modern coordinates. By connecting to QVeris's unified interface, MapStory can call its powerful geocoding services.

- One-click integration: There is no need to integrate with complex third-party map APIs. Through QVeris, developers can directly call Amap tools and public geospatial services.
- Coordinate conversion: Ambiguous historical place names are resolved into precise latitude and longitude data, creating a solid foundation for visualization.

## Data Integration

Places, ages, and events are organized into structured data, establishing a three-dimensional association among time, space, and events.

## Map Visualization

Interactive maps are rendered with Leaflet, supporting three modes: route display, pop-up details, and timeline browsing.

## Biography Output

MapStory automatically generates Markdown+HTML documents containing a figure overview, complete footprint, and historical influence.

## QVeris: The Native Unified Data Interface for Agents

The successful implementation of MapStory proves QVeris's core value: turning AI from something that can "answer" into something that can "execute."

Today's AI is smart, but it often cannot see or touch the real world. QVeris packages real-world data, such as finance, search, social, and geospatial information, together with professional tools into "capability plugins" that AI can call directly.

- Unified interface: Developers no longer need to research, purchase, and integrate hundreds or thousands of expensive and complex APIs.
- Second-level calls: Applications like MapStory only need to connect to QVeris to instantly gain the ability to process geospatial information and retrieve professional data.
- Foundational support: QVeris provides the underlying logic for agent automation, giving AI the "hands and feet" it needs to interact with the real world.

## Who Is Looking Forward to MapStory and QVeris?

This combination of "AI + real data" is already changing multiple industries:

- History education: Teachers no longer need to rely only on lectures. Footprint maps can show a poet's life journey, helping students intuitively feel the "weight of geography."
- Literary and historical research: Massive volumes of text can be converted into visual distribution maps with one click, helping scholars analyze patterns of geographic migration.
- Cultural tourism planning: Theme routes such as "Traveling the Great Song with Su Shi" can be planned quickly.

## Conclusion

StoryMap's value lies in rediscovering the life trajectories of historical figures through a spatial perspective. When we see the line connecting Su Shi from Bianjing to Huangzhou, Huizhou, and Danzhou, the words in textbooks suddenly gain geographic weight. When we zoom in on Li Bai's route out of Shu, we can better understand the rushing waters behind the line, "The cries of monkeys on both banks do not cease."

MapStory's GitHub repository👇

https://github.com/cuizicheng1024/map_story

If you care about how AI can be put into real use and how process automation can be achieved, QVeris is the essential layer of infrastructure connecting the "digital brain" with the "real physical world." Giving AI the ability to execute starts with QVeris.
