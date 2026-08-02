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
- **Role:** Engineering student, AI and automation builder, software developer, and web developer
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

### Project control files

Before editing, read these control documents in this order:

1. `PROJECT.md` - purpose, goals, product expectations, non-goals, and iteration history.
2. `STATUS.md` - current branch, latest commit, deployment state, verification baseline, known issues, and next actions.
3. `NEXT_STEP.md` - the immediate implementation target, ordered work plan, constraints, and completion checks for the next successful run.
4. `ARCHITECTURE.md` - runtime structure, component responsibilities, data flow, persistence, deployment, and test boundaries.
5. `DESIGN.md` - visual system and interaction direction when present.
6. `AGENTS.md` - operating constraints, privacy rules, content truth, and delivery workflow.

Control-document responsibilities:

- `PROJECT.md` is the durable product contract. Update it when the purpose, audience, scope, goals,
  non-goals, quality bar, or major product direction changes.
- `STATUS.md` is the live handoff. Update it for every commit with the date, commit hash, branch,
  summary, verification performed, known issues, and next action.
- `NEXT_STEP.md` is the current execution brief. After every successful run, replace its completed plan
  with the next immediate step, including implementation sequence, relevant constraints, validation,
  exit criteria, and the source commit that established the handoff. Never leave stale completed work as
  the active next step.
- `ARCHITECTURE.md` is the durable technical map. Update it whenever files move, dependencies change,
  state ownership changes, a new data source is added, deployment changes, or a runtime/data flow is
  materially altered.
- `AGENTS.md` owns instructions and safety constraints. Update it when workflow, privacy, validation,
  source-of-truth, or commit rules change.

Commit synchronization rules:

1. Before a commit, update `STATUS.md` with a pending entry describing the exact intended change.
2. Update `PROJECT.md` in the same work session when the change affects purpose, goals, scope, or product expectations.
3. Update `ARCHITECTURE.md` in the same work session when the change affects structure, data, state, dependencies, or deployment.
4. Create and validate the source commit.
5. Replace the pending `STATUS.md` entry with the real commit hash and final verification result.
6. After the successful run, update `NEXT_STEP.md` with the next immediate implementation brief before
   handing off.
7. Confirm `STATUS.md` and `.agents/` remain ignored before pushing; `AGENTS.md`, `PROJECT.md`,
   `DESIGN.md`, `ARCHITECTURE.md`, and `NEXT_STEP.md` are versioned governance documents.

`STATUS.md` and `.agents/` are private local references. The versioned governance documents must still
never contain secrets, tokens, private repository contents, personal data, environment values, or other
material unsuitable for public Git history.

`STATUS.md` must report facts rather than intentions. Do not mark a test, build, deployment, or live
verification as passed unless it was actually run. Carry forward unresolved issues until they are fixed
or intentionally closed.

### Before editing

1. Inspect the repository tree.
2. Read the existing `README`, package manifest, lockfile, lint config, and current styles.
3. Reuse good existing work instead of replacing it blindly.
4. Check for uncommitted changes and preserve user work.
5. Identify the actual deployment target before adding platform-specific files.

### Git behavior

When working in a Git repository:

- work directly on `main` by default for this repository
- do not create a branch or pull request unless the user explicitly asks for one
- if the user explicitly requests another branch or pull-request workflow, follow that request for the
  scoped task and return to the default `main` workflow afterward
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


---

## 23. Source precedence and conflict handling

The control files are complementary, but they are not interchangeable. Use the following authority order
when implementing or reviewing the portfolio:

1. The user's latest explicit instruction wins for the scoped task.
2. The checked-out repository is the current implementation reality. Never describe code as present until
   it exists in the repository.
3. `STATUS.md` determines the current branch, validated commit, known issues, active work, and deployment
   state.
4. `PROJECT.md` determines durable product purpose, audience, scope, non-goals, and acceptance criteria.
5. `ARCHITECTURE.md` determines intended technical ownership, routing, data flow, state boundaries,
   deployment behavior, and verification boundaries.
6. `DESIGN.md` determines ATRX visual language, interaction rules, article presentation, responsive
   behavior, and accessibility expectations.
7. `AGENTS.md` determines workflow, safety, factual grounding, implementation discipline, Git behavior,
   and validation requirements.

Reading order does not make a stale instruction more authoritative than a newer product decision. When
sources conflict:

- identify the exact conflict before editing;
- preserve currently working behavior unless the task intentionally changes it;
- apply the highest-authority current instruction;
- update the stale control document in the same work session;
- record any unresolved ambiguity in `STATUS.md` rather than silently inventing an answer.

The BMW material inside `DESIGN.md` is retained as historical visual research. It is inspiration only.
ATRX-specific authority notices, the production implementation, and the blog rules added to `DESIGN.md`
take precedence over BMW names, proprietary typography, photography assumptions, M branding, and exact
reference components.

---

## 24. Blog / Field Notes implementation directive

### 24.1 Product intent

Add a first-class writing surface to the ATRX portfolio under the public label **Field Notes**. The
navigation may use `Field Notes`; route names and code may use `blog` for clarity.

The blog is not a detached template, external publication, generic card grid, or marketing content
machine. It is the written engineering layer of the existing portfolio: implementation notes,
architecture decisions, experiments, failures, model evaluations, debugging records, project
retrospectives, and lessons grounded in work Arppith can substantiate.

The blog must preserve the portfolio's two complementary modes of communication:

- the portfolio shows systems spatially and interactively;
- Field Notes explains how and why those systems were built, tested, constrained, or changed.

A visitor must always understand that `/`, `/blog`, and `/blog/:slug` belong to the same ATRX product.
Do not create a visually unrelated publication theme.

### 24.2 Required initial scope

The first implementation must include all of the following:

1. A route-aware application shell.
2. `/` preserving the current portfolio experience and existing section anchors.
3. `/blog` as the Field Notes index.
4. `/blog/:slug` as an individual article route.
5. A deliberate not-found state for invalid routes and invalid article slugs.
6. MDX-authored articles compiled through Vite.
7. Typed article metadata and a central validated registry.
8. Draft versus published visibility rules.
9. Tag filtering on the index without inaccessible focus jumps.
10. One featured-note treatment and one chronological archive/feed treatment.
11. Route-aware navigation and correct home-section links from blog routes.
12. Per-route title, description, canonical URL, Open Graph/Twitter metadata, and article structured data.
13. Sitemap and crawler-policy synchronization for published article routes.
14. Keyboard, reduced-motion, mobile, 200-percent zoom, and code-overflow handling.
15. Unit/component coverage plus desktop/mobile Playwright coverage.
16. README instructions for adding, validating, publishing, updating, and removing a note.

Do not mark the blog implementation complete with only a visual `/blog` mockup. Direct navigation to an
article URL, refresh behavior, metadata, invalid slugs, mobile reading, code blocks, and production
Cloudflare behavior are part of the feature.

### 24.3 Explicit non-goals for the first implementation

Do not add these unless the user separately requests them:

- a database, CMS, admin dashboard, or authenticated authoring interface;
- comments, likes, reactions, bookmarks, accounts, or follower systems;
- email newsletters or subscriber storage;
- analytics, invasive tracking, ad technology, or third-party engagement scripts;
- server-side search infrastructure;
- arbitrary user-authored MDX or runtime MDX evaluation;
- remote content fetching as a requirement for core article rendering;
- syntax-highlighting packages with large client payloads unless a measured need justifies them;
- pagination before the article count requires it;
- fake view counts, popularity ranks, reading streaks, or engagement metrics;
- automatically generated technical claims presented without review.

The content remains local, versioned, reviewable, static-deploy friendly, and compiled at build time.

### 24.4 Required routing model

Use `react-router-dom` with browser-history routes. Do not implement route detection with ad-hoc
`window.location.pathname` conditionals.

Target route tree:

```tsx
/
/blog
/blog/:slug
/*
```

Implementation guidance:

- `src/main.tsx` mounts the router under `React.StrictMode`.
- `src/router.tsx` owns the route tree.
- Move the existing portfolio composition into a route component without rewriting its behavior.
- Use native router links for cross-route navigation.
- Keep ordinary anchors for movement between sections already rendered on the same page.
- Links from blog routes to portfolio sections must use `/#projects`, `/#now`, `/#about`, and similar
  full route-plus-fragment targets rather than bare `#projects` anchors.
- The ATRX wordmark must lead to `/` from blog routes and may lead to `#top` only when already on `/`.
- Preserve meaningful browser Back/Forward behavior.
- On route change, restore reading position intentionally. New article navigation should normally begin
  at the top. Back navigation should not unexpectedly erase the user's previous index position.
- Hash navigation to the homepage must occur after the homepage route has mounted. Implement a small,
  testable scroll helper instead of unreliable immediate global scrolling.

Do not duplicate a separate full header and footer for the blog. Refactor the existing shell only as
much as necessary to support route context and optional portfolio-only controls.

### 24.5 Required MDX foundation

Use the maintained Vite integration for MDX:

- `@mdx-js/rollup` in Vite configuration;
- `@mdx-js/react` only when needed for shared component provision;
- static imports or Vite `import.meta.glob` for local post discovery;
- no runtime `eval`, `new Function`, remote MDX execution, or arbitrary expression injection.

Recommended structure:

```text
src/
  blog/
    components/
      ArticleLayout.tsx
      ArticleHeader.tsx
      ArticleFooter.tsx
      ArticleTableOfContents.tsx
      CodeBlock.tsx
      Figure.tsx
      NoteCallout.tsx
      MetricPanel.tsx
      ArchitectureFigure.tsx
      RelatedNotes.tsx
    posts/
      example-slug.mdx
    registry.ts
    metadata.ts
    mdx-components.tsx
    types.ts
    validation.ts
  pages/
    PortfolioPage.tsx
    BlogIndexPage.tsx
    BlogPostPage.tsx
    NotFoundPage.tsx
  router.tsx
```

The exact filenames may adapt to the existing repository, but ownership must remain clear and be
recorded in `ARCHITECTURE.md`.

### 24.6 Typed article contract

Every article must export metadata satisfying one canonical TypeScript contract. Use a shape equivalent
to the following and keep the exact accepted values centralized:

```ts
export type BlogPostStatus = "draft" | "published" | "archived";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;       // YYYY-MM-DD
  updatedAt?: string;        // YYYY-MM-DD; only when materially revised
  status: BlogPostStatus;
  tags: string[];
  series?: string;
  featured?: boolean;
  cover?: {
    src: string;
    alt: string;
  };
  repositoryUrl?: string;
  projectSlug?: string;
  canonicalUrl?: string;
};
```

Metadata rules:

- `slug` must be lowercase kebab-case, unique, stable after publication, and match the public route.
- `title` must be descriptive rather than clickbait.
- `description` must accurately summarize the article and remain suitable for search/social metadata.
- Dates must be valid ISO calendar dates. Never publish a future date accidentally.
- `updatedAt` is not changed for typo-only corrections. Use it for meaningful technical or editorial
  revisions.
- `tags` must come from a restrained normalized vocabulary. Do not create spelling variants such as
  `Local AI`, `local-ai`, and `LocalAI` for the same concept.
- `cover.alt` must describe meaningful visual content. Decorative covers use an empty alt only when the
  rendering component explicitly treats them as decorative.
- `repositoryUrl` and `projectSlug` are optional associations, not claims that every note maps to one
  public repository.
- Reading time must be derived from content if displayed. Do not author an arbitrary value.
- Do not manually author fake popularity, difficulty, views, or completion percentages.

The registry must validate at least:

- unique slugs;
- valid statuses;
- required title and description;
- valid date format and date ordering;
- nonempty normalized tags;
- route/module availability;
- published posts only in production-facing lists, sitemap, feeds, and related-note suggestions.

A duplicate slug or invalid published post must fail tests or build validation rather than quietly hiding
one article.

### 24.7 Draft and archive behavior

- `draft` notes may be visible in local development through an explicit development-only indicator.
- Draft notes must not appear in the production index, production sitemap, structured data, related-note
  links, or public search surfaces.
- A direct production request for a draft slug must resolve to the same intentional not-found behavior as
  an unknown slug.
- `archived` means the article remains publicly readable but is no longer current. Render a clear archive
  notice and preserve its canonical URL.
- Never delete or silently redirect a published slug merely because its title changes.
- If a published route must move, add an explicit permanent redirect and preserve canonical intent.

### 24.8 MDX component allowlist

MDX may use ordinary Markdown plus a deliberately small set of imported or globally supplied ATRX
components. Initial approved component categories:

- `NoteCallout` for information, warning, limitation, correction, or experiment context;
- `Figure` for local images with caption and alt handling;
- `ArchitectureFigure` for static or carefully bounded interactive system diagrams;
- `MetricPanel` for verified metrics with labels, units, dataset context, and caveats;
- `CodeBlock` for overflow-safe code presentation and optional copy control;
- `TerminalBlock` for fixed example transcripts, never arbitrary execution;
- `ComparisonTable` for accessible technical comparison;
- `ProjectLink` for allowlisted portfolio/project navigation;
- `Disclosure` for optional supporting detail that remains keyboard accessible.

Do not let individual posts import arbitrary application internals merely because MDX technically allows
it. New article-only components must be reusable, accessible, documented, and added to the allowlist.
Heavy project simulations should be lazy-loaded and must have a static fallback.

### 24.9 Editorial truth and technical accuracy

Field Notes is evidence, not promotional filler.

For every note:

- distinguish implemented behavior, experiment, inference, limitation, and roadmap;
- verify repository-backed claims against the relevant current source or README;
- verify benchmark values against the actual result artifact supplied by the user;
- state dataset size, time range, split, metric, hardware, or model context when those facts materially
  affect an ML claim;
- never invent terminal output, performance numbers, users, downloads, incidents, citations, quotes, or
  external validation;
- never publish secrets, private repository details, local usernames, absolute filesystem paths, access
  tokens, private conversations, unredacted logs, or personal data;
- sanitize screenshots and code snippets before publication;
- label security material as controlled, owned, local, educational, or defensive when relevant;
- do not publish operational abuse instructions merely to make a security note look impressive;
- preserve uncertainty where the available evidence does not support a stronger conclusion.

Generated prose may be polished, but technical meaning must remain traceable to user-supplied facts,
repository content, or cited public sources.

### 24.10 Index-page behavior

The `/blog` page must provide:

- a clear `FIELD NOTES` identity and one-sentence purpose;
- one featured note when a published note is explicitly marked `featured`;
- a chronological list sorted by `publishedAt` descending, with `updatedAt` secondary context only;
- tag filters implemented as real buttons or links with visible focus and pressed state;
- an `All` state;
- note title, description, date, tags, series/project association when present, and a truthful reading-time
  estimate only when derived;
- a useful empty state when a selected tag has no matching published notes;
- no layout jump that loses keyboard focus when filtering;
- no infinite scroll for the initial implementation;
- no generic three-column SaaS-card wall as the only composition.

The index should feel like an engineering log/archive: editorial hierarchy, dates, system labels, and
carefully bounded visual accents. It must remain easy to scan without requiring hover.

### 24.11 Article-page behavior

Each `/blog/:slug` route must provide:

- breadcrumb or clear return path to Field Notes;
- article title, description/deck, publication date, optional update date, tags, and optional series;
- stable readable line length;
- semantic heading hierarchy beginning with one page-level `h1`;
- shareable canonical URL;
- optional generated table of contents only when the article has enough sections to justify it;
- visible heading focus/anchor behavior if heading links are implemented;
- overflow-safe code, tables, diagrams, and long URLs;
- previous/next or related notes derived only from published registry data;
- a correction/update notice when `updatedAt` represents a material change;
- a final path back to projects, related repository, or contact only when relevant;
- no forced modal, autoplay audio, or interaction that interrupts reading.

Do not expose raw MDX errors to users. Unknown or invalid slugs render the deliberate not-found page.

### 24.12 Metadata, canonical, and structured-data requirements

For `/blog`:

- title identifying Field Notes and Arppith Andrews;
- accurate description;
- canonical URL ending in `/blog` or the repository's chosen normalized trailing-slash convention;
- appropriate Open Graph/Twitter metadata;
- `CollectionPage` or `Blog` structured data only when the actual implementation supports it accurately.

For a published article:

- title and description from validated metadata;
- canonical URL derived from production origin and slug unless explicitly overridden;
- Open Graph type `article`;
- publication and optional modification dates;
- article image only when a valid local cover exists;
- JSON-LD `BlogPosting` or `TechArticle` with Arppith as author, matching visible content and canonical URL;
- no fake publisher organization, rating, comment count, or interaction statistics.

Metadata must update on client navigation and direct route loading. Tests must verify that stale homepage
metadata does not remain after navigating to an article and that article metadata does not remain after
returning home.

The application is statically hosted. Client-side metadata does not guarantee rich previews for every
crawler. Do not claim full article SEO parity with prerendered pages unless direct production responses
or an implemented prerender/static-generation step prove that route-specific HTML is actually served.
Record this limitation in `STATUS.md` if the first release remains SPA-only.

### 24.13 Sitemap, robots, and route discovery

- Add `/blog` and every published article canonical URL to `public/sitemap.xml` or to the documented
  generated equivalent.
- Exclude draft routes.
- Keep `lastmod` accurate; do not update every article date on unrelated builds.
- Preserve the existing open crawler policy unless the user changes it.
- Add tests ensuring registry publication state and sitemap entries agree.
- If sitemap generation is automated, the generator must consume the same canonical metadata source as
  the UI and fail on invalid data.
- Verify production responses, not just local build output.

### 24.14 Cloudflare Pages route behavior

The production target remains Cloudflare Pages and the output remains `dist/`.

- Preserve SPA deep-link fallback for `/blog` and `/blog/:slug` when using BrowserRouter.
- Do not add a top-level `404.html` without understanding that Cloudflare Pages may stop applying its
  automatic SPA fallback.
- If an explicit `public/_redirects` rule is used, keep it minimal, document it, and verify that static
  assets, sitemap, robots, and future prerendered pages are not swallowed incorrectly.
- Refreshing a valid article URL in production must render the article rather than a Cloudflare 404 or
  blank application.
- Refreshing an invalid slug must render the application's intentional not-found page after the shell
  loads.
- Verify the deployed hashed bundle or visible article content, not HTTP 200 alone.

### 24.15 Design and interaction constraints

Follow the ATRX-specific blog system added to `DESIGN.md`.

Non-negotiable constraints:

- black technical-editorial foundation consistent with the portfolio;
- white/neutral reading hierarchy with restrained ATRX blue/red signal use;
- no BMW logos, M stripe, automotive photography requirement, or proprietary BMW font dependency;
- no generic Medium clone, newspaper cosplay, glassmorphism card cloud, or neon hacker-terminal wall;
- body text optimized for reading rather than forced uppercase or monospace;
- monospace reserved for labels, timestamps, paths, commands, and code;
- motion may orient or acknowledge, but must not continuously distract beside article text;
- all essential content available without hover, sound, animation, or JavaScript-only gestures beyond the
  application runtime itself;
- project-specific visual components may appear inside notes only when they clarify the writing.

### 24.16 Accessibility requirements for Field Notes

In addition to the existing accessibility rules:

- maintain one `main` landmark per rendered route;
- use one `h1` per article page and logical nested headings;
- announce route/page changes to screen-reader users through title/focus management or an equivalent
  tested pattern;
- move focus to the new page heading after deliberate client-side route navigation without breaking
  browser Back behavior;
- provide visible focus for tag filters, heading links, copy controls, and article navigation;
- preserve text selection in all article content and code blocks;
- make code-copy feedback available through an ARIA live region without stealing focus;
- add captions and alt text to figures; do not repeat the caption verbatim as alt text;
- keep tables semantically structured and horizontally scrollable within their own region on small
  screens;
- ensure diagrams have a text explanation or structured fallback;
- do not encode warning/success meaning by color alone;
- meet usable contrast in every callout and syntax token;
- verify the article at 200-percent zoom and 360 px width with no page-level horizontal overflow;
- reduced motion must eliminate nonessential reveal, progress, glow, packet, and smooth-scroll effects.

### 24.17 Performance requirements for Field Notes

- Route-level lazy-load the blog index and post page when practical without destabilizing tests.
- Lazy-load individual article modules so adding posts does not force every article body into the initial
  homepage bundle.
- Keep metadata discovery eager only when its size remains small and measured.
- Use responsive local images with explicit dimensions to avoid layout shift.
- Do not ship full-size screenshots when a properly encoded WebP/AVIF/JPEG derivative is enough.
- Avoid a heavy syntax highlighter in the initial bundle. Prefer build-time highlighting or a small
  deliberate renderer if highlighting is required.
- Interactive diagrams below the fold should load on demand and expose a static fallback.
- Do not add global listeners per article without cleanup.
- Preserve the portfolio's current performance and do not regress homepage interaction merely because
  routing was introduced.

### 24.18 Testing requirements

Add focused tests for at least:

#### Unit and component

- metadata validation;
- duplicate slug rejection;
- draft exclusion in production-facing registry helpers;
- published ordering;
- tag normalization and filtering;
- article lookup by slug;
- unknown-slug not-found behavior;
- route metadata replacement and cleanup;
- article heading structure for fixture content;
- code-block overflow/copy feedback when implemented;
- route-aware header links;
- homepage hash navigation after route transition;
- reduced-motion behavior for any blog-specific motion.

#### End-to-end

- navigate from `/` to `/blog` through visible navigation;
- open a published article and verify its title/content;
- directly load and refresh `/blog/:slug`;
- use browser Back to return to the index;
- filter by a tag using keyboard controls;
- open an unknown slug and verify the intentional not-found page;
- confirm draft content is not publicly reachable in the production build;
- verify article title, description, canonical, article Open Graph fields, and JSON-LD;
- verify sitemap entries for published notes;
- verify mobile code/table containment and absence of page-level horizontal overflow;
- verify 360 px and representative desktop layouts;
- verify reduced-motion mode;
- verify homepage section links still work after routing changes;
- verify terminal, command palette, visitor modes, discovery, and project interactions have not regressed.

### 24.19 Publishing workflow

For every new note:

1. Choose a stable slug.
2. Create the MDX file and local assets.
3. Add complete typed metadata.
4. Keep status `draft` while editing.
5. Verify all factual claims, snippets, screenshots, links, dates, and repository associations.
6. Run metadata/registry tests.
7. Inspect desktop, mobile, keyboard, reduced-motion, code, table, and image behavior.
8. Change status to `published` only when the note is ready to be public.
9. Update or generate the sitemap from the same publication state.
10. Run the complete repository verification loop.
11. Add the pending and final entries to `STATUS.md` around the source commit.
12. Verify the deployed article URL and metadata after Cloudflare finishes building.

For edits to a published note:

- preserve its slug unless a migration is intentional;
- update `updatedAt` only for a material revision;
- add an in-article correction/update note when the meaning changed significantly;
- do not rewrite historical experimental outcomes to match a later result;
- verify old inbound URLs and related-note links.

### 24.20 Blog implementation delivery plan

Implement in bounded stages while keeping the repository valid after each commit:

#### Stage A — route foundation

- install and configure router dependency;
- move existing portfolio composition into the `/` route with no visual regression;
- make header links route-aware;
- add route-level not-found handling;
- validate homepage anchors, command palette, terminal, project opening, and browser history.

#### Stage B — content system

- configure MDX through Vite;
- add types, registry, validation, draft rules, and fixture note;
- add index and article routes;
- add shared MDX components and article layout.

#### Stage C — ATRX visual integration

- implement the Field Notes index hierarchy;
- implement the long-form article system from `DESIGN.md`;
- add responsive and reduced-motion behavior;
- inspect desktop and mobile renders.

#### Stage D — metadata and discovery

- implement route metadata and structured data;
- synchronize sitemap and robots behavior;
- test direct Cloudflare deep links;
- record SPA-only social/SEO limitations if route-specific HTML is not prerendered.

#### Stage E — verification and documentation

- add unit/component and Playwright coverage;
- update README publishing instructions;
- update all affected governance files and `STATUS.md`;
- run lint, tests, build, E2E, visual QA, deployment verification, and privacy checks.

Do not combine unrelated project-visual refactors with the blog implementation unless required to make
routing or shared layout work. Preserve the existing six-project presentation and its custom visuals.

---

## 25. Blog-expanded definition of done

The portfolio-plus-blog release is complete only when all existing completion conditions still pass and:

- `/`, `/blog`, `/blog/:slug`, and invalid routes behave intentionally;
- valid article deep links survive a production refresh;
- the homepage remains visually and behaviorally unchanged except for intentional route-aware navigation;
- published and draft visibility rules are enforced;
- adding a note is documented and does not require editing unrelated UI components;
- article metadata is typed, validated, and reflected in the rendered route;
- the Field Notes index is useful with keyboard, touch, and ordinary scrolling;
- article typography is comfortable for sustained reading;
- code, tables, figures, diagrams, and long URLs do not cause page-level horizontal overflow;
- all public technical claims remain grounded;
- sitemap and canonical URLs agree with published routes;
- direct production checks distinguish real article rendering from a cached or generic HTTP 200;
- existing portfolio tests and interactions continue to pass;
- new unit/component and E2E blog tests pass;
- `PROJECT.md`, `ARCHITECTURE.md`, `DESIGN.md`, `STATUS.md`, README, and any content-editing documentation
  accurately describe the delivered system.
