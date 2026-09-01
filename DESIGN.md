---
version: alpha
name: Karim Ben Boubaker — Editorial Technical
website: "https://karimbenboubaker.me"
description: >
  A restrained personal website for an AI Engineer building reliable agents and
  knowledge systems for knowledge work. The visual language combines Cursor's
  observed near-black canvas, quiet technical surfaces, precise typography, and a
  single orange action accent. It is designed for a site-owned Hugo project, with
  long-form technical writing treated as a first-class experience.
sourceReference:
  name: Cursor
  website: "https://cursor.com"
  role: Visual and compositional reference only; do not reproduce Cursor branding.
  domAudit:
    audited: "2026-09-01"
    method: "Read-only browser DOM and computed-style inspection of the live dark homepage."
    observedTokens:
      background: "#14120b"
      foreground: "#edecec"
      foregroundSecondary: "#d7d6d5"
      card: "#1b1913"
      cardLevels: ["#1d1b15", "#201e18", "#26241e", "#2b2923"]
      warmCard: "#1c1713"
      accent: "#f54e00"
      borderOpacity: ["2.5%", "10%", "20%", "60%"]
seo:
  title: "Karim Ben Boubaker — Editorial Technical Design System"
  metaDescription: >
    Design system for Karim Ben Boubaker's Hugo personal website: Cursor's
    observed near-black canvas, readable neutral text, restrained orange action color,
    editorial typography, hairline depth, and readable technical writing
    surfaces.
  highlights:
    - "Warm near-black editorial canvas with distinct technical surfaces"
    - "Display typography stays calm and lightly weighted rather than loudly bold"
    - "One restrained orange accent focuses primary actions"
    - "Hairline-only depth keeps project and writing cards precise"
    - "Long-form reading, accessibility, and responsive behavior are core surfaces"
  tags:
    - "Personal Websites"
    - "AI Engineering"
    - "Technical Writing"
    - "Hugo"
  lastUpdated: "2026-09-01"

opening: |
  Karim Ben Boubaker's website should feel like a clear technical notebook that
  has grown into a professional portfolio. It presents an AI Engineer building
  reliable agents and knowledge systems for knowledge work, with enough visual
  restraint for the evidence to remain central.

  The system borrows the Cursor reference's calm editorial contrast, but makes
  the site's primary mode dark: Cursor's observed near-black canvas (#14120b),
  readable text (#edecec), distinct card and code surfaces, a single orange action
  color (#f54e00), hairline borders, compact radii, and generous section rhythm.
  It adapts those ideas to a personal site: project evidence, professional
  experience, capabilities, and technical writing are the primary components.

  The implementation target is a site-owned Hugo project on GitHub Pages. Use Hugo
  layouts, partials, CSS variables, and small purposeful JavaScript additions.
  Do not introduce React, Tailwind, Radix, authentication, analytics,
  newsletter functionality, comments, or a contact form as part of this system.

related:
  - href: "/"
    title: "Karim Ben Boubaker's website"
    description: "The live personal website using this design direction."
  - href: "/projects/"
    title: "Selected projects"
    description: "Evidence-backed work across agents, language models, retrieval, and applied AI."
  - href: "/posts/"
    title: "Technical writing"
    description: "Articles about AI systems, language models, agents, and infrastructure."

questions:
  - id: "primary-color"
    title: "What is the primary action color?"
    answer: >
      Signal Orange (#f54e00) is reserved for primary calls to action, active
      navigation states, and rare emphasis. It should not become a general
      decoration color. Signal Orange uses dark text; the pressed state is
      Signal Orange Active (#d04200) with light text so both states retain AA
      contrast. Most of the interface is warm canvas, warm text, muted text,
      and hairlines. The warm cast comes from the reference's brown-black
      canvas and layered cards, not from a light editorial paper background.
  - id: "theme"
    title: "Is the site light-first or dark-first?"
    answer: >
      The first prototype is dark-first, using a warm near-black canvas as its
      defining editorial surface. A future light theme is optional, but there
      is no theme dependency or toggle in the reset project. If a toggle is
      introduced, it must preserve readable contrast and be documented as a
      deliberate interaction.
  - id: "typography"
    title: "What typography should be used?"
    answer: >
      Use a clean grotesk or CursorGothic-compatible sans family for display,
      navigation, and body text. Display uses weight 400 with modest negative
      tracking. Use JetBrains Mono for code, technical labels, and interface
      fragments. If CursorGothic is unavailable, use Inter at weight 400 and
      tune tracking conservatively.
  - id: "about-hierarchy-and-alignment"
    title: "How should About-page identity and prose be aligned?"
    answer: >
      Keep the About H1 short and personal, then place the professional role
      directly beneath it as a separate element. Do not use the full positioning
      statement as the page title or repeat the role in metadata. Justify the
      About page's narrative paragraphs with automatic hyphenation so both text
      edges align cleanly. Keep headings, labels, role text, metadata,
      institution names, and links start-aligned; never apply justification
      globally to all text.
  - id: "timeline-pastels"
    title: "Where may the pastel timeline colors appear?"
    answer: >
      The pastel tokens are optional project-visualization accents, not general
      semantic colors. Use them only for an explicit AI workflow or agent-stage
      visualization. They must not replace success, error, warning, or focus
      colors across the rest of the site.
  - id: "depth"
    title: "How is depth expressed?"
    answer: >
      Use hairlines, surface contrast, and spacing. Avoid drop shadows and
      decorative elevation. Cards should feel placed on the canvas through a
      1px border and a small surface shift, not through a floating shadow.
  - id: "content"
    title: "What should the design make visible?"
    answer: >
      The hierarchy is: who Karim is, what he builds, what he has done, how he
      works, how he thinks, and how to connect. Prefer evidence, role, method,
      outcome, and limitations over generic skill claims or placeholder metrics.

colors:
  primary: "#f54e00"
  primary-active: "#d04200"
  ink: "#edecec"
  body: "#d7d6d5"
  body-strong: "#edecec"
  muted: "rgba(237, 236, 236, 0.6)"
  muted-soft: "rgba(237, 236, 236, 0.42)"
  canvas: "#14120b"
  canvas-soft: "#1d1b15"
  surface-card: "#1b1913"
  surface-code: "#14120b"
  surface-inverse: "#edecec"
  surface-strong: "#2b2923"
  hairline: "rgba(237, 236, 236, 0.1)"
  hairline-soft: "rgba(237, 236, 236, 0.06)"
  hairline-strong: "rgba(237, 236, 236, 0.2)"
  on-primary: "#14120b"
  on-primary-active: "#ffffff"
  on-code: "#edecec"
  on-inverse: "#14120b"
  focus: "#edecec"
  semantic-error: "#cf2d56"
  semantic-success: "#1f8a65"
  semantic-warning: "#c08532"
  timeline-thinking: "#dfa88f"
  timeline-grep: "#9fc9a2"
  timeline-read: "#9fbbe0"
  timeline-edit: "#c0a8dd"
  timeline-done: "#c08532"

typography:
  display-mega:
    fontFamily: "'CursorGothic', 'Inter', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 72px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -2.16px
  display-lg:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: -1.2px
  display-md:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.72px
  display-sm:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 26px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.325px
  title-lg:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.11px
  title-md:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-lg:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-md:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  label:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.88px
    textTransform: uppercase
  code:
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "'CursorGothic', 'Inter', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  base: 16px
  md: 20px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px
  section-lg: 96px

layout:
  contentMaxWidth: 1180px
  readingMaxWidth: 720px
  narrowMaxWidth: 560px
  headerHeight: 64px
  desktopGutter: 32px
  mobileGutter: 20px
  gridGap: 24px
  sectionGap: 80px

motion:
  duration-fast: 140ms
  duration-standard: 220ms
  easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
  rules:
    - "Animate opacity, color, border-color, and transform only when it clarifies interaction."
    - "Respect prefers-reduced-motion: reduce by removing non-essential transitions and movement."
    - "Do not use continuous decorative motion in the global shell."

components:
  skip-link:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    purpose: "Keyboard access to the main content."
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
    borderBottom: "1px solid {colors.hairline-soft}"
  wordmark:
    textColor: "{colors.ink}"
    accentColor: "{colors.primary}"
    typography: "{typography.title-sm}"
    purpose: "Use the author's name; never imitate Cursor's wordmark."
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
    height: 40px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary-active}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
    padding: "9px 17px"
    height: 40px
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    underlineOnHover: true
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-mega}"
    padding: "80px 0"
    content: "Role, positioning statement, and one clear primary action."
  proof-strip:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.body}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.lg}"
    padding: 24px
    content: "Short evidence signals: domains, systems, methods, or outcomes."
  experience-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline}"
    padding: 24px
    content: "Domain, contribution, constraint, outcome, and link."
  project-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline}"
    padding: 24px
    content: "Problem, role, approach, result, limitation, and evidence."
  project-detail-header:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    padding: "64px 0 48px"
  capability-list:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    markerColor: "{colors.primary}"
    content: "Capabilities first; technologies second."
  article-list-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline}"
    padding: 24px
    content: "Title, topic, date, reading time, and concise description."
  article-reading-shell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body-strong}"
    typography: "{typography.body-lg}"
    maxWidth: "{layout.readingMaxWidth}"
    content: "Readable measure, visible metadata, breadcrumbs, ToC, and article navigation."
  article-meta:
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  breadcrumbs:
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    separatorColor: "{colors.hairline-strong}"
  table-of-contents:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.body}"
    border: "1px solid {colors.hairline-soft}"
    rounded: "{rounded.md}"
    padding: 16px
  code-block:
    backgroundColor: "{colors.surface-code}"
    textColor: "{colors.on-code}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline-strong}"
    padding: 20px
  inline-code:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.xs}"
    padding: "2px 5px"
  timeline-pill-thinking:
    backgroundColor: "{colors.timeline-thinking}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    scope: "Agent-stage visualizations only."
  timeline-pill-grep:
    backgroundColor: "{colors.timeline-grep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    scope: "Agent-stage visualizations only."
  timeline-pill-read:
    backgroundColor: "{colors.timeline-read}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    scope: "Agent-stage visualizations only."
  timeline-pill-edit:
    backgroundColor: "{colors.timeline-edit}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    scope: "Agent-stage visualizations only."
  timeline-pill-done:
    backgroundColor: "{colors.timeline-done}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    scope: "Agent-stage visualizations only."
  badge-pill:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    purpose: "Topics, domains, or technologies; never unsupported claims."
  callout:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.body-strong}"
    border: "1px solid {colors.hairline}"
    borderAccent: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 20px
  cta-band:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse}"
    typography: "{typography.display-sm}"
    rounded: "{rounded.lg}"
    padding: "64px 48px"
  social-links:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    purpose: "GitHub, LinkedIn, and other verified public profiles."
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    borderTop: "1px solid {colors.hairline-soft}"
    padding: "64px 48px"

contentRules:
  - "Use real, evidence-backed projects and experience; never fill cards with placeholder outcomes."
  - "When content is reintroduced, define and test its route, metadata, feed, image, code, math, and audio contracts before publishing it."
  - "Keep source facts, interpretation, and recommendation distinct in project and experience copy."
  - "On About surfaces, keep the page title short, place the professional role directly beneath it, and justify narrative paragraphs with automatic hyphenation; keep non-prose elements start-aligned."
  - "Prefer one clear action per section; do not turn Signal Orange into a decoration system."
  - "Use semantic heading order and concise labels; do not style paragraphs as headings."
  - "Every meaningful image needs useful alt text; decorative images use empty alt text."
  - "Project detail pages must state limitations when evidence or outcomes are incomplete."

accessibility:
  focus: "Use a visible 2px warm-light focus ring based on {colors.focus}; never remove keyboard focus."
  contrast: "Check text and interactive states against WCAG AA contrast targets. Signal Orange uses dark text, while Signal Orange Active uses light text."
  motion: "Honor prefers-reduced-motion and do not rely on motion to communicate meaning."
  links: "Links must remain distinguishable by text, placement, or underline—not color alone."
  responsive: "The reading measure stays comfortable on mobile; wide layouts must not force horizontal scrolling."

implementation:
  generator: Hugo
  theme: none
  deployment: GitHub Pages
  preferredTools:
    - "Hugo layouts and partials"
    - "CSS custom properties derived from this file"
    - "Static assets with explicit alt text and provenance"
    - "Small, behavior-focused JavaScript only when necessary"
  avoid:
    - "React or a framework migration for visual styling alone"
    - "Tailwind, Radix, or shadcn runtime dependencies in the first prototype"
    - "Drop shadows and generic glassmorphism"
    - "Unverified metrics, testimonials, logos, or portfolio claims"
    - "Breaking existing article URLs or silently changing deployment behavior"
  overridePolicy:
    - "Keep the presentation owned by this repository; do not add a third-party theme dependency for the first prototype."
    - "Keep templates and partials small, semantic, and easy to replace as the content model is defined."

prototypePages:
  home:
    purpose: "Reset-state shell only: establish the canvas, type, navigation boundary, and next-build message."
    status: "current"
  project-detail:
    purpose: "One evidence-backed case study with role, problem, approach, stack, outcome, links, and limitations."
    status: "deferred"
  article-detail:
    purpose: "Future long-form reading surface; no custom article template or article content is included in the reset."
    status: "deferred"

verification:
  - "Render desktop and mobile layouts before judging the system."
  - "Check keyboard navigation, focus visibility, contrast, heading order, and reduced motion."
  - "Verify canonical metadata, Open Graph metadata, sitemap, feeds, and internal links when those surfaces are introduced."
  - "Verify code blocks, table of contents, breadcrumbs, math, covers, and audio when those surfaces are introduced."
  - "Build with the pinned Hugo Extended toolchain and no theme installation."
  - "Document visual deviations from this file and the reason for each deviation."
