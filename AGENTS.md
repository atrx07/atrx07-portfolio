# AGENTS.md — ATRX Portfolio

## 1. Mission

Build a polished, highly interactive personal portfolio for **Arppith Andrews (`atrx07`)**.

This must not feel like a generic developer template with a name swapped in. It should feel like entering a compact software control room built by someone who enjoys local AI, real-time systems, automation, unusual browser tools, and experiments that escape the “small side project” phase.

The page should hook visitors through meaningful interaction, technical depth, personality, and fast visual feedback. It must still be easy for a recruiter to scan in under two minutes.

Core idea:

> **Useful systems at the edge of practical and unusual.**

Supporting identity lines:

- **Built from scratch. Shipped from chaos.**
- **I build local AI software, real-time applications, and bots with memory.**
- **Build it, test it on the real target, then keep refining.**

Do not build a conventional “hero → cards → contact” page and call it finished. The final result should behave like a small interactive product.

---

## 2. Public profile summary

Use this concise public-facing profile as the source of truth:

- **Name:** Arppith Andrews
- **Handle / brand:** `atrx07` / `ATRX`
- **Role:** Engineering student focused on Computer Science, AI, and automation
- **Location:** Kerala, India
- **Primary interests:**
  - local AI and native desktop systems
  - real-time web applications
  - AI agents, bots, automation, and persistent memory
  - developer tools that make complicated workflows feel simple
  - security experimentation and practical systems testing
  - music technology, keyboards, MIDI, and browser audio tools
- **Current direction:** building dependable local-first AI software and exploring native orchestration, memory, model runtimes, real-time infrastructure, and human-friendly interfaces
- **Working style:** prototype quickly, test on real hardware or real users, inspect failures, and repeatedly refine
- **GitHub:** https://github.com/atrx07
- **Profile README:** https://github.com/atrx07/atrx07
- **Public contact email:** arppithandrewsee@gmail.com

### Privacy rules

Do **not** publish or infer:

- age or date of birth
- phone number
- exact home address
- family details
- grades, legal matters, private conversations, or health information
- private repository contents
- API keys, environment values, tokens, session files, or local filesystem paths

Do not expose the name of the user’s college unless it is later added explicitly to the portfolio content by the user.

`Cecilia Bot` is a private repository. It may be mentioned only as a short private experiment if the user has already included it in supplied public content, but it must never receive a repository link, screenshots, implementation details, or claims not already public.

---

## 3. Repository and project sources

Treat the following GitHub repositories and their READMEs as source material. Inspect them before finalizing project copy when network or GitHub access is available.

### Primary featured work

1. **NeuraLoc-Core**  
   https://github.com/atrx07/NeuraLoc-Core

2. **void.chat**  
   https://github.com/atrx07/void-chat

3. **Aveline Bot**  
   https://github.com/atrx07/aveline-bot

4. **StyleForge Lite**  
   https://github.com/atrx07/styforge

5. **SecureScope**  
   https://github.com/atrx07/securescope

6. **AtrxInstaDown**  
   https://github.com/atrx07/atrxinstadown

### Additional experiments / repository shelf

- https://github.com/atrx07/aveline-dashboard
- https://github.com/atrx07/python-http-load-tester
- https://github.com/atrx07/instagram-session-generator
- https://github.com/atrx07/insta_cli
- https://github.com/atrx07/Telegram-beep-bot
- https://github.com/atrx07/Basic-python-script-templates
- https://github.com/atrx07/claudedesignskills

### Recent non-featured experiments worth mentioning as lab notes

These may not all have a public repository. Do not invent links.

- an Electron/Node desktop app for Discord Rich Presence with coding, music, terminal, idle, and GitHub activity states
- an Android companion / mobile Rich Presence experiment using Android Studio and wireless ADB
- call-screening AI workflow testing and QA
- local LLM orchestration experiments with `llama.cpp`, GGUF models, Qwen, durable conversation branches, prompt/version management, and local-first design
- small security labs and controlled network experiments performed only in owned/local environments

If a claim cannot be verified from a repository, supplied content, or a clear local project file, present it as an **experiment** rather than a shipped production product.

---

## 4. Accurate project content

Use the following facts. Improve the writing, but do not inflate the claims.

### NeuraLoc-Core — flagship / “Currently building”

A privacy-first Windows desktop application for discovering, managing, and running local AI models through verified native inference engines.

**Stack**

- React
- TypeScript
- Tauri 2
- Rust
- SQLite
- `llama.cpp`
- GGUF

**Implemented or verified capabilities**

- local GGUF indexing
- verified pinned `llama.cpp` Windows runtime
- owned model launch / stop lifecycle
- bounded streaming chat
- exact model-tokenized rolling context admission
- conservative CPU-route memory-fit estimates
- versioned prompt library
- durable SQLite conversation history
- conversation branching and retry-in-new-branch
- provenance-preserving Markdown export
- a real Qwen3 4B GGUF local load / count / stream / cancel / stop test

**Narrative**

Frame this as Arppith’s strongest engineering case study: native boundaries, process ownership, privacy defaults, durable state, model provenance, context accounting, hardware constraints, and the difference between a flashy local-AI demo and a dependable desktop control center.

Do not imply that every roadmap item is complete. Clearly separate **available now**, **in progress**, and **next**.

### void.chat

A real-time global chatroom using:

- Firebase authentication
- Cloudflare Pages
- Cloudflare Workers
- Durable Objects
- D1
- WebSockets

Key engineering point: messages are persisted in D1 while a Durable Object maintains live WebSocket connections and broadcasts updates in real time. Mention admin controls only as a secondary detail.

### Aveline Bot

A WhatsApp AI chatbot with:

- persistent per-user memory via Upstash Redis
- mood-aware responses
- group-chat mention / reply behavior
- Groq model fallback
- multiple-key rotation and resilience handling
- Railway deployment
- Baileys integration

Describe it as an experiment in personality, state, memory, and resilient inference—not as a sentient entity.

### StyleForge Lite

A static, mobile-first Yamaha arranger style sketchpad with:

- drum-grid and piano-roll editing
- WebAudio preview
- project save/load as JSON
- MIDI export
- experimental Yamaha `.STY` generation
- PSR-E / XG mapping work
- CASM-aware experiments and real-hardware testing

This is an excellent “unexpected engineering” project because it connects browser UI, music, binary formats, MIDI, reverse engineering, and hardware verification.

### SecureScope

An AI-assisted web and code security review interface with OWASP-style reporting.

Important honesty rule: its README explicitly says it is **not a real scanner engine**. Label it as an AI-assisted analysis prototype. Never present its generated findings as deterministic vulnerability proof.

### AtrxInstaDown

A lightweight installable mobile/PWA interface for a no-login Instagram media downloader workflow.

Focus on the mobile-first interaction and installable web-app experience. Avoid claiming official Instagram affiliation.

---

## 5. Product goals

The website should satisfy three visitor types without splitting into separate websites.

### Recruiter

Within 30 seconds they should understand:

- who Arppith is
- what he builds
- his strongest technical areas
- which project deserves attention first
- how to contact him

### Developer

Within a few minutes they should be able to inspect:

- architecture and engineering decisions
- project stacks
- real implementation proof points
- repository links
- constraints and trade-offs
- what is currently being built

### Curious visitor

They should discover:

- playful interactions
- a safe fake terminal
- small easter eggs
- optional sound interaction
- project architecture visualizations
- personality without losing clarity

The page must reward exploration but never punish visitors who simply scroll.

---

## 6. Technical foundation

Unless the existing repository clearly uses another maintained stack, use:

- **Vite**
- **React**
- **TypeScript** with strict mode
- **Tailwind CSS**
- **Framer Motion / Motion** for restrained animation
- **Lucide React** for icons
- **Vitest + React Testing Library**
- **Playwright** for at least one end-to-end smoke flow

Preferred package manager: preserve the lockfile already present. If starting fresh, use `pnpm` when available; otherwise use `npm`.

This should remain a static-deploy-friendly application suitable for Cloudflare Pages, Vercel, or GitHub Pages. Do not require a server to render the core portfolio.

### Optional packages

Use only when they genuinely improve the implementation:

- `cmdk` for the command palette
- `react-helmet-async` for metadata if needed
- `zod` for validating optional fetched GitHub data
- `clsx` / `tailwind-merge` for class composition

Avoid a dependency pile. Every package should justify its existence.

---

## 7. Typography and motion

When `DESIGN.md` is present, treat it as the source of truth for visual styling. Do not override it from this file.

### Typography

Recommended:

- display / body: Space Grotesk, Geist, Inter, or a clean system fallback
- code / system labels: JetBrains Mono, IBM Plex Mono, or a system monospace fallback

Do not make every line monospace. Reserve it for commands, labels, data, and technical details.

### Motion language

- purposeful, quick, and mechanical
- small spring movement on cards
- data lines that activate as sections enter view
- short masked reveals
- cursor reaction only on capable pointer devices
- no constant floating blobs
- no 5-second preload sequence
- no scroll hijacking

---

## 8. Required information architecture

Implement the following sections. Names can be stylized, but the information must remain obvious.

### A. Navigation / system rail

Include:

- ATRX wordmark
- section links
- “Open command palette” button
- GitHub button
- compact availability state
- mobile menu that remains genuinely usable

The nav should become more compact on scroll rather than disappearing entirely.

### B. Hero / entry console

The first screen should include:

- `ATRX / Arppith Andrews`
- one clear role statement
- a concise two-line value proposition
- primary CTA: explore projects
- secondary CTA: GitHub or contact
- a compact “currently building NeuraLoc-Core” status module
- optional tiny boot sequence such as:

```text
initializing portfolio shell...
loading local-first systems...
status: operational
```

Do not hide the actual hero content behind the animation.

Suggested main copy:

> I build local AI software, real-time applications, and bots with memory.

Suggested supporting copy:

> Engineering student turning ambitious ideas into systems that survive real users, real hardware, and repeated testing.

### C. Visitor mode switcher

Provide three modes:

- **Recruiter** — concise summaries, outcomes first
- **Developer** — expands architecture, constraints, and implementation details
- **Chaos** — playful microcopy, more easter-egg hints, same factual content

Rules:

- The mode must never hide essential navigation or contact information.
- Store the preference in `localStorage`.
- Default to a balanced mode or Recruiter mode on first visit.
- Mode changes should update copy density and optional details—not rebuild the entire DOM or create accessibility confusion.

### D. “Now building” flagship section

Create an immersive NeuraLoc-Core case study.

Include:

- product thesis
- status: active development
- architecture strip: React → Tauri IPC → Rust orchestration → SQLite / native runtime
- current capabilities
- engineering problems solved
- next milestone
- repository link
- an interactive architecture view where selecting a node explains its responsibility

Do not create fake live model speeds, fake download counts, fake user counts, or fake telemetry.

Static labels such as “local-first”, “network off by default”, and “durable history” are fine when grounded in project documentation.

### E. Featured project lab

Show at least these projects:

1. NeuraLoc-Core
2. void.chat
3. Aveline Bot
4. StyleForge Lite
5. SecureScope
6. AtrxInstaDown

Each project card must provide:

- name
- one-sentence description
- role / category
- stack
- maturity state (`active`, `shipped`, `experimental`, or `prototype`)
- one technical proof point
- repository link when public
- expandable case-study drawer or detail panel

Do not use fake laptop mockups for every card. Use diagrams, small UI fragments, repository imagery when available, or typography-led layouts.

Provide filters such as:

- Local AI
- Real-time
- Bots & automation
- Music tech
- Security experiments
- Web / PWA

Filters must be keyboard accessible and must not cause layout jumps that lose focus.

### F. Architecture playground

Create a section where visitors can select a project and inspect a simplified architecture diagram.

Minimum diagrams:

- NeuraLoc-Core
- void.chat
- Aveline Bot

The diagram can be built with semantic HTML/CSS/SVG. Avoid a large graph library unless necessary.

Interaction:

- hover / focus a node to see a brief explanation
- click a node to pin its explanation
- arrow-key support where practical
- reduced-motion fallback

### G. Safe portfolio terminal

Include a simulated terminal. It is a parser over a fixed command set, never an actual shell.

Required commands:

```text
help
about
projects
project neuraloc
project voidchat
project aveline
project styleforge
stack
now
contact
github
clear
mode recruiter
mode developer
mode chaos
whoami
```

Fun optional commands:

```text
atrx
chaos
sudo hire atrx
play signal
coffee
```

Requirements:

- command history with Up/Down
- tab completion for known commands
- visible help
- accessible input label
- no `eval`
- no command interpolation
- no network calls from arbitrary terminal input
- external links open only through an allowlisted command mapping

The terminal should be compact and optional, not the only way to access content.

### H. Experiment rack

Present smaller work as a tactile shelf, log, or stack rather than another identical grid.

Possible entries:

- Discord Rich Presence desktop app
- Android Rich Presence experiment
- HTTP load tester
- Instagram utilities
- Telegram automation
- call-screening QA experiments
- prompt / agent tooling

Clearly distinguish public repositories from unlinked experiments.

### I. Toolbox / capability map

Group capabilities by purpose, not by a giant logo wall.

Suggested groups:

- **Native & local AI:** Rust, Tauri, SQLite, `llama.cpp`, GGUF
- **Interfaces:** React, TypeScript, JavaScript, HTML, CSS
- **Automation & bots:** Node.js, Python, Baileys, Discord.js, Telegram tooling
- **Real-time & cloud:** Cloudflare Workers, Durable Objects, D1, WebSockets, Firebase, Railway, Upstash Redis
- **Hardware / media experiments:** WebAudio, MIDI, Yamaha SFF1 / CASM exploration, Android / ADB

Do not use skill percentage bars. They are arbitrary and unhelpful.

### J. About / operating principles

Keep this personal but brief.

Mention:

- engineering student
- AI / automation direction
- interest in building both useful and unusual systems
- comfort moving between native desktop, browser, bots, cloud infrastructure, and real hardware
- keyboard / music-tech interest as a human detail

Suggested principles:

1. **Local where it matters** — privacy and ownership are product features.
2. **Real targets beat perfect mockups** — test against hardware, users, and failure states.
3. **State should survive** — memory, history, retries, and recovery matter.
4. **Playfulness is allowed** — serious engineering does not require a lifeless interface.

### K. Contact / final transmission

Include:

- email CTA
- GitHub CTA
- copy-email button with feedback
- brief line about internships, collaboration, AI/automation work, and interesting engineering problems

Do not add a fake contact form unless it has a real delivery mechanism. A direct email action is preferable.

---

## 9. Retention and delight features

Implement enough of these to make the page memorable without damaging performance.

### Required

1. **Command palette (`Ctrl/Cmd + K`)**
   - navigate sections
   - open project details
   - switch visitor mode
   - open the interactive terminal
   - open GitHub
   - copy email

2. **Interactive project details**
   - architecture nodes
   - expandable engineering notes
   - project-specific micro-interactions

3. **Progressive discovery**
   - tiny system log messages as visitors explore
   - a “discovered X / Y systems” counter stored per session
   - never block content behind discovery

4. **One easter egg**
   - typing `atrx` outside inputs may briefly activate a harmless “signal mode”
   - alternatively support a command in the terminal
   - make it easy to exit

### Optional, encouraged

5. **User-triggered sound**
   - a tiny WebAudio four-step signal inspired by StyleForge / keyboard work
   - absolutely no autoplay
   - always show mute state
   - remember mute preference

6. **Mini “system map”**
   - projects as connected nodes by shared technologies
   - click a technology to highlight related projects

7. **Dynamic page title**
   - subtle title changes when the tab loses focus, e.g. `signal paused // ATRX`
   - keep it professional and avoid notification spam behavior

8. **Recruiter quick brief**
   - one-click copyable summary card
   - name, focus, flagship project, stack, availability, contact

Avoid gimmicks that create annoyance:

- fake loading screens
- forced audio
- custom cursor that harms usability
- impossible-to-dismiss modals
- excessive tilt
- every element animating forever
- hidden navigation
- fake terminal hacking visuals

---

## 10. Content voice

The writing should be:

- technically credible
- confident but not inflated
- curious
- lightly witty
- concise on the surface, detailed on demand

Good:

> A local-AI control center built around model ownership, durable history, verified runtimes, and hardware-aware limits.

Bad:

> Revolutionary next-generation AI ecosystem disrupting the future of intelligence.

Good:

> Started as a browser sequencer. Eventually required learning why Yamaha CASM behaves like the style file’s tiny bureaucratic brain.

Bad:

> World-class music production platform.

Use playful lines sparingly. Technical clarity wins.

---

## 11. Data model

Create a typed local data source, for example:

```ts
type ProjectStatus = "active" | "shipped" | "experimental" | "prototype";

type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  categories: string[];
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
  proofPoints: string[];
  constraints?: string[];
  architecture?: ArchitectureNode[];
  next?: string;
};
```

Keep project content in a dedicated file such as:

```text
src/data/profile.ts
src/data/projects.ts
src/data/commands.ts
```

Do not scatter important copy across components.

### Optional GitHub enrichment

The local data file is canonical and must render without GitHub API access.

Optionally fetch public repository metadata at build time or in a resilient client-side layer:

- stars
- forks
- last pushed date
- primary language

Rules:

- no token in client code
- no build failure when GitHub is unavailable or rate-limited
- cache results when possible
- clearly label timestamps
- never display zero as real data merely because a request failed
- do not make stars the main proof of quality

---

## 12. Component guidance

Suggested structure:

```text
src/
  app/
    App.tsx
    providers.tsx
  components/
    layout/
      Header.tsx
      MobileNav.tsx
      Section.tsx
      Footer.tsx
    hero/
      Hero.tsx
      BootStatus.tsx
      CurrentBuild.tsx
    modes/
      VisitorModeSwitch.tsx
    projects/
      ProjectCard.tsx
      ProjectGrid.tsx
      ProjectDetail.tsx
      ProjectFilters.tsx
      ArchitectureDiagram.tsx
    terminal/
      PortfolioTerminal.tsx
      terminalEngine.ts
    command/
      CommandPalette.tsx
    experiments/
      ExperimentRack.tsx
    skills/
      CapabilityMap.tsx
    ui/
      Button.tsx
      Badge.tsx
      Dialog.tsx
      Tooltip.tsx
  data/
    profile.ts
    projects.ts
    commands.ts
  hooks/
    useVisitorMode.ts
    useReducedMotion.ts
    useKonamiOrSignal.ts
    useLocalStorage.ts
  lib/
    analytics.ts
    github.ts
    cn.ts
  styles/
    globals.css
  tests/
```

This is a suggestion. Adapt to the existing codebase, but preserve clear boundaries.

---

## 13. Accessibility requirements

Accessibility is part of the design, not cleanup work.

Required:

- semantic landmarks and heading hierarchy
- skip-to-content link
- full keyboard navigation
- visible focus states
- dialogs trap focus and restore it correctly
- command palette and project drawers have accessible names
- every icon-only button has an accessible label
- status must remain understandable without relying on a single visual cue
- respect `prefers-reduced-motion`
- no scroll hijacking
- no hover-only essential information
- architecture nodes accessible by keyboard
- terminal input has instructions and a visible focus state
- optional sound is user initiated and can be muted

Test at 200% browser zoom.

---

## 14. Responsive behavior

The site must be excellent on:

- 360 px mobile
- 768 px tablet
- 1280–1600 px desktop

Mobile is not a reduced afterthought.

On mobile:

- project details may become full-screen sheets
- architecture diagrams may switch to stacked flow cards
- command palette remains available
- terminal remains usable without horizontal page overflow
- no tiny badge soup
- touch targets at least 44 px where practical
- disable pointer-follow effects

---

## 15. Performance requirements

Target:

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Rules:

- route-level or interaction-level lazy loading for heavy optional modules
- no WebGL unless a real need emerges
- optimize images and specify dimensions
- prefer CSS/SVG over video backgrounds
- keep initial JS sensible
- avoid layout shift
- no unbounded animation loops
- pause visual effects when the tab is hidden
- terminal and command palette should not load a huge framework

---

## 16. SEO and sharing

Provide:

- strong title and description
- canonical URL placeholder in a single config file
- Open Graph metadata
- Twitter/X card metadata
- JSON-LD `Person` and selected `SoftwareSourceCode` entries
- sitemap and robots file when appropriate
- meaningful favicon / mask icon derived from ATRX lettering or a geometric signal mark

Suggested title:

```text
Arppith Andrews (atrx07) — Local AI, Automation & Real-time Systems
```

Suggested description:

```text
Portfolio of Arppith Andrews (atrx07), an engineering student building local AI desktop software, real-time applications, automation, bots with memory, and unusual browser tools.
```

Do not claim professional titles, employment, awards, user counts, or production scale that are not documented.

---

## 17. Testing

At minimum, test:

### Unit / component

- terminal command parsing
- unknown-command response
- terminal history behavior
- visitor mode persistence
- project filtering
- architecture node selection
- copy-email feedback state
- reduced-motion handling where logic is involved

### End-to-end

One Playwright flow should:

1. load the home page
2. open the command palette
3. navigate to Projects
4. open NeuraLoc-Core details
5. switch to Developer mode
6. open the terminal
7. run `project neuraloc`
8. verify the repository CTA exists

Also test mobile viewport smoke behavior.

---

## 18. Analytics and privacy

Do not add analytics by default.

If analytics are later requested:

- prefer privacy-respecting analytics
- no invasive fingerprinting
- no hidden trackers
- document exactly what is collected
- keep the core site functional when analytics are blocked

---

## 19. Agent workflow

### Before editing

1. Inspect the repository tree.
2. Read the existing `README`, package manifest, lockfile, lint config, and current styles.
3. Reuse good existing work instead of replacing it blindly.
4. Check for uncommitted changes and preserve user work.
5. Identify the actual deployment target before adding platform-specific files.

### Git behavior

When working in a Git repository:

- never commit directly to `main` unless the user explicitly asks
- use the existing `codex-updates` branch when present
- otherwise create or use a task-specific branch based on `main`
- after each completed and validated change, commit it to the active branch and push it to `origin`
- make atomic commits with descriptive messages
- do not rewrite history
- do not force-push
- do not delete unrelated files

### Implementation behavior

- make reasonable design decisions without repeatedly stopping for clarification
- do not stop at a scaffold
- do not leave major sections as TODOs
- do not use lorem ipsum
- do not fabricate screenshots, testimonials, metrics, or client names
- keep data and content typed and centralized
- preserve graceful fallback behavior
- document any knowingly incomplete optional feature

### Verification loop

Run the appropriate equivalents of:

```bash
pnpm lint
pnpm test
pnpm build
pnpm exec playwright test
```

or the repository’s existing commands.

If a browser automation or screenshot tool is available:

- inspect desktop and mobile renders
- check overflow
- check text contrast
- test dialogs and command palette
- verify reduced-motion behavior
- fix visible problems before declaring completion

Do not claim tests passed unless they were actually run.

---

## 20. Definition of done

The project is complete only when:

- the page feels distinctly ATRX rather than template-derived
- the first screen clearly communicates Arppith’s focus
- NeuraLoc-Core receives the deepest case study
- all featured projects use accurate, grounded descriptions
- GitHub and email actions work
- visitor modes work and persist
- the command palette works
- the safe terminal works
- at least three architecture diagrams are interactive
- mobile layout is polished
- reduced-motion mode is respected
- no private or sensitive data is exposed
- no fake metrics or unsupported claims are present
- lint, tests, and production build pass
- the README contains local setup, build, deployment, and content-editing instructions

---

## 21. Deliverables

Deliver:

1. complete source code
2. polished responsive design
3. typed project/profile content
4. command palette
5. safe portfolio terminal
6. visitor mode system
7. interactive architecture playground
8. accessibility and reduced-motion support
9. tests
10. updated repository README
11. deployment configuration appropriate to the chosen host
12. concise final report listing:
    - what was built
    - important design decisions
    - commands run
    - test/build results
    - remaining optional enhancements

---

## 22. Final quality bar

Ask this before finishing:

- Would a recruiter understand the value quickly?
- Would a developer find real technical depth?
- Would a curious visitor discover something fun?
- Does the page remain fast and usable after the novelty wears off?
- Does every claim survive a click into the repository?
- Could this portfolio belong to anyone else?

If the last answer is “yes,” the design is still too generic.

Build the portfolio like a small product—not a decorated résumé.
