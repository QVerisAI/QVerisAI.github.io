---
title: 'Agent Plugins 1.0 Is Here: Write Once, Distribute Everywhere'
description: 'On August 5, 2026, Agent Plugins 1.0.0 shipped: a portable directory format that packages Agent Skills and MCP servers, so the same extension can be discovered and loaded across different clients.'
pubDate: 'Aug 9 2026'
heroImage: '../../../assets/blog-agent-plugins-1-0-release-1.png'
category: 'Engineering'
author: 'QVeris Team'
tags:
  - Agent Plugins
  - MCP
  - Agent Skills
  - QVeris
translationKey: agent-plugins-1-0-release
---
# Agent Plugins 1.0 Is Here: Write Once, Distribute Everywhere

![Promotional image for the Agent Plugins 1.0 release: a dark blue, tech-infused background with glowing connecting lines and nodes. The image clearly highlights the core theme "Agent Plugins 1.0 发布", names the publishers Vercel, AWS, OpenAI, Microsoft, and GitHub, and explains the core value "一次编写，多处分发" — the specification packages Agent Skills and MCP servers into a portable directory that can be distributed across Codex, Cursor, Copilot, and VS Code, with "2026·技术观察" marked in the lower right.](../../../assets/blog-agent-plugins-1-0-release-1.png)

On August 5, 2026, Agent Plugins 1.0.0 was officially released. The specification was initiated by Vercel, with AWS, Anysphere, GitHub, Microsoft, and OpenAI joining in. On launch day, five categories of clients — ChatGPT, Codex, Cursor, GitHub Copilot, Kiro, and VS Code — pledged their support. What it does can be summed up in one sentence: it packages Agent Skills and MCP servers into a portable directory format so that the same extension can be discovered and loaded across different clients.

## It Solves a Very Real Pain Point

Every agent client has its own plugin format. For the same SKILL.md, an author has to maintain one copy for ChatGPT, another for Cursor, and yet another for VS Code — even though the package contains the same thing. Anyone who has built multi-client integrations has lived through this repetitive grind.

Agent Plugins' approach is to define a minimal interoperability floor: one directory, one plugin.json, and fixed component locations. Distribution, installation, permissions, and experience are explicitly out of scope, left to each client.

```text
deployment-assistant/
├── plugin.json
├── skills/
│   └── deploy-service/
│       ├── SKILL.md
│       ├── scripts/
│       └── references/
├── mcp.json
└── com.example.client/
    └── hooks/
```

The minimal manifest requires only two fields: `$schema` and `name`. Everything else is left to the client to figure out — a restraint that is entirely deliberate.

## Design Choices Worth Noting in the Specification

### Packaging Only Two Component Types, Without Changing Their Native Formats

v1 covers only Agent Skills and MCP servers. Skills keep the exact Agent Skills format (the rules for frontmatter, scripts/, and references/ stay unchanged), and MCP behavior fully follows the MCP specification. Agent Plugins only tells clients "where to look."

For concepts like commands, hooks, sub-agents, LSP, and settings, the semantics and security models across vendors have not converged yet, so v1 deliberately leaves them out and instead places them under each client's reverse-domain namespace (for example, `com.example.client/`), instructing other clients to ignore them. This decision sidesteps the least productive argument: rather than fighting over a grand unification that nobody would actually implement, it is better to lock in what is already mature.

### Failure Isolation Is Specified at a Surprisingly Fine Granularity

A broken MCP entry disables only that one server; a non-conforming SKILL.md skips only that one skill; but if the plugin.json manifest as a whole is invalid, the entire plugin is rejected and no component runs. Anyone who has done integrations understands what this precision means: the scariest failure is a half-loaded MCP whose symptoms are nearly impossible to track down.

### Security Rules Govern Only the Files Inside the Plugin Package

Paths must stay within the plugin root — `../bin/server` is illegal; the cwd must be a relative path starting with `./`; stdio child processes receive the `PLUGIN_ROOT` and `PLUGIN_DATA` environment variables, and placeholders can only be expanded in args/env/cwd; remote MCP endpoints on non-loopback addresses must use HTTPS; configured headers must not be forwarded on cross-origin redirects; and clients must not fetch schemas over the network when loading a plugin.

These rules govern the files inside the plugin package, but they do not constrain what the plugin process itself can do. For example, an MCP server can contain a `subprocess.run(os.environ)` call, and the specification does not care — it was never meant to.

## The Broader Agent Extensibility Ecosystem

Looking only at Agent Plugins makes it easy to miss the bigger picture. It is one piece of a much larger interoperability puzzle, and each layer has a corresponding specification or responsible party:

| Concern | Primary question | Responsible party |
|-|-|-|
| Reusable instructions | What procedural knowledge can an agent reuse | Agent Skills (proposed by Anthropic, now the agentskills.io standard) |
| Runtime connection | How an agent connects to tools and context | MCP |
| Packaging | How reusable components are bundled into a package | Agent Plugins |
| Cross-ecosystem discovery | How clients and users find packages | Catalog / Registry (efforts such as ARD and AI Catalog) |
| Trust and execution | What can be trusted and run | Publishers, provenance verification, client policies |

This layering is, in my view, the most important point of this round of standards: agent interoperability is not a single problem, and any one specification trying to own it all would fail. Agent Plugins only touches "packaging," MCP only handles "interconnection," ARD/AI Catalog handle "discovery," and trust stays with "the people installing and the clients running." Each layer can evolve independently.

## The Governance of the Standard

Whether a standard survives often comes down to governance more than technical detail. Agent Plugins' Technical Steering Committee is five named individuals: Clare Liguori of Amazon, Roshan Sadanani of Cursor, Harald Kirschner of Microsoft, Gav Verma of OpenAI, and Jonathan Hefner of Vercel (Lead). Three clauses in the charter stand out:

- No single vendor can hold a majority of Core Maintainer seats;
- Governance roles are held by individuals, not reserved for companies;
- The project name, logo, domain, and GitHub organization are hosted by a neutral entity designated by the committee; no vendor can own them exclusively.

The repository was initially incubated in vercel-labs and later moved to the independent agentplugins organization; the specification text is CC-BY-4.0 and the code is Apache-2.0. Even if the neutrality commitment ever fails, the entire project is forkable and cannot be locked in by any single vendor. That is far stronger than the "press release plus empty repo" playbook.

## Three Issues We Must Face Honestly

### First, the Trust Model Is Absent for Now

v1 explicitly does not define: a trust model, permission system, or sandbox; provenance verification (no signing, no attestation); credential handling (the spec forbids credentials in env and headers but offers no portable alternative); enterprise controls (allowlists/blocklists, organization-level registries, centralized policy); audit logs; or inter-plugin dependencies.

For someone writing code, this means: installing an Agent Plugin is equivalent to running code with no declared permissions, and whether it is safe depends entirely on which client you install it in and what permission controls that client happens to provide. When enterprises evaluate agent products, the three questions that still matter most are: can I export what I taught it; who decides what it can touch; and can I test it against my own historical data first. A portable package cannot solve "non-portable consequences."

This is expected to be addressed in a future release.

### Second, Anthropic Is Not on Board

Claude Code is the most active place for plugin creation in the real world right now, and the Agent Skills concept itself was proposed by Anthropic — yet Anthropic is not in the launch list, and Claude Code is not among the launch clients. The two formats are close but not compatible:

| Component | Agent Plugins 1.0 | Claude Code plugins |
|-|-|-|
| Manifest path | plugin.json | .claude-plugin/plugin.json |
| MCP config | mcp.json | .mcp.json |
| Skills | skills/ | skills/ |
| Sub-agents | Not covered | agents/ |
| Hooks | Not covered | hooks/hooks.json |
| LSP / settings | Not covered | .lsp.json / settings.json |

These are file-path differences — the most fixable kind of incompatibility. A plugin can carry both manifests without too much trouble, but until someone does that, authors targeting both ecosystems still have to maintain two layouts — which is exactly the problem this standard aims to eliminate. Worth watching: when Claude Code aligns the plugin.json and mcp.json locations, and whether v1.1 brings agents/ and hooks/ into the portable components.

### Third, Multi-Distribution Does Not Mean Identical Behavior

A SKILL.md can move cleanly between two clients, but that does not mean an agent behaves consistently across them. Tool permissions differ, models differ, and system prompts differ — so results differ. A portable package lowers assembly cost, not ownership cost; it does not answer whether "this skill is actually good in my environment."

## What This Means for Tool and Service Builders

If you build tools, data services, or internal agent integrations, Agent Plugins' near-term practical impact comes down to two things.

First, package formats are beginning to converge, but integration paths remain fragmented. What the specification unifies is "how to put Skills and MCP into a package," not "how clients discover and trust the package." So MCP servers still have to maintain their own discovery paths and credential policies — and capability providers like QVeris are no different: no matter which plugin format a client eventually adopts, the server-side integration contracts (MCP, REST, SDK) are the truly stable part.

Second, the answer to permission questions lives not in the specification but in the client. When choosing agent tools, treat "supports Agent Plugins" as a modest plus; the real question is what the things you install can actually touch. The answer differs across clients, and it will not be unified by a single specification anytime soon.

<callout emoji="✅">
**A practical takeaway:** when writing a new extension, package it according to the Agent Plugins directory structure and put client-specific parts into reverse-domain namespaces; when choosing tools, keep asking about permission boundaries first. The packaging format is unified — the war over distribution channels is just beginning.
</callout>

## Three Things Worth Watching Next

1. **Whether v1.1 fills in the permission and trust model.** If the next version ships with capability declarations, signing, and sandbox boundaries, Agent Plugins upgrades from a "distribution format" to a "distribution-plus-trust protocol"; if it keeps dragging its feet, it will remain a zip format, with each client telling its own security story.
2. **Whether Anthropic converges.** The two file-path gaps plus the size of the Claude Code ecosystem will decide whether this format becomes a de facto standard or just another A/B split.
3. **Who becomes the "npm of plugins."** The specification explicitly does not build a registry, leaving the marketplace layer to third parties. Smithery and Microsoft's Agent Governance Toolkit Plugin Marketplace are both competing for that position.

## Closing Thoughts

Agent Plugins 1.0 is a "small, right thing": unify the packaging boundary first, then extend component types; let the standard land first, then let semantics converge. Compared with an omnibus blueprint that tries to define everything and never ships, this deliberately small specification is far more likely to be truly embraced by the ecosystem.

But do not mistake "format unification" for "security unification." The specification is clear: it solves distribution, not trust. For those of us building agent tools and data services, taking that boundary seriously matters more than chasing any new specification.

---

## References

- [Agent Plugins official website and specification](https://agent-plugins.org/)
- [Agent Plugins 1.0.0 specification](https://agent-plugins.org/specification/)
- [Agent Skills standard](https://agentskills.io/)
- [MCP specification](https://modelcontextprotocol.io/)
- [QVeris documentation](https://qveris.ai/docs)
- [QVeris REST API documentation](https://qveris.ai/docs/rest-api)
