---
version: alpha
name: BMW M-design-analysis
description: A motorsport-engineering interface anchored on a near-black canvas with white BMW Type Next Latin display headlines in confident UPPERCASE. The brand carries no decorative voltage — its energy comes from full-bleed automotive photography (cars on tracks, driver-cockpit shots, carbon-fiber detail) and the iconic M tricolor stripe (light blue → dark blue → red) used sparingly as a brand signature on logos, dividers, and motorsport chrome. Type stays light to medium weight to feel European-engineered, never American-bombastic.

colors:
  primary: "#ffffff"
  ink: "#ffffff"
  body: "#bbbbbb"
  body-strong: "#e6e6e6"
  muted: "#7e7e7e"
  hairline: "#3c3c3c"
  hairline-strong: "#262626"
  canvas: "#000000"
  surface-card: "#1a1a1a"
  surface-elevated: "#262626"
  surface-soft: "#0d0d0d"
  on-primary: "#000000"
  on-dark: "#ffffff"
  m-blue-light: "#0066b1"
  m-blue-dark: "#1c69d4"
  m-red: "#e22718"
  bmw-blue: "#1c69d4"
  electric-blue: "#0653b6"
  carbon-gray: "#2b2b2b"
  warning: "#f4b400"
  success: "#0fa336"

typography:
  display-xl:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 80px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0
  display-lg:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: 0
  display-md:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0
  display-sm:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0
  title-lg:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  label-uppercase:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 1.5px
  body-md:
    fontFamily: "BMWTypeNextLatin Light, BMWTypeNextLatin, sans-serif"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "BMWTypeNextLatin Light, sans-serif"
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.5px
  button:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 1.5px
  nav-link:
    fontFamily: "BMWTypeNextLatin, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.5px

rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 16px 32px
    height: 48px
  button-primary-outline:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 16px 32px
    height: 48px
  button-on-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 16px 32px
  button-icon:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    size: 48px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    typography: "{typography.label-uppercase}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    height: 64px
  hero-photo-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-xl}"
    padding: 96px
  m-stripe-divider:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    height: 4px
  feature-photo-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.none}"
    padding: 24px
  model-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.none}"
    padding: 24px
  magazine-article-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.none}"
    padding: 24px
  spec-cell:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 24px
  cookie-consent-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 24px
  category-tab:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.label-uppercase}"
    padding: 12px 0
  category-tab-active:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    typography: "{typography.label-uppercase}"
    padding: 12px 0
  text-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 12px 16px
    height: 48px
  chatbot-launcher:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.none}"
    padding: 24px
  cta-band-photo:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-md}"
    padding: 80px
  motorsport-photo-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.none}"
  carousel-arrow:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    size: 48px
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 64px
---

> [!IMPORTANT]
> ## ATRX authority notice
>
> The BMW M material in this file is retained as historical design research only. It is **not** a
> literal implementation specification and must not be treated as permission to reproduce BMW branding,
> M marks, automotive photography patterns, proprietary BMW typography, or exact branded components.
>
> For the ATRX portfolio, authority flows in this order:
>
> 1. the current production implementation and verified ATRX behavior;
> 2. the ATRX Interaction Extensions already documented in this file;
> 3. the ATRX Field Notes / Blog Design System added below;
> 4. general principles inferred from the BMW reference, such as strong editorial hierarchy, restrained
>    color, square geometry, and generous spacing.
>
> Where the BMW analysis conflicts with ATRX identity, content, accessibility, available fonts, project
> visuals, or blog readability, the ATRX-specific rule wins. Never require BMW Type Next Latin or any
> other unlicensed/proprietary font. Never use BMW, M, or automotive brand language in public ATRX UI.


## Overview

BMW M's marketing surface is a near-pure black canvas (`{colors.canvas}` — #000) holding white BMW Type Next Latin headlines in **confident UPPERCASE**. The system has no decorative voltage of its own; brand energy comes from **full-bleed automotive photography** — cars cornering at speed, carbon-fiber wheel detail, driver cockpit shots, motorsport pit lanes — placed as edge-to-edge content that fills entire bands. UI chrome around the photography stays minimal: thin sans-serif copy, dividers as 1px hairlines (`{colors.hairline}`), all-caps button labels with no fill until hovered.

The **M tricolor stripe** — `{colors.m-blue-light}` (#0066b1) → `{colors.m-blue-dark}` (#1c69d4) → `{colors.m-red}` (#e22718) — appears sparingly as the brand's signature accent, used on the M wordmark, motorsport chrome, vehicle-tech callouts, and model badges. It is never a CTA color and never used as a background fill — the tricolor is exclusively a brand-identity marker.

Type voice runs **BMW Type Next Latin** in two cuts: regular for display + nav labels and Light for body + secondary copy. Display sizes use weight 700 (BMW's signature heavy-but-tight setting), while body type drops to weight 300 (Light). The contrast between heavy display and light body is the system's editorial signature.

**Key Characteristics:**
- Near-pure black canvas (`{colors.canvas}` — #000) with white type. The system inverts almost nothing — there is no light-mode marketing surface.
- Display headlines in UPPERCASE BMW Type Next Latin at weight 700. Sub-heads stay sentence-case at lighter weight.
- M tricolor (`{colors.m-blue-light}` / `{colors.m-blue-dark}` / `{colors.m-red}`) used as 4px brand-stripe dividers, M-wordmark accents, and motorsport chrome — never as buttons or fills.
- Photography fills entire bands edge-to-edge. Cars are always the visual subject; UI chrome backs off to small white labels overlaid on photography.
- Buttons are flat with `{rounded.none}` (0px) corners and uppercase letterspaced labels. The "industrial precision" rectangular silhouette IS the brand.
- Border radius is mostly zero across the system. The few exceptions: `{rounded.full}` on circular icon buttons (carousel arrows, chatbot launcher) and `{rounded.sm}` on a handful of small toggle pills.
- Spacing is generous and grid-aligned: `{spacing.section}` (96px) between major bands; `{spacing.xxl}` (64px) inside hero photo bands; `{spacing.xl}` (40px) inside content cards.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}` — #ffffff): The system's primary type and CTA color. Used for h1/h2/h3 display, body text on dark, and primary button labels (the buttons themselves are transparent or canvas-colored — the white text + outline IS the button).
- **M Blue Light** (`{colors.m-blue-light}` — #0066b1): The first stop in the M tricolor stripe. Used on M-badge accents and motorsport chrome.
- **M Blue Dark** (`{colors.m-blue-dark}` — #1c69d4): The middle stop. The same hex as `{colors.bmw-blue}` — BMW's heritage corporate blue, repurposed as the middle band of the M stripe.
- **M Red** (`{colors.m-red}` — #e22718): The third stop. The signature M-power red, used in the stripe and on motorsport-pace callouts.
- **Electric Blue** (`{colors.electric-blue}` — #0653b6): A separate electric-vehicle accent used on M xDrive electric model pages. Distinct from the heritage blue — feels colder, more digital.

### Surface
- **Canvas** (`{colors.canvas}` — #000000): The default page floor across every marketing surface. True black.
- **Surface Soft** (`{colors.surface-soft}` — #0d0d0d): A barely-different-from-black used for spec table cells and footer-adjacent strips.
- **Surface Card** (`{colors.surface-card}` — #1a1a1a): Cards, secondary buttons, icon-button backgrounds.
- **Surface Elevated** (`{colors.surface-elevated}` — #262626): One step lighter, used for nested cards inside dark bands.
- **Carbon Gray** (`{colors.carbon-gray}` — #2b2b2b): Carbon-fiber-inspired surface tone used on technical-spec cards.

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — #3c3c3c): The 1px divider tone on dark surfaces. Used between body sections, between table rows, around card outlines.
- **Hairline Strong** (`{colors.hairline-strong}` — #262626): Same hex as `{colors.surface-elevated}` — borders feel like one-step elevations rather than ink lines.

### Text
- **Ink / On Dark** (`{colors.on-dark}` — #ffffff): All headline and primary text on dark canvas.
- **Body** (`{colors.body}` — #bbbbbb): Default running-text color (slightly cooler than pure white). Used for body paragraphs and secondary metadata.
- **Body Strong** (`{colors.body-strong}` — #e6e6e6): Emphasized body / lead paragraph.
- **Muted** (`{colors.muted}` — #7e7e7e): Footer links, breadcrumbs, captions.

### Semantic
- **Warning** (`{colors.warning}` — #f4b400): Used very sparingly on technical-warning callouts.
- **Success** (`{colors.success}` — #0fa336): Order-confirmation states (rare on marketing surfaces).

## Typography

### Font Family
**BMW Type Next Latin** is BMW's licensed display + body typeface. The system uses two cuts: regular and Light. The fallback stack walks `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

The split is a deliberate weight-pair:
- Display (700) for headlines, navigation labels, button text, and category labels — the "stamped" voice
- Light (300) for body paragraphs, descriptive copy, and secondary metadata — the "engineered" voice

The contrast between heavy display and light body is BMW's editorial signature — never blur it by using regular (400) display or medium (500) body.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 80px | 700 | 1.0 | 0 | Hero h1 ("THE ULTIMATE", "MORE BMW M.") |
| `{typography.display-lg}` | 56px | 700 | 1.05 | 0 | Section heads ("MORE FROM BMW M MAGAZINE.") |
| `{typography.display-md}` | 40px | 700 | 1.1 | 0 | Sub-section heads, model names |
| `{typography.display-sm}` | 32px | 700 | 1.15 | 0 | CTA-band heads, category page titles |
| `{typography.title-lg}` | 24px | 700 | 1.3 | 0 | Card titles in 3-up grids |
| `{typography.title-md}` | 20px | 400 | 1.4 | 0 | Card sub-titles, lead paragraphs |
| `{typography.title-sm}` | 18px | 400 | 1.4 | 0 | Spec callouts, intro paragraphs |
| `{typography.label-uppercase}` | 14px | 700 | 1.3 | 1.5px | Category tabs, "VIEW MORE" inline labels |
| `{typography.body-md}` | 16px | 300 (Light) | 1.5 | 0 | Default body — BMW Type Next Latin Light |
| `{typography.body-sm}` | 14px | 300 (Light) | 1.5 | 0 | Footer body, cookie consent, fine print |
| `{typography.caption}` | 12px | 400 | 1.4 | 0.5px | Photo captions, image-credit lines |
| `{typography.button}` | 14px | 700 | 1.0 | 1.5px | All button labels — uppercase, letterspaced |
| `{typography.nav-link}` | 14px | 400 | 1.4 | 0.5px | Top-nav menu items |

### Principles
The system contrasts heavy headlines (700) against very light body (300) at all times — the gap is the editorial signature. Letter-spacing is non-trivial: button labels and category labels carry 1.5px tracking that makes them feel "machined" rather than "typed." Display headlines stay at 0 letter-spacing — BMW Type's natural cap-height handles spacing on large sizes.

UPPERCASE display is the default voice for h1/h2 — sentence case appears on body and intro paragraphs but rarely on headlines. The all-caps treatment is a brand-voice signal, not a stylistic choice.

### Note on Font Substitutes
If BMW Type Next Latin is unavailable, **Inter** (variable) at 700/300 is the closest open-source substitute. Adjust display headline tracking to -0.5px to match BMW Type's tighter spacing at large sizes. **Saira Condensed** is an alternative for headlines if a slightly more compressed feel is desired.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 40px · `{spacing.xxl}` 64px · `{spacing.section}` 96px.
- **Section padding (vertical):** `{spacing.section}` (96px) between major editorial bands.
- **Hero photo bands:** `{spacing.xxl}` (64px) internal vertical padding around the hero h1 + sub-headline pair.
- **Card internal padding:** `{spacing.lg}` (24px) for content and model cards; `{spacing.xl}` (40px) for spec-cell tables.
- **Gutters:** `{spacing.lg}` (24px) between cards in 3-up grids; `{spacing.md}` (16px) inside footer columns.

### Grid & Container
- **Max content width:** ~1440px centered on marketing pages — wider than typical SaaS to give photography breathing room.
- **Editorial body:** Single 12-column grid; photo bands bleed full-bleed (no max-width).
- **Card grids:** 3-up at desktop, 2-up at tablet, 1-up at mobile.
- **Footer:** 4-column link list at desktop, 2-up at tablet, 1-up at mobile.

### Whitespace Philosophy
BMW M trusts photography to do the visual work. Whitespace around photography is restrained — the cars fill the frame, and copy sits below or beside them in tightly-aligned columns. Where whitespace appears (between body sections, around CTAs), it's always uniform `{spacing.section}` (96px). The system never adds atmospheric backdrops, gradients, or decoration — empty space stays as empty black canvas.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body sections, top nav, footer, photo bands |
| Soft hairline | 1px `{colors.hairline}` border | Section dividers, card outlines, table rows |
| Card surface | `{colors.surface-card}` background over canvas — no shadow | Feature photo cards, magazine cards, chatbot launcher |
| Photographic depth | Full-bleed photography with edge-to-edge crop | Hero bands, motorsport features — depth via subject matter, not chrome |

The system uses no drop shadows and no layered chrome. Depth comes entirely from photography (subject + lens + lighting) and the contrast between black canvas and slightly-elevated `{colors.surface-card}`.

### Decorative Depth
- **M Stripe Divider** (`{component.m-stripe-divider}`): A 4px-tall horizontal divider carrying the M tricolor (`{colors.m-blue-light}` → `{colors.m-blue-dark}` → `{colors.m-red}`). Used on motorsport chrome, model-detail headers, and brand-identity moments. The stripe is the system's only true "decorative" element — used sparingly to mark significance.
- **Carbon-fiber surfaces**: The technical-spec page uses `{colors.carbon-gray}` (#2b2b2b) cells with subtle texture overlay. This is a single-page treatment, not a system-wide pattern.
- **Photographic depth**: Full-bleed cars are the depth. Lighting in the photography (track lights, sunset rim-light) does the elevation work that drop shadows would do in a SaaS system.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | All buttons, cards, photo containers, spec cells, inputs — the dominant radius |
| `{rounded.xs}` | 2px | Almost no use — reserved for legal CTAs |
| `{rounded.sm}` | 4px | Small toggle pills on configurator surfaces |
| `{rounded.md}` | 6px | Rare — small dropdown menu items |
| `{rounded.full}` | 9999px / 50% | Circular icon buttons, carousel arrows, chatbot launcher |

The radius hierarchy is "almost always 0, sometimes circular." This binary radius decision is a deliberate brand-language choice — sharp rectangles read as engineered precision; circles read as functional controls. Nothing in between.

### Photography Geometry
Hero photography fills full-width with no rounding. Photo cards inside grids retain `{rounded.none}` corners, edge-to-edge images. Carbon-wheel detail shots and motorsport-pit photos use 16:9 or 21:9 cinema-aspect ratios. Driver portraits in racing-team grids use 4:5 portrait crops, also with sharp corners.

## Components

### Top Navigation

**`top-nav`** — Black nav bar pinned to the top of every page. 64px tall, `{colors.canvas}` background. Carries the BMW M logo at left (M tricolor + BMW roundel + "M" wordmark), primary horizontal menu (Models, Topics, Magazine, Configurator, Fastlane), right-side cluster with language selector, search icon, account icon. Menu items render in `{typography.nav-link}` with sentence-case labels.

### Buttons

**`button-primary`** — The signature primary CTA. Background `{colors.canvas}` (or transparent over photography), text `{colors.on-dark}` (white), 1px white border outline, rounded `{rounded.none}` (0px), padding 16px × 32px, height 48px. Type `{typography.button}` — uppercase 14px / 700 / 1.5px tracking. The rectangular silhouette and uppercase letterspaced label IS the brand button.

**`button-primary-outline`** — Same shape as primary but with transparent background and white outline only. Used over photography where a filled button would clash with the image.

**`button-on-light`** — Used on rare light-surface contexts (configurator, account dialogs). Background `{colors.canvas}`, text `{colors.on-dark}` — black button with white text, inverted from the dark-canvas default.

**`button-icon`** — Circular icon buttons (carousel controls, share, favorite). 48 × 48px, background `{colors.surface-card}`, white icon centered, rounded `{rounded.full}`. The only non-rectangular button shape in the system.

**`carousel-arrow`** — Specific 48 × 48 circular arrow used in photo carousels. Same shape as `{component.button-icon}` with chevron glyph.

**`text-link`** — Inline uppercase letterspaced links ("VIEW ALL MODELS", "READ MORE"). `{typography.label-uppercase}`, white on dark, no underline. The chevron arrow → glyph appears next to most link labels.

### Cards & Containers

**`hero-photo-band`** — Full-width black band with full-bleed automotive photography filling most of the frame. The h1 uses `{typography.display-xl}` (80px / 700) and sits left-aligned over the photo, often with a small subtitle in `{typography.body-md}` below. Vertical padding `{spacing.xxl}` (64px). No card frame — the photo IS the band.

**`feature-photo-card`** — Used in 3-up grids for "MORE FROM BMW M MAGAZINE" and similar editorial sections. Background `{colors.surface-card}`, rounded `{rounded.none}`, internal padding `{spacing.lg}` (24px). Top half of the card is a 16:9 photo (full-bleed within the card); below the photo, a category tag in `{typography.label-uppercase}`, a `{typography.title-lg}` title, and a short body description.

**`model-card`** — Used in the "MORE NEW M MODELS" 3-up grid. Background `{colors.canvas}` (no card surface — just photo on black), rounded `{rounded.none}`. Top: 16:10 hero shot of the model. Below: model name in `{typography.display-md}` (40px / 700), short specs line in `{typography.body-sm}`, a `{component.text-link}` ("EXPLORE THIS MODEL").

**`magazine-article-card`** — A more text-forward card variant used on the magazine overview page. Background `{colors.canvas}` with hairline border, rounded `{rounded.none}`. Carries a small thumbnail at top, a category label in `{typography.label-uppercase}`, headline in `{typography.title-lg}`, and a body excerpt.

**`spec-cell`** — Technical specification cells used on model-detail pages (engine specs, weight, top speed, 0-100 time). Background `{colors.surface-soft}` (#0d0d0d), rounded `{rounded.none}`, padding `{spacing.lg}` (24px). Each cell holds a value in `{typography.display-sm}` (32px / 700) at top and a label in `{typography.label-uppercase}` below.

**`motorsport-photo-card`** — Edge-to-edge photo cards used in the racing-team / motorsport sections. No card surface — just a full-bleed photograph with a small overlay caption in white text at the bottom-left. The photography IS the brand here.

**`chatbot-launcher`** — A right-side card-style entry point ("BMW M CHATBOT") on the homepage. Background `{colors.surface-card}`, rounded `{rounded.none}`, padding `{spacing.lg}` (24px). Carries an h3 title, a short prompt, and a `{component.button-primary}` to launch.

**`category-tab`** + **`category-tab-active`** — The category selector tabs used on the magazine and topics pages (e.g., "ALL · MAGAZINE · MODELS · LIFESTYLE · MOTORSPORT"). Tabs render as text-only labels in `{typography.label-uppercase}`. Active state changes text color from `{colors.body}` to `{colors.on-dark}` and adds a 2px white underline below the label. No background fill, no rounded corners.

### Inputs & Forms

**`text-input`** — Standard text input on dark surfaces. Background `{colors.surface-card}`, text `{colors.on-dark}`, type `{typography.body-md}`, rounded `{rounded.none}` (0px), padding 12px × 16px, height 48px. 1px hairline border. Focus state thickens the border to white.

**`cookie-consent-card`** — A right-side cookie-banner card visible on the homepage. Background `{colors.canvas}` with 1px hairline, rounded `{rounded.none}`, padding `{spacing.lg}` (24px). Body text in `{typography.body-sm}` (14px / 300) — Light weight even for legal text. Two buttons stacked at bottom: primary outline + text-link.

### Signature Components

**`m-stripe-divider`** — The 4px horizontal stripe carrying the M tricolor (`{colors.m-blue-light}` → `{colors.m-blue-dark}` → `{colors.m-red}`). Used as a divider on motorsport chrome, between brand-identity sections, and as a hover-state indicator on category tabs. The most distinctive non-typographic element in the system.

**`cta-band-photo`** — A pre-footer "Drive an M" CTA band carrying full-bleed photography of a car cornering on a track, with a centered headline in `{typography.display-md}` and a `{component.button-primary-outline}` below. Vertical padding 80px. The CTA inherits the editorial gravity of the rest of the page through full-bleed photography rather than chrome.

### Footer

**`footer`** — Black footer that closes every page. Background `{colors.canvas}`, text `{colors.body}`. 4-column link list at desktop covering BMW M Models / BMW M Lifestyle / Owners / Company. Vertical padding 64px. Bottom row carries the BMW corporate disclaimer in `{typography.caption}` and language selector. The footer never inverts — it stays black even when the body might transition.

## Do's and Don'ts

### Do
- Anchor every page with full-bleed automotive photography. The cars are the brand voltage; chrome backs off.
- Use UPPERCASE display headlines in `{typography.display-xl}` or `{typography.display-lg}`. Sentence-case display reads as off-brand.
- Pair heavy display (700) with light body (300). The weight contrast is the editorial signature.
- Reserve the M tricolor stripe for brand-identity moments — wordmark accents, motorsport chrome, model badges. Never as a button fill or surface.
- Use `{rounded.none}` (0px) by default. Reserve `{rounded.full}` for circular icon buttons only.
- Letter-space all-caps labels at 1.5px. The "machined" feel is non-negotiable.
- Use `{spacing.section}` (96px) between major editorial bands for grid-aligned vertical rhythm.

### Don't
- Don't introduce a brand color outside the M tricolor (`{colors.m-blue-light}` / `{colors.m-blue-dark}` / `{colors.m-red}`) and the heritage `{colors.bmw-blue}`.
- Don't bold body type. Body stays at 300 (Light) — bumping to 400 or 500 makes the page feel marketing-bombastic instead of European-engineered.
- Don't use rounded buttons. The rectangular silhouette IS the brand. Rounded corners read as consumer-tech, not motorsport.
- Don't put gradient backdrops behind hero type. The hero IS the photography — the page floor stays pure black, and the photo provides the depth.
- Don't repeat the same surface mode in two consecutive bands. Rhythm: photo band → spec table → photo band → magazine grid → photo band. Two text-only bands in a row read as a corporate site.
- Don't use the M stripe as a button fill. The stripe is a divider / accent — never an action surface.
- Don't bold uppercase tracking under 1.5px on button labels — the spacing is what makes them feel "machined."

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Hamburger nav; hero h1 scales 80→48px; demo grid 1-up; photo cards stack full-width; footer 4 cols → 1 |
| Tablet | 768–1024px | Top nav stays horizontal but tightens; 2-up card grids; spec tables 2-up |
| Desktop | 1024–1440px | Full top-nav; 3-up card grids; spec tables 4-up |
| Wide | > 1440px | Same as desktop with more breathing room; max content 1440px |

### Touch Targets
- `{component.button-primary}` renders at 48 × 48px minimum — meets WCAG AAA.
- `{component.button-icon}` and `{component.carousel-arrow}` are exactly 48 × 48 — comfortably above the 44 × 44 minimum.
- `{component.text-input}` height is 48px.
- Category tabs render as text-only labels with 12px vertical padding; effective tap area meets 44px with surrounding spacing.

### Collapsing Strategy
- Top nav collapses to a hamburger sheet at < 768px; the menu opens as a full-screen black overlay with the M tricolor stripe at the top.
- Photography stays full-bleed at every breakpoint — never collapses to a margin'd container.
- Card grids reduce columns rather than scaling cards down; photography retains its native aspect ratio.
- Spec tables collapse from 4-up to 2-up to 1-up; spec values stay at `{typography.display-sm}` regardless of column count.
- The M-stripe divider stays at 4px height across all breakpoints.

### Image Behavior
- Hero photography crops responsively — wider crops at desktop, vertical crops on mobile.
- Lifestyle and motorsport photos retain native aspect ratios; the system never letterboxes or pillarboxes.
- The M wordmark + tricolor logo scales proportionally with viewport width.

## Iteration Guide

1. Focus on ONE component at a time. Reference its YAML key (`{component.hero-photo-band}`, `{component.spec-cell}`).
2. New components default to `{rounded.none}` (0px). Only use `{rounded.full}` if it's a circular icon button.
3. Variants (`-active`, `-disabled`) live as separate entries in `components:`.
4. Use `{token.refs}` everywhere — never inline hex.
5. Never document hover states. Default and Active/Pressed only.
6. Display headlines stay UPPERCASE 700; body stays sentence-case 300. Never blur the contrast.
7. The M tricolor is brand-identity-only — never extend it to system tokens for "primary action."

## ATRX Interaction Extensions

The portfolio keeps the square, minimally framed button geometry from this system while adding
short sprite-mask transitions to a small set of high-value actions.

- `Explore systems` uses the Urban mask with the primary white face.
- Hero GitHub and copy-email actions use the Forest mask with the secondary outlined face.
- The contact email action uses the Nature mask; repository dialogs reuse Urban.
- Desktop pointer devices animate on hover, focus, and press. Touch devices begin the same transition
  on pointer press without delaying navigation.
- Reduced-motion mode removes the sprite animation while preserving the same black/white state change.

Recruiter / Developer / Chaos uses the bundled Magic Tab behavior in its primary/default semantic
variant with `rainbow` enabled. The showcase's rounded shell and generous gaps are overridden: the
portfolio keeps one sharp rectangular three-way rail with equal-width divisions. The selected tab
lifts four pixels to reveal a restrained edge and shadow using only `m-blue-light`, `m-blue-dark`, and
`m-red`; `rainbow` describes the looping behavior, not an expanded color palette. Arrow keys move
focus without changing mode, Enter or Space commits the choice, and pointer/touch selection remains
immediate. The loop pauses while the rail is off screen. With reduced motion, the color loop and lift
transition stop while selection remains fully legible.

void.chat uses the bundled Orbiting Circles behavior as an architecture-led identity rather than a
decorative solar-system motif. Two counter-rotating tracks surround a stable `void.chat` room core:
Firebase identity, Cloudflare Worker execution, and D1 persistence occupy the outer route; Durable
Object room ownership and WebSocket delivery form the inner live-state route. Nodes remain square-system
circles with concise monospace codes, blue/red/green signal accents, and thin neutral tracks. Desktop
cards keep the full 306 px composition; compact cards scale the same composition instead of changing its
meaning. Reduced-motion mode freezes both rings while preserving every node and label.

Aveline Bot uses the bundled Agent Flow behavior as a compact memory-and-inference route rather than a
generic four-box pipeline. The canvas is fixed: dragging and panning are disabled. Message ingress
branches into warm-yellow mood context and green persistent memory, converges on the blue inference
route, then exits into a red reply node. Only the wide expanded desktop accordion uses a straight
horizontal inference-to-reply route; the desktop detail panel and both mobile contexts keep the dropped
reply composition for stronger vertical balance. The wide linear route may scale up to 1.28x so the
diagram occupies its canvas instead of reading as a small island; stacked routes never scale above 1:1.
Blue travelling packets and traced node borders provide
the primary motion; fine-pointer hover adds only a four-pixel lift and local glow. Node cards use the
trace geometry's restrained 12 px corner radius so the resting border and animated outline remain one
shape. Monospace system labels, the black technical grid, signal palette, and thin hairlines keep that
small radius inside the ATRX control-room language rather than turning it into a rounded SaaS card.
Reduced motion resolves the graph into its completed, fully legible state without replaying the
continuous sequence.

Traelyx owns a distinct local telemetry pipeline rather than reusing Aveline's Agent Flow. Its canonical
blue launcher mark anchors a dense black device surface with three labeled evidence channels, an accepted
private-fixture ledger, and a seven-stage M3 processing rail. The visual should feel like auditing a
deterministic native pipeline after a field run, not watching a bot workflow or consumer driving
dashboard. Signal paths are schematic and explicitly say `NOT LIVE`; the 39m17 fixture duration,
3,689 chunks, 2,322 GNSS fixes, and 939,895 dual-IMU samples are grounded in the public M2.8 record.
Decode through replay reduction reads as verified, while the footer keeps M3.8 fixtures visibly next.
Reduced motion freezes the traces without removing evidence. Do not invent speeds, routes, sensor
readings, drive scores, global confidence percentages, or live telemetry.

8. When in doubt about emphasis: bigger photography before bigger type.

## Known Gaps

- The dembrandt frequency analyzer captured the white text (count 955) as the highest-frequency token. The black canvas was inferred from screenshot — dembrandt's body-background sampling didn't surface it as a top palette entry, but the page is unambiguously black-on-white-text.
- The exact M tricolor stops are documented from public BMW brand guidelines; the screenshots show the stripe as a small element but pixel-sampling at this resolution doesn't reliably distinguish #0066b1 from #1c69d4. Treat the documented stops as canonical based on BMW Design Works' published brand spec.
- BMW Type Next Latin weight axis values beyond Light (300) and regular (700) are not documented — only the static weights observed in screenshots.
- Animation and transition timings (photo carousel transitions, hover-reveal effects, configurator interactions) are not in scope.
- Form validation states beyond `{component.text-input}` defaults are not extracted — error / success input variants would need a configurator or order flow to confirm.
- The configurator surface (vehicle build pages with color / wheel / interior pickers) was not in the analyzed URL set; its swatch grid, comparison panels, and price-summary card are not documented here.
- The cookie consent overlay obscured part of the homepage hero in the captured screenshot; secondary hero treatments (different car models cycling through the hero band) may carry variations not captured.


---

## ATRX Field Notes / Blog Design System

### Design objective

Field Notes is the long-form written layer of the ATRX portfolio. It must feel like entering a quieter
reading bay inside the same control room: the same black technical foundation, white identity, precise
hairlines, signal accents, and square geometry, but with reduced visual pressure and substantially more
comfortable body typography.

The article system must prove that ATRX can be expressive without sacrificing reading. Do not copy the
homepage's highest-density visual behavior into every paragraph. The portfolio may perform; the article
must communicate.

### Identity statement

Public label:

```text
FIELD NOTES
```

Supporting direction:

```text
Systems, experiments, failures, and engineering decisions from the ATRX workbench.
```

This copy may be refined, but the page should remain an engineering archive rather than a lifestyle
journal, generic news site, Medium clone, or fake hacker console.

### Design authority and prohibited reference leakage

For Field Notes:

- use ATRX naming and original signal identity only;
- do not use M badges, BMW logos, M tricolor branding, automotive model-card conventions, cockpit
  photography, or BMW-specific terminology;
- do not require BMW Type Next Latin;
- use the actual licensed/available production font stack already shipped by the portfolio;
- treat reference `m-blue-*` and `m-red` values as legacy token names only where they already map to ATRX
  signal colors; new blog code should prefer ATRX-neutral token names when the stylesheet is refactored;
- no public article should imply BMW affiliation or source its visual identity from BMW.

### Blog visual principles

1. **Reading is the primary interaction.** Motion, filters, diagrams, and links support the text.
2. **Editorial scale, not card repetition.** Use strong title/metadata hierarchy and chronological rhythm.
3. **Signal color is information.** Blue and red mark active routes, states, or emphasis; they do not flood
   article backgrounds.
4. **Monospace is a tool.** Use it for dates, tags, paths, commands, metrics, and code—not entire essays.
5. **Square by default.** Preserve sharp panels and hairlines; small radii are allowed only when inherited
   from a specific reusable component whose geometry requires them.
6. **Wide visuals, narrow prose.** Body copy stays readable while figures may occupy a larger bounded rail.
7. **Failure and limitation are visible.** Warnings, constraints, and corrections receive deliberate,
   calm treatment rather than shame-red drama.
8. **No decorative telemetry.** Every meter, chart, terminal line, graph, or status label must represent
   real article content.
9. **No hover dependency.** Every title, date, tag, link, caption, and explanation is available on touch
   and keyboard.
10. **Quiet while reading.** Continuous orbital, packet, glow, waveform, or cursor motion must not run
    beside long-form text unless the reader explicitly activates a relevant figure.

### ATRX semantic color roles for Field Notes

Use existing production CSS variables when available. If blog-specific aliases are added, map them to the
current ATRX palette rather than introducing a parallel theme.

| Role | Intended use |
| --- | --- |
| `--blog-canvas` | Main near-black page background; normally maps to existing canvas |
| `--blog-surface` | Index rows, figure frames, code blocks, article utility surfaces |
| `--blog-surface-raised` | Active filter, callout header, table header, metadata panel |
| `--blog-ink` | Primary titles and important body text |
| `--blog-body` | Default long-form body copy; softer than pure white |
| `--blog-muted` | Dates, captions, secondary metadata |
| `--blog-hairline` | Section rules, row dividers, figure borders |
| `--blog-signal-blue` | Active link, selected filter, information route, architecture emphasis |
| `--blog-signal-red` | Critical limitation, destructive/error context, correction marker—used sparingly |
| `--blog-signal-green` | Verified/success context only when meaning is explicit |
| `--blog-signal-yellow` | Warning/experiment/uncertainty context |
| `--blog-code-ink` | Code text with required contrast |
| `--blog-selection` | Text selection that remains readable |

Color rules:

- Article body copy should normally use a neutral around the existing `body-strong`/`body` range rather
  than pure white for every line.
- Pure white is reserved for article title, high-level headings, active links, and strong emphasis.
- Signal red is not the default hover color and must not dominate an article.
- Links must remain distinguishable without relying only on color: underline, border, arrow, or another
  consistent textual cue is required.
- Syntax tokens must be tested against the actual code-block surface. Do not import a low-contrast theme
  because it looks fashionable.
- Text selection must use an ATRX signal background with readable foreground.

### Typography system

Use the portfolio's actual available font stack. Never reference a proprietary font that is not shipped.

#### Display and article title

- Keep the ATRX display voice: strong, compact, high-contrast, and capable of uppercase system labels.
- Article titles should normally use title case or sentence case as authored. Do not force every technical
  title to uppercase.
- Large titles may use responsive `clamp()` sizing.
- Avoid excessively narrow line lengths that create six-line titles on mobile.
- Preserve natural word wrapping; use balanced wrapping where supported only as enhancement.

Recommended title behavior:

```css
font-size: clamp(2.4rem, 6vw, 5.75rem);
line-height: 0.96–1.06;
max-width: 15–18ch;
```

Choose values that fit the existing production typeface and verify actual screenshots.

#### Long-form body

The body voice must be substantially more readable than system labels:

```css
font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
line-height: 1.65–1.8;
max-width: 68–74ch;
```

Rules:

- use normal sentence case;
- use a regular readable weight, not display-bold and not an ultra-light face that disappears on black;
- paragraph spacing should clearly separate ideas without creating huge empty gaps;
- bold text must remain visibly stronger than body copy;
- italic text must remain legible in the actual font;
- do not use justified text;
- do not center body paragraphs;
- use real typographic punctuation only when it does not alter code, paths, commands, or copied values.

#### Headings

Suggested hierarchy:

| Element | Behavior |
| --- | --- |
| Article `h1` | one per route, expressive display, max width bounded |
| `h2` | major section break, strong editorial scale, generous top spacing |
| `h3` | technical subsection, compact but clearly stronger than body |
| `h4` | local label-level heading; avoid deep nesting beyond this |
| Eyebrow | monospace/uppercase, small, letterspaced, used for route/date/status |

Headings must have enough scroll margin to remain visible below the persistent header.

#### Monospace

Use for:

- `FIELD NOTE 004`-style identifiers if real and deterministic;
- publication/update dates;
- tags and series labels;
- route paths and repository names;
- commands, filenames, model identifiers, hashes, metrics, and code;
- small status labels such as `PUBLISHED`, `ARCHIVED`, or `UPDATED`.

Do not render article descriptions or entire paragraphs in monospace.

### Page grid

#### Global index shell

- Use the same maximum site width and left/right alignment logic as the existing portfolio header.
- Keep a strong editorial left edge.
- Featured note may span the broad content rail.
- Archive rows may use a date/sequence column plus title/description column on desktop.
- Mobile collapses to one linear column with metadata above title or directly below it.

Suggested desktop grid:

```text
| outer gutter | date/status rail | primary note content | tag/action rail | outer gutter |
```

Do not preserve empty side rails on mobile.

#### Article shell

Use three conceptual rails:

```text
| optional TOC / metadata | readable prose | optional figure breakout |
```

The prose rail remains the anchor. The other rails disappear or stack when space is insufficient.

Recommended width relationships:

- body text: `68–74ch`;
- normal figures: body width;
- wide figures: up to site content width, never viewport overflow;
- code blocks: body width by default, wider only when genuinely helpful;
- table of contents: approximately `14–18rem`, desktop only when it does not crush prose.

### Vertical rhythm

Use the existing spacing system as the base, but long-form content needs additional semantic rhythm.

Suggested relationships:

- article header to body: `48–80px` depending on viewport;
- paragraph to paragraph: approximately `1em–1.35em`;
- body to `h2`: `3.5em–5em` top spacing;
- `h2` to first paragraph: `0.75em–1.25em`;
- body to `h3`: `2.5em–3.5em`;
- figure/table/code block vertical margin: `2em–3.5em`;
- major article footer separation: `64–112px`.

Avoid placing a decorative horizontal rule between every two paragraphs. Rules indicate real section or
system boundaries.

### Persistent header behavior on blog routes

- Preserve ATRX07 identity and compact-on-scroll behavior.
- Add `Field Notes` as a primary route link.
- Homepage section links from blog routes must point to route-plus-fragment destinations.
- Hide or adapt portfolio-only discovery information when it has no meaning on direct blog arrival.
- Preserve command palette access only if commands remain contextually valid.
- The header must not occupy excessive vertical space over article text.
- Mobile navigation must expose Home, Field Notes, relevant homepage sections, GitHub, and contact paths.
- Current route gets a clear active state that is not color-only.

### Field Notes index composition

#### Index hero

Required elements:

- `ATRX / FIELD NOTES` eyebrow or equivalent;
- `FIELD NOTES` page title;
- one concise purpose statement;
- optional archive count derived from published registry data;
- no fake “live feed” indicator unless data is actually live.

The hero should be shorter and quieter than the portfolio hero. Do not repeat the full portrait treatment
or boot sequence unless it has a clear new purpose.

#### Featured note

A featured note is an editorial lead, not a bigger generic card.

Possible composition:

```text
FEATURED / FIELD NOTE
Date + tags
Large title
Description
Optional real figure or project-specific visual fragment
OPEN NOTE ↗
```

Rules:

- only render when a published note is explicitly featured;
- if more than one note is featured, use deterministic selection or flag it as validation error;
- do not fabricate cover art solely to fill space;
- a text-led featured note is valid;
- motion is limited to a short entry or link response and removed under reduced motion.

#### Tag rail

- Use real `button` or route links.
- Include `All`.
- Active state uses underline/edge/signal treatment plus `aria-pressed` when buttons are used.
- Maintain at least 44 px effective touch height.
- Allow horizontal scrolling inside the rail on narrow screens without causing page overflow.
- Do not hide tags behind a hover-only menu.
- Tag count may be shown only when derived accurately.

#### Archive/feed rows

Prefer a chronological technical log over identical cards.

Desktop row may include:

- publication date;
- optional series/project/status;
- title;
- description;
- tags;
- derived reading time;
- open indicator.

Interaction rules:

- the title is a native link;
- the entire row may be clickable only if semantics and text selection remain correct;
- hover/focus may shift a signal line, arrow, or surface by a few pixels;
- no row should require opening to reveal its description;
- selected tag filtering must not animate rows through large motion or make focus disappear;
- archived notes display an explicit calm archive label.

#### Empty states

Two different empty states are required:

1. No published notes yet: honest “notes are being prepared” state with route back to projects.
2. No notes for selected tag: show the selected filter and a clear reset action.

Do not populate fake posts to avoid an empty page.

### Article header

Required hierarchy:

1. route/breadcrumb context;
2. status or series eyebrow;
3. title;
4. description/deck;
5. publication and optional update date;
6. tags;
7. optional project/repository association;
8. optional cover or opening technical figure.

Rules:

- metadata must not compete with the title;
- use actual dates, not vague “recently” labels;
- updated notes distinguish publication from revision;
- archived notes show an archive banner before the body;
- do not display an author headshot on every article unless it serves a real identity purpose;
- Arppith/ATRX authorship can be concise and consistent in header or footer.

### Article body elements

#### Paragraphs and inline content

- Default links are visibly underlined or use an equivalent persistent cue.
- Inline code uses a bounded subtle surface and must wrap carefully without destroying line height.
- Keyboard focus on links is obvious.
- Long URLs may break; code identifiers preserve meaningful characters.
- Abbreviations should be expanded in prose when a general visitor may not know them.

#### Lists

- Use ordinary semantic lists.
- Keep marker alignment clean with multiline items.
- Avoid turning every paragraph into bullets.
- Nested lists need visible hierarchy but should rarely exceed two levels.

#### Blockquotes

Blockquotes are for sourced or intentionally emphasized text, not generic callouts.

- Use one strong hairline or signal edge.
- Preserve quotation semantics.
- Include attribution where available.
- Do not style unverified generated prose as an authoritative quotation.

#### Horizontal rules

Use for major narrative transitions or appendices. Keep them thin, wide, and quiet. Do not use a BMW/M
tricolor rule.

### Callout system

Approved variants:

| Variant | Meaning | Signal treatment |
| --- | --- | --- |
| `info` | context or implementation note | blue edge/label |
| `warning` | caveat, risk, unstable behavior | yellow edge/label |
| `limitation` | known constraint or unsupported conclusion | red used sparingly with neutral body |
| `verified` | explicitly validated behavior/result | green edge/label |
| `experiment` | exploratory or incomplete result | yellow/blue combination without false success |
| `correction` | material post-publication correction | red marker plus clear date |

Callout anatomy:

```text
[MONOSPACE LABEL]  Optional short title
Readable body copy with links/code as needed.
```

Rules:

- color is never the only label;
- use an icon only if it improves recognition;
- no pulsing, flashing, or glowing warning boxes;
- callout body uses the same readable typography as article prose;
- avoid nesting callouts.

### Code and terminal blocks

#### Code block frame

Required elements:

- optional language/file label;
- code region;
- optional copy button;
- optional caption/source context;
- internal horizontal scrolling;
- visible keyboard focus where controls exist.

Rules:

- preserve whitespace;
- never soft-wrap code by default when it would alter meaning;
- contain overflow inside the block;
- copy control must copy code only, not line numbers or labels;
- copy feedback is brief, non-modal, and screen-reader announced;
- line numbers are optional and must not become copied text;
- syntax colors remain restrained and high-contrast;
- code font size remains usable on mobile;
- no fake editable cursor or shell prompt unless the block is explicitly a transcript.

#### Terminal transcript

Terminal blocks are inert examples, distinct from the interactive portfolio terminal.

- label commands and output clearly;
- do not imply execution is live;
- never include real secrets, usernames, tokens, or private local paths;
- redact sensitive values visibly rather than pretending they never existed;
- allow text selection and copying.

### Tables

Technical tables must remain real semantic tables.

- use header cells with correct scope;
- provide a caption when the purpose is not obvious from nearby text;
- wrap ordinary prose inside cells;
- keep code/metrics aligned where useful;
- on mobile, scroll the table container horizontally and preserve the page width;
- add a visual cue that the table can scroll when content is clipped;
- do not replace every table with cards unless semantics genuinely improve;
- do not use color alone to declare a winning model or result;
- explain bolded/best values in surrounding text.

### Figures, screenshots, and media

#### Figure anatomy

```text
[bounded visual]
Figure N — concise caption explaining why it matters.
Optional source/context line.
```

Rules:

- use local optimized assets;
- include explicit dimensions/aspect ratio;
- provide meaningful alt text for informational visuals;
- use empty alt only for truly decorative images;
- do not repeat caption word-for-word as alt text;
- sanitize account names, notifications, tokens, URLs, tabs, and local paths;
- do not use generic stock technology images;
- screenshots should show real UI states when available;
- avoid tiny unreadable full-screen screenshots; crop to the relevant region when truthful;
- allow click-to-enlarge only with accessible dialog behavior and a clear close action;
- no autoplay video; respect captions/transcripts when video is added later.

### Architecture figures and interactive diagrams

A diagram belongs in an article only when the prose references it and a text explanation exists.

- Start with semantic HTML/SVG/CSS or reuse a validated project component.
- Provide a static final-state fallback for reduced motion.
- Do not run continuous packets or orbiting nodes indefinitely beside body text.
- If motion explains sequence, use explicit play/replay controls and stop after completion.
- Node labels must remain readable at mobile width or the diagram must switch to a stacked representation.
- Interactive nodes need keyboard focus and pinned explanation behavior.
- The article must remain understandable if the diagram fails to load.
- Avoid large graph dependencies unless measured complexity justifies them.

### Metric panels and charts

Metrics are evidence and require context.

Every metric panel should support:

- label;
- value;
- unit;
- model/system/context;
- dataset or evaluation range when relevant;
- caveat or comparison basis;
- source association when public.

Do not render a large number as decoration without explaining what it measures.

Chart rules:

- use labeled axes and units;
- use accessible legends;
- do not truncate axes deceptively;
- provide a text summary of the conclusion;
- use patterns/labels or sufficient contrast beyond color differences;
- preserve data in a table or accessible description when practical;
- static charts are preferred unless interaction changes understanding.

### Table of contents

Generate only when an article has sufficient section depth.

Desktop:

- may appear in a left or right rail;
- sticky only below the header and within article bounds;
- current section indicator uses text/edge plus color;
- long heading labels wrap;
- include a visible `Contents` label.

Mobile:

- render as a compact disclosure near the article header;
- closed by default unless the article is exceptionally long;
- keyboard and screen-reader accessible;
- selecting an item closes the disclosure and moves to a visible heading.

Do not display an empty or one-item table of contents.

### Related notes and article footer

Related notes are derived from published metadata, normally by shared project, series, or tags.

- limit the initial list to a small useful number;
- never surface drafts;
- explain the relationship through labels rather than fake recommendation ranking;
- avoid an algorithmic “you may also like” tone;
- provide a strong path back to Field Notes;
- include a relevant project/repository link only when the note truly maps to it;
- keep contact CTA restrained and optional.

### Not-found design

The not-found route should feel intentional and useful:

```text
SIGNAL LOST / 404
This route does not map to a published ATRX system or field note.
[Return home] [Open Field Notes]
```

Rules:

- no fake terminal error dump;
- no blaming the visitor;
- no automatic redirect that prevents understanding or Back navigation;
- preserve header/footer identity;
- mark unknown article routes clearly;
- use minimal motion and respect reduced motion.

### Motion language for Field Notes

Allowed:

- short page/section reveal on initial entry;
- small link-arrow translation;
- filter edge/underline transition;
- one-time figure sequence initiated by the reader;
- progress indicator only if accurate and unobtrusive;
- smooth scrolling only when reduced motion is not requested and focus remains correct.

Disallowed:

- endless text-adjacent glow;
- cursor-follow effects over article content;
- constantly moving background grids;
- automatic orbit/packet/waveform loops beside reading;
- parallax that changes text position;
- scroll hijacking;
- page transitions that delay navigation;
- animated syntax tokens;
- sound on route entry.

Reduced motion removes nonessential transforms, smooth scrolling, replay sequences, shimmer, and progress
animation while preserving state and content.

### Responsive behavior

#### Mobile: below the existing mobile breakpoint

- one-column reading order;
- body width uses safe viewport gutters;
- title scales without clipping;
- metadata wraps into multiple lines;
- tag rail may scroll internally;
- no sticky side table of contents;
- code/table containers scroll internally;
- figures use full content width, never negative margins that cause page overflow;
- header menu remains usable above article content;
- touch targets meet at least 44 px effective size;
- no hover-only descriptions.

#### Tablet

- retain one primary prose column;
- optional wider figures;
- metadata may use two columns;
- table of contents remains non-sticky unless there is clearly enough width.

#### Desktop

- prose remains narrow enough to read;
- optional table of contents/metadata rail;
- wide figures break out within site container;
- archive rows may use date and action rails;
- hover enhancements appear only on fine pointers.

#### Wide screens

Do not stretch paragraphs to fill the monitor. Add calm outer space or use it for bounded metadata/TOC
rails. Article body remains at the established readable measure.

### Accessibility design contract

- One visible page `h1`.
- Logical heading order.
- Visible `:focus-visible` on every interactive element.
- Route changes receive focus/title handling.
- Link purpose remains understandable out of context where practical.
- Color is not the only state indicator.
- Text selection remains enabled.
- Captions and alt text are authored deliberately.
- Tables and code blocks have keyboard-reachable scroll regions when necessary.
- Copy feedback uses an ARIA live region.
- Diagrams provide text fallback.
- Callouts have labels in text.
- Contrast is checked against the real surfaces.
- 200-percent zoom remains usable.
- 360 px has no page-level horizontal overflow.
- Reduced motion is fully supported.

### Performance design contract

- Do not load every article body on the homepage.
- Use local responsive media with dimensions.
- Avoid decorative videos and large animated canvases.
- Keep article components small and composable.
- Lazy-load heavy diagrams.
- Prefer CSS and semantic HTML over UI libraries for basic article layout.
- Syntax highlighting, if added, should happen at build time or load only with article routes.
- Avoid cumulative layout shift in the article header and figures.
- Preserve the current homepage bundle and interaction performance.

### Field Notes design QA checklist

Before public release, inspect:

#### Index

- strong Field Notes identity without duplicating the homepage hero;
- featured treatment with truthful content;
- readable chronological ordering;
- tag filter focus, touch, overflow, and empty state;
- no generic equal-card-grid dependence;
- current navigation state.

#### Article

- title wrapping at desktop, tablet, 412 px, and 360 px;
- body line length and contrast;
- heading hierarchy and scroll margin;
- inline code, code block, table, figure, callout, and long URL containment;
- table of contents behavior;
- archive/update/correction state;
- related-note and return paths;
- text selection;
- no continuous distracting motion.

#### System

- homepage visual regression;
- route transition focus;
- Back/Forward behavior;
- direct article refresh;
- not-found route;
- reduced motion;
- 200-percent zoom;
- no console warnings/errors;
- no page-level horizontal overflow;
- no BMW brand leakage;
- no unlicensed font dependency;
- no private information in media or article content.

### Field Notes component inventory

Recommended initial primitives:

| Component | Responsibility |
| --- | --- |
| `BlogIndexHeader` | Field Notes identity and archive context |
| `FeaturedNote` | one editorial lead note |
| `TagFilter` | accessible normalized-tag controls |
| `NoteArchiveRow` | chronological article summary |
| `ArticleLayout` | shared route-level article structure |
| `ArticleHeader` | title, deck, dates, tags, status, associations |
| `ArticleTableOfContents` | conditional desktop/mobile contents navigation |
| `NoteCallout` | typed context/warning/limitation/verified/correction panel |
| `CodeBlock` | contained code with labels and optional copy |
| `Figure` | image, alt, dimensions, caption, optional expansion |
| `ComparisonTable` | accessible horizontally contained technical table |
| `MetricPanel` | verified metric plus context and caveat |
| `ArchitectureFigure` | bounded diagram with text/reduced-motion fallback |
| `RelatedNotes` | small registry-derived related list |
| `ArticleFooter` | return/project/repository paths |
| `NotFoundPage` | route recovery |

Do not build all primitives before they are needed, but establish their ownership and avoid one enormous
article renderer.

### Design acceptance bar

Ask before approval:

- Does the index feel unmistakably ATRX without copying the homepage section layout?
- Can a visitor read a long note comfortably for ten minutes?
- Does every visual explain something real?
- Are limitations as carefully designed as successes?
- Does mobile preserve the article rather than merely shrink desktop?
- Can the page be understood without motion, hover, sound, or the command palette?
- Are code, tables, figures, and diagrams technically contained?
- Is the BMW reference visibly absent from public brand expression?
- Could this article system belong to a generic template after replacing the wordmark?

If the final answer is yes, the Field Notes design is still too generic.
