# ATRX 3D portfolio: reference research and proposed direction

Research date: 2026-10-07 (Asia/Calcutta). This is a design proposal, not an implemented or approved replacement. Current production remains the existing portfolio.

## Design read

A complete visual overhaul for recruiters, developers, and curious visitors, with cinematic real-time 3D, tactile interaction, and an original engineering identity. The proposed experience should feel like entering an authored exhibition of Arppith's work.

The desired sense of investment should come from detailed assets, consistent materials, composed lighting, camera choreography, useful interactions, and thorough polish. Simply increasing the number of animated components would not establish that quality.

Working design priorities: high visual variation, high motion ambition, and moderate information density. These describe a target, not verified behavior. Proposed aesthetic: industrial objects exhibited in a contemporary digital gallery. Existing framework and content systems remain useful foundations.

## Existing portfolio baseline

The homepage was inspected in the browser at [the public portfolio](https://atrx07.pages.dev/), and its composition and CSS were read locally. The route-loading shell resolved into the actual homepage during inspection.

- Black foundation; white Cabinet Grotesk display typography; blue/red signal colors; monochrome ATRX portrait artwork.
- Dense persistent navigation, recruiter/developer/chaos modes, discovery, optional sound, command palette, project details, architecture playground, and safe terminal.
- Traelyx as current-build representation and NeuraLoc-Core as the deeper local-AI case study. Seven featured projects remain represented.
- `/`, `/blog`, and `/blog/:slug` supported by React Router and a validated local MDX system.
- Existing stack already supplies React 18, Vite, TypeScript, Tailwind 3, GSAP, and Framer Motion. Three.js, React Three Fiber, and Drei are absent from the current manifest.

Preserve identity, factual project data, public article URLs, reading quality, contact paths, keyboard behavior, privacy, and the useful interaction capabilities. Recompose their presentation around the new visual concept. The portrait-led hero, boxed console composition, and repeated schematic framing are candidates for replacement in the isolated redesign.

No current search-ranking or measured performance baseline was collected in this research pass. Those must be measured before implementation/release comparisons.

## Supplied tabs and selected references

All four user-opened tabs were inspected. Their existing URLs were retained. Additional detail pages were opened in temporary research tabs.

| Reference | What was examined | What it contributes to ATRX | Evidence boundary |
| --- | --- | --- | --- |
| [ThreeUI browse](https://threeui.com/browse?sort=recent) | Visual catalog and categories covering scenes, assets, typography, controls, and motion | A vocabulary of materials and interaction studies | A library catalog, not a coherent portfolio direction by itself |
| [Dribbble 3D hero search](https://dribbble.com/search/3d-hero) | Rendered search gallery and selected authored shots | Art direction, object scale, lighting, typography balance | Gallery images and films do not prove production behavior |
| [21st 3D hero catalog](https://21st.dev/community/components/s/3d-hero) | Catalog, selected previews, dependencies, and page-provided metadata tools | React interaction examples and alternate implementation approaches | Displayed catalog counts were inconsistent; no count is used as evidence |
| [GSAP](https://gsap.com/) | Homepage, motion categories, and official documentation | A shared choreography system for camera and page transitions | Current repository already includes GSAP; new plugin use still requires version verification |
| [App&Flow 3D hero, Nicolas Solerieu](https://dribbble.com/shots/27007279-App-Flow-3D-hero) | Loaded muted media preview and creator description | A custom physical instrument with chunky dials connects interaction to identity | Creator describes a guitar-pedal-inspired model; the Dribbble media is a recording |
| [GitHub 3D hero concept, Nicolas Solerieu](https://dribbble.com/shots/21444980-3D-hero-concept) | Loaded muted preview and creator description | Dramatic light and a restrained flip reveal | Creator explicitly describes a Figma auto-animate prototype, not a live WebGL implementation |
| [App Orbit](https://threeui.com/three-js/app-orbit) | Public preview media and material/control descriptions | Object focus, shared material family, and a clear gallery-selection interaction | Pro source and live renderer were gated; source was not accessed |
| [Orrery](https://threeui.com/hero/orrery-page) | Public page and preview surface | Hero composition using a plinth, orbital geometry, and compact navigation | Pro preview reference only |
| [NODAL](https://threeui.com/landing-pages/nodal-landing-page) | Public page and authored object-story description | Assembly and exploded construction reveal as a way to explain a system | Pro preview reference only; no live scroll sequence was tested |
| [Perspective UI: DreamCut](https://threeui.com/motion-design/perspective-ui/dreamcut) | Public preview media and dimensional-panel description | Taking real product screens through perspective and depth transitions | Pro preview reference only; avoid borrowing its product or imagery |
| [Structure Flow](https://threeui.com/three-js/structure-flow) | Public renderer surface, variant controls, and the Topology Field selection | A bounded network study for explaining architecture | Observed catalog/variant state; no FPS or performance claim is made |
| [Volumetric Studio](https://21st.dev/@alexperezcedeno/components/volumetric-studio) | Rendered preview, usage sample, and metadata | Composed lighting can create depth without a cluttered scene | Provider metadata reported unknown license; reference only pending verification |
| [Cosmos 3D orbit gallery](https://21st.dev/@vaib215/components/cosmos-3d-orbit-gallery) | Page-provided metadata and dependencies | Alternative spatial project selection pattern | Unknown license reported; no interaction audit was performed |
| [Phone Scroll Hero](https://21st.dev/@ruixen.ui/components/phone-scroll-hero) | Rendered embedded preview, usage sample, metadata, and displayed MIT license | A device can move from oblique presentation into a readable screen | Its 3D appearance is achieved with a Framer Motion approach; reuse rights for demo media are separate |
| [Animated Top Dock](https://threeui.com/css/animated-top-dock) | Public descriptions of its proximity/spring variants | Restrained feedback on persistent navigation | Pattern inspiration; no code imported |
| [Liquid Metal Button](https://threeui.com/buttons/liquid-metal-button) | Public descriptions of pointer response and press ripple | One memorable tactile primary control | A separate WebGL renderer per button would be an architectural concern; prefer DOM/CSS controls for most actions |
| [Uplink Loader](https://threeui.com/css/uplink-loader) | Public loader description | A reference for a loading system with authored visual identity | Its decorative telemetry is not a basis for displaying invented loading data |

## Production experience references

| Reference | Observation | Design lesson |
| --- | --- | --- |
| [Lusion](https://lusion.co/) | Homepage loaded into a polished, large-scale 3D object composition; scroll observation showed the visual continuing beneath persistent navigation | Strong object design, material consistency, and an editorial frame make the 3D feel integrated. Use this as a craft benchmark, not a layout to clone |
| [Immersive Garden](https://immersive-g.com/) | The entry resolved into a sculptural light environment; a scroll observation showed a composed spatial transition | Atmosphere and continuity can make a page feel like a place. ATRX needs its own engineering-specific objects and readable content layer |
| [Bruno Simon](https://bruno-simon.com/?lang=en) | Rendered a vehicle-based 3D start scene with an explicit start prompt; the driving experience was not entered | Shows the potential for a memorable navigable world. An optional playful layer is plausible, but portfolio essentials should remain directly reachable |
| [Codrops scroll-reactive 3D gallery](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/) | Author tutorial reviewed | Depth, image placement, and bounded input response can share one progression value. We can apply this principle with native page scrolling and our own content |
| [Codrops scroll-driven portfolio case study](https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/) | Author case study reviewed | Scene transitions deserve design time of their own. An opening transition can make project entry part of the portfolio's identity |

[Active Theory](https://activetheory.net/) was also checked through web research, but the text response did not expose enough usable evidence for a detailed assessment. It is not treated as a visually audited reference. Two documentation/detail URLs also failed to return usable web content; no conclusions rely on those failed reads.

## Recommended direction: Arppith Andrews / ATRX systems exhibition

An original precision-built assembly sits in a composed studio environment. It contains recognizable project artifacts: a mobile device, a local compute module, communication surfaces, and smaller experimental instruments. Its arrangement changes with page progression. Each project has a distinct exhibit, connected through the same lighting and material system.

The sculpture is a new portfolio illustration, not a replacement logo and not a depiction of hardware that Arppith claims to have manufactured. Preserve the existing ATRX identity mark until a separate identity change is approved.

### Personal identity hierarchy

User requirement, added 2026-10-07: **ARPPITH ANDREWS** receives equal or slightly greater visual emphasis than **ATRX** and **atrx07**. The full name identifies the person, ATRX carries the creative identity, and atrx07 is the username. All three remain prominent in the composition.

Place the full name in the initial desktop and mobile viewport, with equal or slightly stronger overall visual weight through type scale, contrast, and placement. Design the identity and 3D assembly together so the scene supports recognition. Preserve this hierarchy during loading and in reduced-motion/static presentations; revealing the name must not require a scroll, hover, or completed animation.

### Visual language

- Graphite, silver, ceramic, and controlled translucent surfaces. ATRX blue can supply the shared interaction accent; functional warning colors remain semantic.
- A considered typographic family with expressive display sizing and comfortable sentence-case explanation. Typography and object composition must be designed together.
- Bevelled edges, deliberate roughness, contact shadows, environmental reflections, and light that explains object shape.
- Precise image framing, including genuine sanitized screenshots or recordings for the projects that have them.
- Restrained atmosphere around the exhibits; readable pages and clear links remain available throughout.

Explore a light studio treatment and a dark studio treatment in the concept stage, then choose a coherent presentation. Do not assume that the existing black palette is the only way to retain ATRX identity.

### Interaction map

| Surface | Proposed experience | Purpose and fallback |
| --- | --- | --- |
| Arrival | ARPPITH ANDREWS appears with equal or slightly greater emphasis than the prominent ATRX and atrx07 identities alongside a still visual; the live assembly becomes interactive as it loads | Visitors immediately know whose portfolio this is on desktop and mobile. Failed or unavailable WebGL leaves a designed poster and ordinary content with the same identity hierarchy |
| Hero assembly | Bounded pointer response; optional drag-to-inspect with a clear reset | Demonstrates physicality and craftsmanship. The object settles at rest; essential actions remain DOM buttons |
| Hero to work | Scroll separates the assembly and moves the camera toward the first exhibit | Connects the overview to individual work. Section links skip directly to useful content |
| Traelyx exhibit | Device and schematic route respond together; visitors reveal recording, local analysis, replay, and optional connected boundaries | Represents the verified portfolio content. Use a clearly labeled synthetic schematic instead of anyone's location history; actual product screens only when available and sanitized |
| NeuraLoc-Core exhibit | A layered compute assembly opens to explain inference, memory, orchestration, and state | Makes architecture tangible. Node descriptions remain readable and keyboard selectable; visuals do not imply unsupported performance |
| Project collection | Larger project exhibits with meaningful depth and focus; selecting an exhibit opens its details | Supports exploration without making visitors navigate an entire game world. Provide visible project links and touch/keyboard equivalents |
| Project entry and return | Selected object or visual expands into details; returning restores the prior position and selection | Makes transitions useful and reversible. Escape/Back behavior and focus are part of the implementation |
| Navigation | Persistent, compact DOM navigation with understated spring feedback | Lets recruiters reach projects or contact immediately. Preserve useful anchors and shortcuts |
| Terminal and discovery | Optional interaction tools remain reachable within the new presentation | Preserves existing product capabilities without putting them in front of core content |
| Field Notes | A restrained exhibit can introduce the writing archive; article pages remain comfortable reading surfaces | Preserves `/blog` and published slugs. Remove distracting ambient animation while reading |
| Contact | A composed final object state and clear contact links with immediate copy feedback | Completes the journey. Optional sound remains opt-in; no invented backend contact form |

### Two alternative art directions

**Tactile workbench:** a custom instrument on a bright studio table, with controls that select real project categories and transform the exhibited object. More playful and physically grounded; inspired by the idea of purposeful dials in App&Flow, with an original shape and interface.

**Spatial archive:** project imagery and architectural layers arranged in a deep gallery, where selection draws a project into the foreground and the same visual unfolds into details. More editorial and image-driven; requires a strong set of actual project screenshots and recordings.

The systems exhibition is the leading recommendation because it can express local AI, native/mobile work, real-time software, and experiments within one visual idea. These alternatives are proposals, not tested user preferences.

## Technical approach

### GodUI follow-up: smaller interface elements

Added 2026-10-07 following the user's request to inspect [GodUI Components](https://godui.design/docs/components). The original user-opened tab was inspected and retained. A temporary detail tab was used to inspect the Button, Dialog, Tabs, Sheet, Lab index, Magic Tab, Morphing Dialog, and Magnetic Button surfaces. Dialog and Sheet were opened; tab selection was exercised, including the site's mobile preview; Magic Tab's Without Rainbow example and the expanded Morphing Dialog were visually inspected. These are reference checks, not a complete keyboard, screen-reader, browser, or performance audit. Magnetic pointer behavior was documented but not measured. An immediate Escape snapshot of Morphing Dialog still contained the dialog; dismissal timing and focus restoration were not verified in this pass.

The proposed use is a small, consistent DOM interface around the authored 3D exhibition. Keep its typography, surface materials, spacing, and motion coordinated with the scene and with ARPPITH ANDREWS / ATRX / atrx07 identity hierarchy.

| Candidate | Portfolio use | Selection guidance |
| --- | --- | --- |
| [Button](https://godui.design/docs/components/button) | Project links, contact, reset scene, close details | A spring press is a useful default; adapt the styling to the portfolio |
| [Tabs](https://godui.design/docs/components/tabs) / [Magic Tab](https://godui.design/docs/lab/navigation/magic-tab) | Select a project view or useful content mode | Leading choices: a simple sliding indicator or a restrained raised tab with rainbow disabled; implement associated panels and keyboard behavior |
| [Dialog](https://godui.design/docs/components/dialog) / [Sheet](https://godui.design/docs/components/sheet) | Readable project details and mobile navigation | Prefer these core primitives for focus and overlay foundations; preserve scene position when returning |
| [Morphing Dialog](https://godui.design/docs/lab/overlays/morphing-dialog) | Selected project thumbnail expands into details | Strong transition reference; audit focus trapping, accessible naming, Escape, history, and return behavior before deciding to reuse it |
| [Magnetic Button](https://godui.design/docs/lab/buttons/magnetic-button) | One or two prominent desktop actions | Use bounded movement and a centered label; ordinary touch/keyboard actions remain available |
| [Progress](https://godui.design/docs/components/progress), [Skeleton](https://godui.design/docs/components/skeleton), [Sonner](https://godui.design/docs/components/sonner) | Asset loading, temporary content placeholders, copy feedback | Catalog-level candidates only in this pass. Show real progress when measurable; identity and useful navigation remain visible while assets load |

The local repository already contains GodUI-derived Mask Button/Mask Link, Magic Tab, Orbiting Circles, and Agent Flow components. Evaluate these existing adaptations before copying upstream replacements. The ui-assets skill's bundled references describe native semantics, reduced-motion behavior, and mobile containment for relevant components. Holographic Card is an optional accent, not a selected default; its bundled implementation uses fixed foil colors and would need a contrast/style review. The existing terminal's functionality should guide any terminal presentation reuse.

Compatibility: the current [installation guide](https://godui.design/docs/installation) targets React and Tailwind CSS 4, with copied shadcn registry source and shared motion tokens. This portfolio uses Tailwind 3.4, so the advertised drop-in compatibility is not automatically applicable here. Inspect exact imports, peers, CSS tokens, and registry effects before integration. Prefer small adaptations consistent with the existing stack; do not migrate the styling framework merely to add these controls.

The official [motion contract](https://godui.design/docs/guidelines/motion) limits core animations to transform, opacity, and filter and documents reduced-motion handling. Lab pieces are outside that enforced core contract: the inspected Magic Tab, Magnetic Button, and Morphing Dialog surfaces displayed Paint badges. Their cost must be measured alongside the WebGL scene. This research does not establish that every effect composites cheaply on every target device.

The upstream repository's [MIT license](https://github.com/LucasBassetti/godui/blob/main/LICENSE) was inspected. Retain its copyright and permission notice with reused source, and check separate dependency/media provenance for the selected components. No installer, MCP configuration, source import, package installation, or production change was performed. Web text retrieval of the Sheet, Progress, and Sonner detail pages failed; Sheet was inspected successfully in the browser, while Progress/Sonner conclusions remain catalog-level.

Keep the current React/Vite application architecture. Introduce a lazy, route-owned 3D layer and preserve typed portfolio data and the MDX registry.

Use Three.js with React Three Fiber and selected Drei helpers as the leading candidate. The official [Fiber installation guide](https://r3f.docs.pmnd.rs/getting-started/installation) pairs Fiber 8 with React 18 and Fiber 9 with React 19. This repository uses React 18, so installing the newest major without checking peers would be incorrect. Verify exact Three.js, Fiber, and Drei versions before adding dependencies; do not introduce a framework migration solely for this redesign.

Use GSAP to own scene progression and camera transitions. [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) supports scroll-linked timelines and pinning; [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) supports responsive and reduced-motion setups with cleanup. Keep scroll behavior ordinary outside deliberately bounded scenes. Existing Framer Motion can handle isolated DOM transitions. Assign each animated property one owner so the libraries do not compete.

Prefer one shared canvas across adjacent homepage scenes, with explicit loading and disposal boundaries. Keep readable text, buttons, links, project descriptions, and keyboard focus in the DOM. A canvas should not become the only navigation surface.

Use authored or procedural original geometry for the hero. For detailed assets, a model-authoring workflow can export GLB. The official [Three.js GLTFLoader documentation](https://threejs.org/docs/pages/GLTFLoader.html) supports Draco, Meshopt, and KTX2-related loader integration; compression choice should follow the actual asset and measurement, not be installed speculatively.

[Spline's React integration](https://github.com/splinetool/react-spline) is an alternative for visual scene authoring, exposing scene objects and events. My recommendation is the Three.js/Fiber candidate for the first prototype because its scene behavior can be owned directly alongside this portfolio's routing and state. That is an engineering preference, not a measured claim that Spline is slower.

## Asset and performance plan

The main asset investment is an original, carefully finished hero assembly and two strong project exhibits. A collection of generic spheres or a set of unrelated downloaded scenes would not meet this brief.

Inventory needed assets before coding: hero assembly, device geometry, local compute assembly, environment lighting, model textures, verified project media, static fallback renders, and licensed font files. Current public assets chiefly cover ATRX artwork and the Traelyx mark; this research did not find a full project-screenshot set in `public/`.

[Poly Haven's asset license](https://polyhaven.com/license) identifies its HDRIs, textures, and models as CC0. It is a candidate source for lighting/material inputs, with exact chosen assets recorded later. That does not extend reuse rights to its website artwork or example renders. Nothing was downloaded or purchased in this research pass.

The [Fiber performance guide](https://r3f.docs.pmnd.rs/advanced/scaling-performance) supports rendering at rest only when needed, resource reuse, instancing, level of detail, and adaptive quality. Apply these deliberately, pause nonessential work when hidden, and keep loading staged.

Proposed prototype targets, all unmeasured: a stable 60 FPS on a representative desktop, a usable 30 FPS floor on an agreed midrange phone, LCP under 2.5 seconds, INP under 200 ms, and CLS under 0.1 under documented test conditions. Use them as review gates, not public achievements. Establish transfer-size and GPU budgets after the first asset and lighting study rather than promising a size without evidence.

Mobile gets its own composition: fewer visible objects, less expensive lighting/effects, readable text placement, and tap-based controls. Reduced motion removes continuous rotation, pointer parallax, and camera travel while keeping the designed still compositions and all information. WebGL failure, context loss, and slow asset loading must have deliberate recovery paths.

## First prototype and staged delivery

The first reviewable unit should include: arrival, an original interactive hero assembly, a scroll transition into Traelyx, an accessible project-details opening, and a return to the same exhibit. Include a mobile composition and reduced-motion/static version in that prototype. Its purpose is to prove the art direction, motion ownership, and device behavior together.

Prototype review must also confirm that ARPPITH ANDREWS has equal or slightly greater emphasis than ATRX and atrx07 in the first screen, across desktop, mobile, loading, and reduced-motion/static presentations.

Once that sequence feels convincing, add the NeuraLoc exhibit, remaining project collection, about/contact surfaces, optional tools, and Field Notes integration. Avoid building every section before the central scene and interaction style are judged.

Development isolation must be resolved before application edits. The preferred proposal is a dedicated branch and managed worktree with its own local server and, later, a separate preview deployment. Repository instructions require explicit branch authorization; none was created during this research request. Before pushing preview work, inspect the actual Cloudflare deployment configuration and confirm the preview cannot replace production. A new public `/v2` route on the current site is not the proposed discovery workflow.

Preserve the production baseline and public content throughout. Existing workstreams continue to own their own handoffs. Use regressions covering project truth, navigation, published notes, metadata, contact actions, modes, terminal, and discovery whenever shared implementation changes.

Release only after explicit user approval of a concrete, working replacement. Then validate deployment identity, deep links, mobile use, asset loading, and article behavior live. Keep the prior deployable release available for rollback.

## Research outcome

Discovery produced a leading concept, two alternative directions, a sourced reference map, an interaction plan, asset requirements, compatibility notes, and a first-prototype scope. It did not produce application code, a performance benchmark, a preview deployment, or a finished redesign. No production settings, dependencies, external project files, or other workstream state were changed.
