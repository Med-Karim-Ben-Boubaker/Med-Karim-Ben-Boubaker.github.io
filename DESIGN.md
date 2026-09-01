---
version: alpha
name: Dark editorial product system
description: A restrained dark interface system for developer tools and technical products. It combines a warm near-black canvas, soft off-white text, compact pill actions, hairline borders, and editorial typography with dense product demonstrations.

colors:
  canvas: "#14120b"
  canvas-soft: "#1b1913"
  surface-card: "#1b1913"
  surface-hover: "#201e18"
  surface-strong: "#26241e"
  control: "#2b2923"
  text-primary: "#edecec"
  text-secondary: "rgba(237, 236, 236, 0.60)"
  text-muted: "rgba(237, 236, 236, 0.40)"
  hairline: "rgba(237, 236, 236, 0.10)"
  hairline-soft: "rgba(237, 236, 236, 0.025)"
  hairline-strong: "rgba(237, 236, 236, 0.60)"
  action-surface: "#edecec"
  action-surface-active: "#d9d5cf"
  action-ink: "#14120b"
  accent: "#f54e00"
  accent-active: "#d04200"
  on-accent: "#ffffff"
  timeline-thinking: "#dfa88f"
  timeline-grep: "#9fc9a2"
  timeline-read: "#9fbbe0"
  timeline-edit: "#c0a8dd"
  timeline-done: "#c08532"
  semantic-error: "#cf2d56"
  semantic-success: "#1f8a65"

typography:
  display-mega:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 72px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -2.16px
  display-lg:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.72px
  display-md-lg:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 26px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.325px
  display-md:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.11px
  display-sm:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0
  title-md:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.08px
  body-md:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-tracked:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.08px
  body-sm:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.14px
  caption:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: 0.72px
    textTransform: uppercase
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  button:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.14px

rounded:
  none: 0px
  xs: 4px
  sm: 4px
  md: 4px
  lg: 4px
  xl: 8px
  pill: 9999px
  full: 9999px

spacing:
  unit: 10px
  xxs: 2.5px
  xs: 5px
  sm: 7.5px
  base: 10px
  md: 15px
  lg: 20px
  xl: 30px
  xxl: 50px
  section: 67.2px
  section-large: 112px

components:
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    typography: "{typography.nav-link}"
    height: 52px
    outerPadding: 0 20px
    contentMaxWidth: 1300px
  button-primary:
    backgroundColor: "{colors.action-surface}"
    textColor: "{colors.action-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12.5px 21.6px
    height: 43px
  button-primary-active:
    backgroundColor: "{colors.action-surface-active}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.text-primary}"
    typography: "{typography.button}"
    border: 1px solid "{colors.hairline-soft}"
    rounded: "{rounded.pill}"
    padding: 12.5px 21.6px
    height: 43px
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.accent}"
    typography: "{typography.button}"
  button-download:
    backgroundColor: "{colors.action-surface}"
    textColor: "{colors.action-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12.5px 21.6px
    height: 43px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    padding: 112px 20px 67.2px
  ide-mockup-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    border: 1px solid "{colors.hairline}"
    rounded: "{rounded.xs}"
    padding: 0
  ide-pane:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.text-primary}"
    typography: "{typography.code}"
    border: 1px solid "{colors.hairline}"
    rounded: "{rounded.xs}"
    padding: 16px
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.title-md}"
    border: 1px solid "{colors.hairline}"
    rounded: "{rounded.xs}"
    padding: 17.5px
  comparison-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    border: 1px solid "{colors.hairline}"
    rounded: "{rounded.xs}"
    padding: 20px
  timeline-pill-thinking:
    backgroundColor: "{colors.timeline-thinking}"
    textColor: "{colors.action-ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  timeline-pill-grep:
    backgroundColor: "{colors.timeline-grep}"
    textColor: "{colors.action-ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  timeline-pill-read:
    backgroundColor: "{colors.timeline-read}"
    textColor: "{colors.action-ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  timeline-pill-edit:
    backgroundColor: "{colors.timeline-edit}"
    textColor: "{colors.action-ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  timeline-pill-done:
    backgroundColor: "{colors.timeline-done}"
    textColor: "{colors.on-accent}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  code-block:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.text-primary}"
    typography: "{typography.code}"
    border: 1px solid "{colors.hairline}"
    rounded: "{rounded.xs}"
    padding: 20px
  pricing-tier-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    border: 1px solid "{colors.hairline}"
    rounded: "{rounded.xs}"
    padding: 30px
  pricing-tier-featured:
    backgroundColor: "{colors.action-surface}"
    textColor: "{colors.action-ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 30px
  text-input:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    border: 1px solid "{colors.hairline}"
    rounded: "{rounded.xs}"
    padding: 12px 16px
    height: 44px
  badge-pill:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.text-primary}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  cta-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    typography: "{typography.display-mega}"
    padding: 67.2px 20px 134.4px
  testimonial-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-md}"
    border: 1px solid "{colors.hairline}"
    rounded: "{rounded.xs}"
    padding: 20px
  footer:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-sm}"
    padding: 67.2px 20px 30px
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-sm}"

---

## Overview

This is a dark, editorial product system for technical and developer-facing experiences. The page floor is warm near-black (`{colors.canvas}`), while cards use a barely lighter brown-black (`{colors.surface-card}`). Soft off-white text (`{colors.text-primary}`) carries both display and body copy. A single saturated orange accent (`{colors.accent}`) is reserved for tertiary links, status emphasis, and small moments of directional energy.

The composition is intentionally quiet: a fixed compact header, centered navigation, left-aligned hero copy, large product demonstrations, short section labels, and a small number of high-contrast pill actions. Content is arranged in a 1300px maximum-width container with 20px outer gutters and 10px internal grid gaps.

### Key characteristics

- Warm near-black canvas rather than neutral black: `{colors.canvas}`.
- Soft off-white primary text and action surface: `{colors.text-primary}`.
- Orange is an accent, not a general-purpose button fill.
- Primary actions are light pills with dark text; secondary actions are dark filled pills.
- Cards use 1px hairlines and tonal contrast instead of shadows.
- Content demonstrations are large, structured, and allowed to carry most of the visual density.
- Display typography remains regular-weight with tight negative tracking.
- Section rhythm is generous, while controls and card grids use compact 10px gaps.
- Timeline colors are limited to in-product process visualizations.

## Colors

### Canvas and surfaces

- **Canvas** (`{colors.canvas}` — `#14120b`): Page background, header, hero, and broad content bands.
- **Canvas soft** (`{colors.canvas-soft}` — `#1b1913`): Inner panels, code surfaces, and muted product areas.
- **Surface card** (`{colors.surface-card}` — `#1b1913`): Card background with subtle separation from the canvas.
- **Surface hover** (`{colors.surface-hover}` — `#201e18`): Optional interactive surface state.
- **Surface strong** (`{colors.surface-strong}` — `#26241e`): Secondary controls, compact panels, and tags.
- **Control** (`{colors.control}` — `#2b2923`): Small circular controls and dense input affordances.

### Text and borders

- **Text primary** (`{colors.text-primary}` — `#edecec`): Headings, body copy, labels, and icons.
- **Text secondary** (`{colors.text-secondary}` — `rgba(237, 236, 236, 0.60)`): Supporting copy and footer links.
- **Text muted** (`{colors.text-muted}` — `rgba(237, 236, 236, 0.40)`): Disabled or low-priority information.
- **Hairline** (`{colors.hairline}` — `rgba(237, 236, 236, 0.10)`): Default borders and dividers.
- **Hairline soft** (`{colors.hairline-soft}` — `rgba(237, 236, 236, 0.025)`): Subtle pill and secondary-control outlines.
- **Hairline strong** (`{colors.hairline-strong}` — `rgba(237, 236, 236, 0.60)`): Focused or high-contrast outlines.

### Actions and accent

- **Action surface** (`{colors.action-surface}` — `#edecec`): Primary action background.
- **Action ink** (`{colors.action-ink}` — `#14120b`): Text and icons on primary actions.
- **Action surface active** (`{colors.action-surface-active}` — `#d9d5cf`): Pressed or active primary-action state.
- **Accent** (`{colors.accent}` — `#f54e00`): Tertiary links, directional emphasis, and selected status details.
- **Accent active** (`{colors.accent-active}` — `#d04200`): Pressed accent state.

### Timeline

These colors identify stages in a process timeline and should not become general interface status colors.

- **Thinking** (`{colors.timeline-thinking}` — `#dfa88f`): Warm peach.
- **Grepping** (`{colors.timeline-grep}` — `#9fc9a2`): Muted mint.
- **Reading** (`{colors.timeline-read}` — `#9fbbe0`): Soft blue.
- **Editing** (`{colors.timeline-edit}` — `#c0a8dd`): Muted lavender.
- **Done** (`{colors.timeline-done}` — `#c08532`): Warm gold.

### Semantic

- **Success** (`{colors.semantic-success}` — `#1f8a65`): Confirmation, completion, and positive validation.
- **Error** (`{colors.semantic-error}` — `#cf2d56`): Errors, destructive warnings, and invalid input.

## Typography

### Font family

Use a neutral system sans for display, navigation, controls, and body copy:

```css
font-family: system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
```

Use a neutral system monospace for code and technical UI:

```css
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

Do not require a proprietary font asset. The hierarchy, weight, line-height, and tracking carry the intended voice.

### Hierarchy

| Token | Size | Weight | Line height | Tracking | Use |
|---|---:|---:|---:|---:|---|
| `{typography.display-mega}` | 72px | 400 | 1.1 | -2.16px | Large closing or statement headline |
| `{typography.display-lg}` | 36px | 400 | 1.2 | -0.72px | Major section headline |
| `{typography.display-md-lg}` | 26px | 400 | 1.25 | -0.325px | Compact hero headline |
| `{typography.display-md}` | 22px | 400 | 1.3 | -0.11px | Section and feature headline |
| `{typography.display-sm}` | 18px | 400 | 1.35 | 0 | Small display or card-group title |
| `{typography.title-md}` | 18px | 500 | 1.4 | 0 | Component title |
| `{typography.title-sm}` | 16px | 500 | 1.5 | 0.08px | List or product label |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default body copy |
| `{typography.body-tracked}` | 16px | 400 | 1.5 | 0.08px | Editorial body copy |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0.14px | Navigation support and footer copy |
| `{typography.caption}` | 13px | 400 | 1.55 | 0 | Captions and metadata |
| `{typography.caption-uppercase}` | 12px | 500 | 1.35 | 0.72px | Compact labels and process stages |
| `{typography.code}` | 13px | 400 | 1.55 | 0 | Code blocks and technical surfaces |
| `{typography.button}` | 16px | 400 | 1 | 0 | Primary and secondary action labels |
| `{typography.nav-link}` | 14px | 400 | 1.5 | 0.14px | Top navigation |

### Principles

- Keep display headings regular-weight; use size and tracking for hierarchy.
- Apply negative tracking to display sizes only.
- Keep body text at 16px with a 24px baseline rhythm.
- Use monospace only where the content is code, commands, paths, logs, or technical values.
- Use uppercase sparingly, with enough tracking to remain legible at small sizes.

## Layout

### Spacing system

The reference rhythm is based on a 10px grid unit with fractional substeps for compact controls:

- `xxs`: 2.5px
- `xs`: 5px
- `sm`: 7.5px
- `base`: 10px
- `md`: 15px
- `lg`: 20px
- `xl`: 30px
- `xxl`: 50px
- `section`: 67.2px
- `section-large`: 112px

Use 67.2px as the default section inset and 112px for the top of a hero band. Keep internal card spacing tighter than section spacing.

### Container and grid

- Maximum content width: 1300px.
- Outer page gutter: 20px.
- Default grid gap: 10px.
- Primary marketing compositions use a 24-column grid; an 8/16 split supports text beside a large demonstration.
- Feature and testimonial groups may use 2-up or 3-up grids at desktop widths.
- Footer uses five columns on desktop and two columns on smaller screens.
- Full-bleed media may extend to the section edges while its text remains inside the 1300px container.
- Do not add decorative containers around every text group; let the canvas provide negative space.

### Composition pattern

1. Fixed 52px header with a centered navigation group.
2. Hero copy aligned to the left of the content container.
3. One light primary pill and one dark secondary pill beneath the hero copy.
4. A large product or workflow demonstration below or beside the copy.
5. Short section labels followed by a structured card or media block.
6. A compact social-proof or update section before the final call to action.
7. A dark card-toned footer with a five-column link layout.

## Elevation and depth

Depth is tonal and structural rather than shadow-based.

| Level | Treatment | Use |
|---|---|---|
| Canvas | `{colors.canvas}` | Page bands and broad backgrounds |
| Card | `{colors.surface-card}` | Content cards and footer |
| Hover surface | `{colors.surface-hover}` | Interactive card or row state |
| Strong surface | `{colors.surface-strong}` | Secondary controls and compact panels |
| Hairline | 1px `{colors.hairline}` | Card outlines and dividers |
| Soft hairline | 1px `{colors.hairline-soft}` | Low-emphasis outlines |

Do not use drop shadows, glow effects, glass blur, or floating elevation tiers as default decoration. A large product demonstration may use an internal image, texture, or panel stack, but the outer container remains flat and hairline-defined.

## Shapes

### Border radius scale

| Token | Value | Use |
|---|---:|---|
| `{rounded.none}` | 0px | Reserved for strict edges |
| `{rounded.xs}` | 4px | Media frames, cards, and compact rows |
| `{rounded.sm}` | 4px | Dense controls |
| `{rounded.md}` | 4px | Inputs and small controls |
| `{rounded.lg}` | 4px | Standard cards |
| `{rounded.xl}` | 8px | Larger framed groups, used rarely |
| `{rounded.pill}` | 9999px | Actions, badges, and process labels |
| `{rounded.full}` | 9999px | Avatars and circular controls |

The defining contrast is square-ish 4px content framing against fully rounded action controls.

## Components

### Top navigation

**`top-nav`** uses `{colors.canvas}`, a 52px height, and a centered 1300px container. The layout is a three-part grid: identity area on the left, primary navigation centered, and account/action controls on the right. Navigation links use 14px text, 21px line height, and 0.14px tracking. Keep the menu compact and avoid heavy separators.

### Buttons

**`button-primary`** uses `{colors.action-surface}` with `{colors.action-ink}` text. It is a 43px-high pill with 12.5px vertical and 21.6px horizontal padding. Use it for the main action in a section.

**`button-secondary`** uses `{colors.surface-strong}` with `{colors.text-primary}` text, a subtle `{colors.hairline-soft}` border, and the same 43px pill geometry. Use it beside a primary action when both choices are important.

**`button-tertiary-text`** has no container. Use `{colors.accent}` text for inline or section-level links, optionally paired with a directional arrow. It should not compete with the primary pill.

**`button-download`** is the same visual family as the primary action, with the same height and pill geometry. Use neutral, task-oriented labels rather than platform-specific references.

### Hero and product demonstrations

**`hero-band`** uses `{colors.canvas}` and `112px` top padding. At desktop widths, place a text block beside a large demonstration using the 24-column grid. The hero headline may use `{typography.display-md-lg}` for a compact opening statement or `{typography.display-mega}` for a large campaign-like statement. Keep the copy width near 660px and the demonstration width near 840px when the composition allows.

**`ide-mockup-card`** is a large, 4px-framed product demonstration with no outer shadow and no unnecessary padding. It may contain a sidebar, main workspace, assistant panel, terminal, browser preview, or other product surfaces.

**`ide-pane`** uses `{colors.canvas-soft}`, monospace text, 16px padding, and 1px hairlines. Preserve clear pane hierarchy with borders and tonal changes rather than gradients.

### Cards

**`feature-card`** uses `{colors.surface-card}`, a 1px hairline, 4px corners, and 17.5px padding. Keep the card content concise and let the grid create the grouping.

**`comparison-card`** uses the same framing with 20px padding and an internal two-column split. Separate the columns with whitespace or a hairline, not a shadow.

**`testimonial-card`** uses `{colors.surface-card}`, secondary text, 20px padding, and a 4px frame. Keep attribution visually quieter than the quote.

### Process timeline

**`timeline-pill-*`** components are compact, fully rounded labels using the five timeline colors. They identify process stages such as Thinking, Grepping, Reading, Editing, and Done. Use them only inside an in-product timeline or workflow visualization; never use them as generic navigation or semantic status colors.

### Code

**`code-block`** uses `{colors.canvas-soft}`, monospace text, 20px padding, a 1px hairline, and 4px corners. Keep long lines horizontally scrollable. Inline code should inherit the same monospace family without creating a separate decorative capsule unless the surrounding context requires it.

### Pricing and comparison tiers

**`pricing-tier-card`** uses the standard card surface, 30px padding, a 1px hairline, and 4px corners.

**`pricing-tier-featured`** inverts the treatment to `{colors.action-surface}` with `{colors.action-ink}` text. This creates emphasis through contrast without a colored ribbon or oversized badge.

### Forms and tags

**`text-input`** uses `{colors.canvas-soft}`, 44px height, 12px × 16px padding, a 1px hairline, and 4px corners. Placeholder text uses `{colors.text-muted}`.

**`badge-pill`** uses `{colors.surface-strong}`, `{colors.text-primary}`, uppercase caption typography, and 4px × 10px padding. Keep badges short and informative.

### Call to action and footer

**`cta-band`** uses the canvas as a quiet closing band. Apply 67.2px top and 134.4px bottom padding, center the headline, and use one primary pill. The large closing headline uses `{typography.display-mega}`.

**`footer`** uses `{colors.surface-card}`, 67.2px top padding, 20px horizontal padding, and 30px bottom padding. Constrain its contents to 1300px. Use five link columns on desktop, two on mobile, and 10px column gaps with approximately 44.8px row spacing.

**`footer-link`** is transparent, uses `{colors.text-secondary}`, and stays visually subordinate to the main page navigation.

## Interaction and accessibility

- Keep focus states visible with a 2px `{colors.accent}` outline and a 2px offset.
- Preserve a minimum 44px touch target for primary actions and inputs.
- Keep text and controls readable against their surface; do not rely on the accent alone to communicate state.
- Use `aria-expanded` and an accessible label for collapsed navigation or menus.
- Respect reduced-motion preferences for product demonstrations and process timelines.
- Use semantic headings in visual order; do not choose heading levels only for size.
- Maintain keyboard access to every link, button, tab, menu, input, and expandable panel.

## Do's and don'ts

### Do

- Use `{colors.canvas}` as the page floor and `{colors.surface-card}` for tonal card separation.
- Use light pill actions for the primary path and dark pills for secondary paths.
- Reserve `{colors.accent}` for links, directional emphasis, and selected details.
- Keep display text regular-weight with tight tracking.
- Use hairlines and surface tones to express structure.
- Keep product demonstrations visually rich but structurally legible.
- Keep the five timeline colors scoped to process visualizations.
- Use token references everywhere instead of inline hex values.

### Don't

- Do not introduce a second saturated action color.
- Do not use pure white as the page background or pure black as the only surface distinction.
- Do not add default drop shadows, glows, gradients, or glass effects.
- Do not make every card heavily rounded; reserve full rounding for pills and circular controls.
- Do not use timeline colors for errors, success, navigation, or primary actions.
- Do not rely on proprietary fonts or product-specific assets.
- Do not reproduce source-site copy, logos, product names, company names, or platform-specific references in implementations of this system.

## Responsive behavior

### Breakpoints

| Name | Width | Key changes |
|---|---:|---|
| Mobile | `< 640px` | Compact display type, one-column content, single-pane demonstrations, collapsed navigation |
| Tablet | `640–1023px` | Two-up feature groups where space permits, stacked or compressed demonstrations |
| Desktop | `≥ 1024px` | Centered navigation, 24-column compositions, large product demonstrations, multi-column cards |
| Wide | `> 1300px` | Keep content capped at 1300px while the canvas expands |

### Collapsing strategy

- Keep the fixed header at 52px across widths; collapse the navigation below 768px.
- Stack the hero copy above the demonstration on smaller screens.
- Reduce `{typography.display-mega}` to 32px on mobile and `{typography.display-lg}` to 28px.
- Collapse a multi-pane product demonstration to one primary pane or a carefully selected preview.
- Change feature and testimonial grids from 3-up to 2-up to 1-up.
- Change footer links from five columns to two columns, then one if the content becomes cramped.
- Preserve 20px horizontal page gutters on mobile unless a full-bleed media treatment is intentional.
- Prevent horizontal overflow from code blocks, wide tables, or product mockups.

## Iteration guide

1. Confirm the page canvas, text contrast, and 1300px container first.
2. Build the 52px navigation and primary/secondary pill pair.
3. Establish the hero text-to-demonstration composition before adding supporting cards.
4. Use 10px grid gaps and the spacing tokens for every repeated relationship.
5. Use 4px framing for cards and full pills for actions.
6. Keep variants as separate component entries and use token references everywhere.
7. Add timeline colors only after the process visualization is structurally complete.
8. Verify mobile stacking, keyboard focus, touch targets, and overflow before polishing.

## Known gaps

- Animation timing for process labels, panel reveals, and media transitions is intentionally unspecified.
- Complex in-product surfaces are represented as structural patterns, not a complete component library.
- Exact illustration, texture, icon, and logo treatments are content-layer decisions and should be defined separately.
- If a custom typeface is introduced later, it must preserve the documented sizes, weights, line heights, and tracking rather than replace them with arbitrary defaults.
