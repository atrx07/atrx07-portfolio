# ATRX Portfolio - Private Project Record

This file is a local design and implementation record. It is intentionally excluded from Git because it
contains the project's internal expectations, design rationale, and iteration history.

## Purpose

The ATRX portfolio is the public identity and engineering evidence layer for Arppith Andrews (`atrx07`).
Its purpose is to connect Arppith's name and handle with credible, inspectable work in local AI,
automation, software engineering, web development, real-time systems, bots with memory, and unusual
browser or hardware experiments.

It is not only a resume page. It is a compact interactive product that demonstrates how Arppith thinks:
prototype quickly, expose the real architecture, test against actual users or hardware, preserve state,
and keep refining until the system is dependable.

## Primary Goal

Make a recruiter, developer, or curious visitor understand within one visit:

- who Arppith Andrews is and how `atrx07` maps to the ATRX identity
- what he builds and which technical areas define his direction
- why Traelyx is the current-build case study and NeuraLoc-Core remains the deepest local-AI case study
- which claims are implemented, experimental, or still planned
- where to inspect public repositories and how to contact him

The experience should remain distinctly ATRX after the novelty wears off: fast, credible, accessible,
useful for scanning, and rewarding to explore.

## Product Objectives

1. Establish a memorable public identity around useful systems at the edge of practical and unusual.
2. Lead with grounded engineering evidence rather than inflated titles, metrics, or marketing language.
3. Serve recruiter, developer, and curious-visitor needs without splitting into separate websites.
4. Make project architecture, constraints, maturity, and proof points available on demand.
5. Keep core content usable through ordinary scrolling while adding optional interaction through modes,
   project details, architecture nodes, the command palette, terminal, sound, and discovery state.
6. Remain static-deploy friendly, privacy respecting, keyboard accessible, responsive, and fast.
7. Build a durable search association between Arppith Andrews, `atrx07`, AI and automation, software
   development, web development, local AI, and real-time systems.

## Non-Goals

- A generic template, decorated resume, or logo-wall skills page.
- A fake operating system, fake hacker terminal, or interaction that blocks ordinary navigation.
- Unsupported claims about employment, scale, awards, users, performance, security proof, or production readiness.
- Publishing private repositories, private conversations, college details, secrets, or sensitive personal information.
- Requiring a backend, analytics, autoplay audio, invasive tracking, or arbitrary shell execution.
- Hiding project limitations, roadmap items, or experimental maturity behind polished presentation.

## Success Criteria

- A recruiter can identify Arppith, his focus, Traelyx, NeuraLoc-Core, core technologies, and contact path in under two minutes.
- A developer can inspect architecture, stack, proof points, constraints, maturity, and repository links.
- A curious visitor can discover meaningful interactions without losing access to essential content.
- All public claims remain traceable to supplied facts or public repositories.
- The interface works at 360 px mobile, tablet, desktop, keyboard-only, reduced-motion, and 200 percent zoom.
- The safe terminal, visitor modes, command palette, project details, architecture playground, discovery,
  contact actions, and optional sound remain functional.
- TypeScript checks, unit tests, the production build, and Playwright desktop/mobile flows pass before public pushes.
- Canonical metadata, structured data, sitemap, robots policy, and visible identity copy remain aligned.
- No private control files or sensitive material enter the public Git history.

## Original Expectation

Build a polished, highly interactive portfolio for Arppith Andrews (`atrx07`) that behaves like a compact
software control room rather than a generic developer template or decorated resume.

The core identity is:

> Useful systems at the edge of practical and unusual.

The portfolio should communicate three things immediately:

- Arppith is an engineering student working across computer science, AI, and automation.
- His strongest direction is dependable local-first AI software, real-time systems, bots with memory,
  unusual browser tools, and experiments tested against real users or hardware.
- Traelyx is the current-build case study; NeuraLoc-Core remains the deepest local-AI engineering case study.

### Audience Goals

- Recruiters should understand the person, focus, flagship project, core stack, and contact path in under
  two minutes.
- Developers should be able to inspect architecture, constraints, proof points, maturity, and repository
  links.
- Curious visitors should find meaningful interaction, a safe terminal, visitor modes, project diagrams,
  optional sound, discovery state, and one harmless easter egg.

### Required Product Shape

- A persistent system-rail navigation with ATRX identity, section links, command palette, availability,
  discovery count, sound control, GitHub, and a usable mobile menu.
- A strong hero with clear role/value copy, project and GitHub calls to action, a currently-building
  signal, boot copy, and Recruiter / Developer / Chaos modes.
- A deep Traelyx current-build section with a pinned narrative, architecture responsibilities, verified
  foundation, explicit disabled-recorder boundary, next milestone, and repository path.
- A seven-project lab for Traelyx, NeuraLoc-Core, void.chat, Aveline Bot, StyleForge Lite, SecureScope,
  and AtrxInstaDown.
- Interactive architecture diagrams for Traelyx, NeuraLoc-Core, void.chat, and Aveline Bot.
- A fixed-command simulated terminal with history, tab completion, safe links, mode switching, and no
  arbitrary shell execution.
- An experiment rack, capability map, operating principles, and direct email/GitHub contact section.
- A command palette, progressive discovery counter, optional user-triggered sound, and signal mode.

### Technical and Quality Expectations

- Vite, React, strict TypeScript, Tailwind, GSAP/Motion where purposeful, Lucide icons, Vitest, React
  Testing Library, and Playwright.
- Static deployment suitable for Cloudflare Pages.
- Accurate project claims sourced from public repositories and supplied facts.
- No private repository details, college name, secrets, analytics, fake metrics, fake telemetry, or
  unsupported production claims.
- Full keyboard navigation, visible focus, semantic landmarks, accessible dialogs and terminal, reduced
  motion, and usable 360 px / tablet / desktop layouts.
- Fast initial load, optimized images, no scroll hijacking, no forced audio, and no unbounded decorative
  animation.
- `STATUS.md` and `.agents/` remain private and local; `AGENTS.md`, `PROJECT.md`, `DESIGN.md`,
  `ARCHITECTURE.md`, and `NEXT_STEP.md` are versioned governance documents.

## Iteration Record

### 18. Traelyx Current-Build Integration - `51aa1ef`

- Added Traelyx as the current active build from its public Markdown and validated M0 state.
- Kept implemented foundation, disabled recorder, and future Drive DNA/scoring work visually distinct.
- Expanded the lab, detail dialog, architecture playground, terminal, metadata, and project count to
  seven projects while preserving NeuraLoc-Core as the deepest local-AI case study.
- Reused the installed Agent Flow primitive as a fixed trust-path diagram and added the canonical
  Traelyx launcher mark as a local static asset.

### 1. Initial Product Build - `91f1e37`

- Built the full interactive ATRX portfolio rather than a conventional landing page.
- Added typed profile/project data, the visitor mode system, flagship case study, project accordion,
  architecture playground, terminal, experiments, capabilities, principles, contact section, command
  palette, sound controls, discovery state, signal mode, metadata, and tests.
- Established the black technical-editorial visual system with white display typography and restrained
  blue/red signal accents.

### 2. Hero Mark Experiments - `9874401`, `6485a85`

- Reworked the supplied ATRX lettering as a transparent sticker-style hero mark.
- Removed the visible square image boundary and softened its integration with masking.
- Corrected the mark's tilt and changed it to a black fill with a thin white outline.

### 3. Responsive and Interaction Fallbacks - `dd9fa68`

- Polished responsive layouts and fallback behavior across desktop and mobile.
- Improved interaction behavior where hover or motion capabilities were unavailable.

### 4. Cloudflare Pages Repair - `4f0bb1f`

- Corrected the deployment output configuration after production returned HTTP 200 with a blank page.
- Verified the generated HTML, JavaScript bundle, and Cloudflare Pages rendering path.

### 5. Private Reference Cleanup - `0a4739f`

- Added `AGENTS.md`, `DESIGN.md`, and `.agents/` to `.gitignore`.
- Removed those internal design/reference files from the public Git index while preserving them locally.
- Audited the repository for unnecessary private material.

### 6. ATRX Artwork Integration - `3140e45`

- Replaced the earlier logo assets with the supplied square silhouette artwork and ATRX lettering.
- Applied gradual masks so sharp square borders blend into the black canvas.
- Restored the header identity direction separately from the large hero artwork.

### 7. Broad Layout and Behavior Polish - `2fd528f`

- Removed decorative moving hero lines that did not communicate a functional system.
- Restored the header to a text-based `ATRX07` wordmark.
- Made the terminal a fixed-height internal scroll area so command history no longer grows the page.
- Restored the visible mobile terminal prompt.
- Enlarged vertical project-edge labels.
- Improved the flagship sticky-title position and proof-grid text alignment.
- Corrected the LIVE label, oversized dialog headings, project-specific illustration sizing, and
  dedicated-filter card width behavior.
- Replaced the operating-principles image with the main silhouette artwork.
- Improved desktop and mobile overflow, card details, and visual containment.
- Added mobile project-card reveal behavior based on scroll position as an initial experiment.

### 8. Flagship Boundary Repairs - `165967d`, `765fca7`

- Prevented the pinned flagship title from overlapping the Projects section at anchor navigation.
- Added a controlled exit fade and clipping at the flagship boundary.
- Stabilized ScrollTrigger behavior when entering or leaving the section.

### 9. Flagship, Identity, and Mobile Refinement - `b2c69cc`

- Calculated the flagship title pin from its real rendered height so the entire text block sits at the
  viewport center.
- Centered the Q3 runtime circle in the overall NeuraLoc visual as an intermediate layout.
- Added the supplied wide ATRX artwork as the mobile-only hero source.
- Returned Recruiter / Developer / Chaos controls to a horizontal row below the mobile artwork.
- Replaced the BMW-like three-color stripe beside `ATRX07` with an original five-bar system/audio signal.
- Added delay, a narrow activation band, and slower transitions to reduce mobile accordion sensitivity.
- Extended Playwright checks for hero geometry, runtime geometry, terminal containment, project filters,
  dialog titles, and mobile behavior.

### 10. Intentional Mobile Project Interaction - `7e73c45`

- Removed all scroll-driven and IntersectionObserver-driven mobile project reveals.
- Mobile project cards now start closed and only open or close when their title row is tapped.
- Tapping a mobile title never opens the dedicated project dialog.
- The dedicated dialog is reachable only through the expanded card's `Inspect system` action.
- Enlarged and raised the wide mobile hero artwork to reduce the awkward empty gap below the hero calls
  to action.
- Repositioned Q3 so it is centered horizontally and vertically inside the left runtime grid cell, with
  its center always remaining left of the vertical separator.
- Added `PROJECT.md` to the private local reference set in `.gitignore`.

### 11. Search Identity and Technical SEO - `973b494`

- Reframed the canonical title and description around Arppith Andrews, engineering, AI and automation,
  software development, and web development without presenting an unsupported employment title.
- Added explicit index/follow preview controls, richer Open Graph and social metadata, responsive hero
  image preloads, identity links, and corrected title encoding.
- Expanded JSON-LD into a linked `Person`, `WebSite`, `ProfilePage`, and selected
  `SoftwareSourceCode` graph grounded in the public project data.
- Turned operating principles into a stable About section with a direct navigation anchor, stronger
  identity heading, concise role summary, and mobile copy-first ordering.
- Reduced the sitemap to the canonical homepage with an accurate `lastmod`; kept `robots.txt` fully
  open and free of unnecessary or unsupported directives.
- Added Playwright coverage that verifies title, description, canonical, crawler controls, schema,
  sitemap, and robots agreement on both desktop and mobile projects.
- Confirmed the responsive social artwork is 1672 x 941, the About copy remains in bounds, and the
  final browser runtime has no warnings or errors.

### 12. Animated Actions and Visitor Modes - `2024957`

- Added reusable semantic mask-action components backed by the bundled Urban, Nature, and Forest
  sprite assets, while preserving the portfolio's square minimal button geometry.
- Assigned Urban primary motion to the hero exploration action and repository actions, Nature primary
  motion to the email CTA, and Forest secondary motion to supporting GitHub and copy-email actions.
- Added desktop hover/focus, click/tap press feedback, native keyboard activation, and reduced-motion
  fallbacks without delaying navigation.
- Reworked the Recruiter / Developer / Chaos selector with a minimal sliding indicator and a looping
  edge signal built only from the existing blue and red palette.
- Added component and Playwright regressions for semantic actions, touch input, visitor-mode motion,
  and reduced-motion behavior.
- Confirmed the hero, flagship, and contact surfaces at desktop and 360 px mobile sizes with no
  horizontal overflow.

### 13. Installed Magic Tabs Integration - `e63d44c`

- Replaced the provisional sliding visitor-mode plate with the bundled Magic Tab component and its
  controlled selection, raised edge/shadow layers, manual keyboard activation, and off-screen pause.
- Adapted the component's Tailwind v4-oriented transitions and semantic tokens to the existing
  Tailwind v3 build without adding a runtime dependency.
- Preserved the ATRX square rail, equal-width mobile layout, and blue/red-only signal palette instead
  of adopting the showcase's rounded shape or generic rainbow colors.
- Added focused unit and Playwright coverage for selection, roving focus, disabled-tab skipping,
  reduced motion, desktop layout, and mobile containment.

### 14. void.chat Orbit Identity - `d9d8612`

- Replaced the static three-dot rings with the installed Orbiting Circles component.
- Turned the visual into an architecture-led identity for Firebase, Cloudflare Workers, Durable
  Objects, WebSockets, and D1 around one durable global room.
- Preserved the portfolio's black technical framing, signal palette, responsive project-card geometry,
  dialog composition, touch behavior, and reduced-motion contract.
- Added focused component and desktop/mobile containment regressions.

### 15. Aveline Agent Flow - `b2317b5`

- Replaced the static four-box Aveline visual with the bundled Agent Flow component and a five-stage
  message, mood, memory, inference, and reply topology grounded in the project's public architecture.
- Disabled dragging and panning while preserving continuous animated route signals, status phases,
  and a subtle desktop node hover lift.
- Reworked the component into ATRX's square control-room language with a technical grid, restrained
  glows, status telemetry, and the existing blue, green, yellow, and red signal palette.
- Added responsive card and full-screen dialog behavior, reduced-motion safeguards, and desktop/mobile
  regressions for fixed interaction, content, hover response, containment, and page overflow.

### 16. Aveline Responsive Flow Refinement - `e89f89d`

- Used the wide desktop accordion's available space for a straight Inference-to-Reply route.
- Preserved the dropped Reply composition in the desktop detail panel and both mobile contexts.
- Matched the resting node border to the animated trace's restrained 12 px corner geometry.
- Added explicit layout markers and desktop/mobile regressions for the four presentation contexts.

### 17. Aveline Wide-canvas Fill - `aae1e57`

- Made Agent Flow's fit-to-view track container changes throughout the desktop accordion transition
  instead of locking an early, undersized measurement.
- Allowed only the wide linear Aveline presentation to enlarge up to a bounded 1.28x, while the
  desktop detail panel and both mobile contexts retain their original stacked scale ceiling.
- Filled roughly 96% of the 2048 px desktop canvas width with balanced side margins and added a
  regression for minimum fill, centering, layout selection, and stacked-context preservation.

## Current Verification Standard

Before each public push:

1. Run TypeScript lint/typecheck.
2. Run unit and component tests.
3. Build the production bundle.
4. Run the Playwright desktop/mobile matrix.
5. Inspect representative desktop and 360 px mobile screenshots.
6. Confirm no horizontal overflow, clipped titles, accidental dialog activation, or private files.
7. Commit atomically, push to `main` as requested, and verify the deployed Cloudflare Pages bundle.


---

## Blog / Field Notes Product Expansion

### Product decision

The ATRX portfolio expands from a single interactive portfolio surface into a small route-based public
site with two connected evidence layers:

1. **Portfolio (`/`)** — spatial, visual, interactive evidence of projects, architecture, skills, and
   personality.
2. **Field Notes (`/blog` and `/blog/:slug`)** — durable written evidence explaining engineering
   decisions, experiments, failures, constraints, model evaluations, debugging, and lessons learned.

This is an extension of the existing product, not a replacement or redesign of the homepage. The six
featured projects retain their custom visual and interaction treatments. The blog does not require the
project system to become a generic content-management framework.

### Why Field Notes exists

The portfolio already shows what Arppith builds, but many of the strongest signals cannot fit inside a
project card or architecture diagram:

- why a particular technical boundary was chosen;
- what failed during implementation;
- how a result was validated;
- what a benchmark does and does not prove;
- what constraints came from hardware, data, services, or reverse engineering;
- how a prototype became more dependable through repeated testing;
- what remains incomplete and why;
- how Arppith reasons across AI, automation, native software, real-time systems, browser tools, music
  technology, and practical experiments.

Field Notes turns those decisions into inspectable public evidence. It should make the portfolio more
credible, searchable, useful, and personally distinctive without turning it into a content treadmill.

### Public identity

The public navigation label is **Field Notes**. The term `blog` remains acceptable in route paths,
filenames, code, metadata types, and technical documentation.

Suggested index identity:

> **FIELD NOTES**  
> Systems, experiments, failures, and engineering decisions from the ATRX workbench.

The exact public copy may be refined, but it must remain factual, personal, technically grounded, and
consistent with the existing identity:

> **Useful systems at the edge of practical and unusual.**

### Audience value

#### Recruiter

Field Notes should demonstrate that Arppith can:

- communicate technical work clearly;
- distinguish results from limitations;
- document decisions and trade-offs;
- reflect on failure without hiding it;
- connect implementation details to product reliability;
- produce maintainable written evidence rather than only visual demos.

A recruiter should be able to scan the index, open one note, understand the context, and return to the
portfolio without learning a new interface.

#### Developer

Field Notes should provide:

- architecture rationale;
- implementation boundaries;
- selected code and command examples;
- model or infrastructure evaluation context;
- reproducible reasoning where publication is safe;
- explicit constraints and future work;
- links back to relevant public repositories or project case studies.

It must not pretend to be formal documentation when it is a personal engineering note.

#### Curious visitor

Field Notes should offer:

- readable narratives behind unusual projects;
- honest lessons and small discoveries;
- visual diagrams or interactive fragments only when they improve understanding;
- an obvious route back to the more playful portfolio experience.

Reading must never require using the terminal, command palette, sound, hover, or easter eggs.

### Editorial pillars

Published notes should normally fit at least one of these pillars:

1. **Build logs** — meaningful implementation milestones and what changed.
2. **Architecture notes** — boundaries, data flow, state, lifecycle, deployment, and trade-offs.
3. **Experiments** — a question, method, observed result, limitation, and next step.
4. **Failure reports** — what broke, why it broke, how it was diagnosed, and what was changed.
5. **Model and data evaluations** — metrics with dataset, split, horizon, hardware, and uncertainty
   context.
6. **Reverse-engineering and hardware notes** — formats, MIDI, browser audio, device behavior, and
   verification on real targets.
7. **Automation and agent workflows** — durable state, fallbacks, prompt/version management, governance,
   and practical limits.
8. **Security lab notes** — controlled, defensive, owned-environment learning with safe disclosure.
9. **Project retrospectives** — what a project proves, what it does not prove, and what would be done
   differently.

A note may combine pillars. Categories must describe the actual content rather than chase popular search
terms.

### Editorial principles

1. **Evidence before polish** — a beautifully written unsupported claim is still unacceptable.
2. **Limitations belong in the article** — do not hide weak horizons, incomplete runtime paths, dataset
   gaps, model imbalance, service constraints, or experimental maturity.
3. **Context makes metrics meaningful** — include units, sample range, horizon, model, split, hardware,
   and evaluation conditions when relevant.
4. **Failure is useful when explained** — write about diagnosis and correction, not manufactured drama.
5. **Private stays private** — redact sensitive data, secrets, identities, private repository content,
   private messages, and operational access details.
6. **No artificial publishing quota** — quality and truth matter more than frequency.
7. **Stable URLs are part of the product** — published slugs should survive title changes.
8. **Updates remain honest** — material revisions receive an update date or correction note rather than
   silently rewriting history.
9. **The article serves the reader** — custom visuals are allowed, but readability outranks spectacle.
10. **AI assistance does not transfer authorship of facts** — generated wording must be reviewed against
    real evidence.

### Initial feature scope

The first public implementation includes:

- route-based navigation for `/`, `/blog`, `/blog/:slug`, and not-found states;
- an ATRX Field Notes index;
- one featured-note position when explicitly configured;
- a chronological archive/feed;
- tag filtering;
- typed metadata;
- local MDX content;
- shared article components for code, figures, callouts, metrics, diagrams, and related links;
- draft, published, and archived states;
- per-route metadata and structured data;
- published-route sitemap synchronization;
- route-aware header/footer behavior;
- responsive, keyboard, reduced-motion, and 200-percent-zoom support;
- test coverage and a documented publishing workflow.

### Initial content constraints

The system may ship with a deliberately marked fixture/example note during implementation, but the final
public deployment must not publish invented project history merely to make the index look populated.

Potential real subjects, only when supported by user-provided facts or repository evidence, include:

- NeuraLoc-Core runtime ownership, durable conversation state, context admission, or local inference
  boundaries;
- void.chat persistence-before-broadcast architecture;
- Aveline's memory, mood pass, and inference fallback behavior;
- StyleForge Lite's browser-audio, MIDI, `.STY`, CASM, or hardware-testing experiments;
- FlowCast model evaluation, dataset limits, multi-horizon results, and live-inference limitations;
- portfolio architecture, accessibility, or agent-governance workflow;
- controlled debugging and deployment failures such as the Cloudflare blank-page incident.

These are candidate subjects, not permission to invent article content or metrics.

### Product non-goals for the initial release

- A general-purpose blogging platform.
- A hosted CMS or WYSIWYG editor.
- User accounts, comments, reactions, likes, follows, or bookmarks.
- Newsletter signup or subscriber data.
- Ads, sponsorship placements, affiliate content, or engagement tracking.
- A daily or weekly publishing commitment.
- Automated publication directly from AI output.
- Runtime rendering of untrusted Markdown or MDX.
- A separate visual brand disconnected from ATRX.
- Replacing project case studies with articles.
- Forcing every article to contain an interactive demo.
- Claiming crawler/social-preview behavior that has not been validated on the deployed static host.

### Core reader journeys

#### Journey A — portfolio to note

1. Visitor understands Arppith on `/`.
2. Visitor opens `Field Notes` from the persistent navigation or a relevant project link.
3. Index presents a clear featured note and chronological archive.
4. Visitor opens an article.
5. Article provides grounded detail and a relevant path back to the project, repository, or portfolio.

#### Journey B — direct article arrival

1. Visitor arrives directly at `/blog/:slug` from search, social, a resume, or a shared link.
2. The route loads successfully on Cloudflare Pages.
3. The visitor immediately sees ATRX/Arppith identity, article context, date, and purpose.
4. The article remains readable without prior knowledge of the homepage.
5. Navigation provides a clear path to Field Notes and the portfolio.

#### Journey C — technical browsing

1. Visitor selects a tag.
2. Matching published notes appear without losing keyboard focus.
3. Visitor opens multiple notes using normal browser navigation.
4. Back/Forward behavior and index position remain predictable.

#### Journey D — authoring and publication

1. A local MDX note begins as `draft`.
2. Metadata and content are validated.
3. Desktop/mobile/accessibility/technical claims are reviewed.
4. Status changes to `published`.
5. Sitemap and route discovery update from the same publication truth.
6. The deployed direct URL and metadata are verified.

### Information architecture

The site becomes:

```text
ATRX Portfolio
├── /                         Interactive portfolio
│   ├── Now building
│   ├── Projects
│   ├── Architecture
│   ├── Experiments
│   ├── Terminal
│   ├── Capabilities
│   ├── About
│   └── Contact
├── /blog                     Field Notes index
├── /blog/:slug               Published article
└── /*                         Intentional not-found experience
```

Homepage section links remain stable. Blog introduction must not rename existing portfolio sections or
break external links to homepage fragments.

### Content model

A note has:

- stable slug;
- title;
- concise description;
- publication date;
- optional meaningful update date;
- draft, published, or archived status;
- normalized tags;
- optional series;
- optional featured state;
- optional local cover with accurate alt text;
- optional project/repository association;
- MDX body using an approved component set.

The content model must support ordinary prose first. Article-specific custom visuals are extensions, not
mandatory structure.

### Visual product direction

Field Notes should feel like an engineering archive inside the ATRX control room:

- black technical-editorial canvas;
- strong white titles;
- comfortable neutral body copy;
- timestamps, tags, routes, and system labels in monospace;
- restrained blue/red signal accents;
- thin hairlines and deliberate square geometry;
- featured editorial composition rather than a generic equal-card grid;
- custom diagrams only where they explain real architecture or evidence;
- near-zero decorative motion while reading.

The detailed visual contract lives in the ATRX-specific blog section of `DESIGN.md`.

### Product success criteria

The Field Notes expansion succeeds when:

- a direct visitor understands the article and Arppith's identity without first visiting `/`;
- a recruiter can scan the index and identify credible technical writing quickly;
- a developer can distinguish architecture, implementation, results, limitations, and future work;
- every published note has a stable direct URL;
- homepage navigation and interactions remain intact;
- draft notes are absent from production discovery and direct routes;
- article metadata, canonical URLs, structured data, and sitemap agree;
- body text remains comfortable across mobile, desktop, keyboard, reduced motion, and 200-percent zoom;
- code, tables, images, and diagrams remain contained;
- adding a note does not require modifying unrelated presentation components;
- published technical claims remain traceable to supplied evidence;
- the static deployment remains free of required servers, secrets, analytics, or user data storage;
- all existing and new verification gates pass before public push.

### Launch acceptance criteria

The initial implementation is launch-ready only when:

1. `/` renders the existing portfolio without regression.
2. `/blog` renders the real Field Notes index.
3. At least one user-approved published note or a deliberately empty truthful index is used; no invented
   filler is published.
4. A valid article route survives direct production loading and refresh.
5. An invalid slug renders an intentional not-found state.
6. Header, footer, command palette, homepage section anchors, and browser history behave correctly.
7. Draft/published/archive logic is tested.
8. Route metadata is replaced and cleaned up correctly.
9. Sitemap contains `/blog` and published notes only.
10. Desktop and mobile article layouts have no page-level horizontal overflow.
11. Keyboard and reduced-motion paths are validated.
12. Existing portfolio tests plus new blog tests pass.
13. README and governance files describe how to publish safely.
14. Production deployment is checked by visible content and metadata, not HTTP status alone.

### Future possibilities, not current commitments

These may be considered after the initial system is stable:

- static prerendering or generation for route-specific HTML and stronger crawler/social-preview behavior;
- RSS/Atom or JSON Feed generated from the same published registry;
- full-text client-side search after the archive becomes large enough;
- series landing pages;
- custom interactive essays using lazy-loaded project components;
- an automated image pipeline;
- a private authoring preview workflow;
- migration from local content to a CMS only if local MDX becomes a demonstrated constraint.

No future item should be added merely because blogging platforms usually have it.

### Governance impact

The blog changes durable product scope and therefore requires synchronized updates:

- `AGENTS.md` owns implementation, editorial truth, workflow, and verification rules;
- `PROJECT.md` owns the product purpose and acceptance criteria in this section;
- `ARCHITECTURE.md` owns routes, content loading, metadata flow, deployment, and test boundaries;
- `DESIGN.md` owns Field Notes index and article presentation;
- `STATUS.md` must track the active implementation commit, verification, known SPA/prerender limitation,
  and production deployment state.

The original portfolio goals and iteration record remain valid and are not removed by this expansion.
