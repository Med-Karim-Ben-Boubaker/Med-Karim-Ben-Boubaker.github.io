# LLM Council transcript: footer content and design

**Date:** 2026-09-02  
**Branch:** `codex/footer`  
**Scope:** Decide the content, information architecture, UX/UI role, and responsive layout of a shared footer for the React/Vite personal site. No application code was changed.

## Original question

Research what content should be written in the footer. The footer should be related to the page, should not be fixed like the navbar, and should scale horizontally to fill the whole page width. Research UX/UI reasons for adding it, respect `DESIGN.md` and `AGENT.md`, and use the LLM council to decide the content and design.

## Framed question

Decide the content and design for a shared footer on this React/Vite personal site.

The site belongs to Karim Ben Boubaker, an AI Engineer exploring collaboration between humans and AI agents in knowledge work. The About page describes reliable and transparent knowledge systems bringing together LLMs, symbolic AI, information retrieval, and knowledge graphs. The site currently has routes About (`/`), Projects (`/projects/`), Experience (`/experience/`), Blog (`/blog/`), published article pages, and a not-found fallback. The shared outer frame is `src/components/PageShell.jsx`; the navbar is fixed and centered, while the requested footer must be in normal document flow, full-bleed horizontally across the viewport, and scale cleanly at desktop, tablet, and mobile widths.

Project constraints from `AGENT.md` and `DESIGN.md`: keep the site personal, direct, authentic, and quiet rather than generic; preserve the existing navbar and PageShell; use the dark editorial palette (warm near-black canvas, card-toned footer, off-white hierarchy, restrained orange links, hairlines, flat surfaces, no gradients/shadows); constrain inner content to 1300px with 20px gutters; footer guidance is 67.2px top padding, 30px bottom padding, five link columns on desktop, two on mobile, 10px column gaps, and footer links subordinate to primary navigation. Use existing design tokens, semantic HTML, visible focus, readable contrast, and 44px touch targets. Do not invent unverified claims or unnecessary site sections. Existing social links are LinkedIn and GitHub.

The decision must specify exact content, grouping, route relevance, UX/UI reasons for adding the footer, how it complements rather than blindly duplicates the navbar, responsive behavior, accessibility requirements, and content or interaction to reject. Primary-source research is available in [`footer-ux-research.md`](footer-ux-research.md).

## Independent advisor responses

The five advisors were run independently. Their responses are reproduced below and de-anonymized after peer review.

### The Contrarian

Make the footer deliberately sparse. A footer that repeats the navbar, restates the About page, and adds “Resources,” “Services,” or a newsletter becomes generic noise.

Use a semantic `<footer>` with a 1300px inner wrapper and 20px gutters:

- **Explore:** About, Projects, Experience, Blog
- **Connect:** LinkedIn, GitHub
- **Identity:** “Karim Ben Boubaker” and “AI Engineer building reliable agents and knowledge systems for knowledge work”

Use the required five-column desktop grid, but do not force five populated categories. Let the two real link groups occupy the first columns and leave the remaining space as breathing room. On mobile, collapse to two columns; stack the identity block beneath them. This obeys the layout guidance without inventing content to fill slots.

The footer should be normal document flow and full-bleed, with the card-toned surface, a top hairline, 67.2px top padding, 30px bottom padding, 10px column gaps, and no gradient, shadow, oversized branding, or decorative illustration. Links remain visually subordinate to the fixed primary navbar: smaller type, restrained orange accent, and no competing CTA.

Every link needs a real destination, visible keyboard focus, readable contrast, and at least a 44px interaction box. Use headings and grouped navigation semantically; never rely on hover-only labels.

Reject duplicated route lists, unsupported availability claims, a contact form without a defined workflow, newsletter capture, fabricated legal/resource links, social icons without text labels, and a “back to top” control unless article-length testing proves it necessary.

### The First Principles Thinker

The footer should solve three jobs: reorient visitors at the end of a page, provide a secondary route into the site, and expose Karim’s verified external presence.

Use a semantic `<footer>` containing:

- A compact identity line: “Karim Ben Boubaker — AI Engineer building reliable agents and knowledge systems for knowledge work.”
- A footer navigation with five desktop columns:
  1. About → `/`
  2. Projects → `/projects/`
  3. Experience → `/experience/`
  4. Writing → `/blog/`
  5. Connect → LinkedIn, GitHub
- A quiet bottom line with the current year and “Karim Ben Boubaker,” only if a copyright line is already part of the site’s conventions.

The navbar remains the primary, immediate wayfinding system. The footer is a page-end index: text-labelled, grouped by intent, and useful after a visitor has finished reading. It may repeat the four internal destinations because page-end recirculation is its job, but it must not introduce new sections or compete with the fixed navbar.

Visually, make the footer full-bleed in normal document flow with a card-toned surface and a top hairline. Keep the inner wrapper at max-width: 1300px with 20px gutters. Apply 67.2px top padding and 30px bottom padding. Use a five-column grid with 10px gaps on desktop; switch to two columns on mobile, allowing the final item to occupy the natural remaining row. Keep headings subdued, links off-white or restrained orange, and surfaces flat.

Reject a newsletter, contact form, “hire me” CTA, skills/resources/archive sections, icon-only social links, theme toggles, animated decorations, and hover-only interactions. Preserve visible focus states and 44px touch targets.

### The Expansionist

Use a five-column footer that acts as a calm secondary sitemap and collaboration endpoint:

- **Start** — About (`/`) with the one-line identity: “AI Engineer building reliable agents and knowledge systems for knowledge work.”
- **Work** — Projects (`/projects/`), Experience (`/experience/`)
- **Background** — Experience (`/experience/`) only if the label adds useful context; otherwise use this column for a short plain-text focus statement.
- **Writing** — Blog (`/blog/`), which remains the index for published articles
- **Connect** — LinkedIn (“Connect professionally”), GitHub (“View code”)

Do not invent an email address, contact form, newsletter, skills cloud, testimonials, “Now” page, or technology-logo wall. LinkedIn is the credible contact pathway already available; GitHub supports technical discoverability.

Keep the footer in normal flow as a full-bleed, card-toned surface with a subtle top hairline. Inside it, use a `max-width: 1300px` container with 20px gutters, `67.2px` top padding, `30px` bottom padding, and five equal desktop columns separated by 10px gaps. Links should be smaller and quieter than navbar items, using restrained orange only for hover/focus; maintain visible focus rings and 44px minimum hit areas.

At tablet width, collapse to three columns; at mobile, use two columns with generous vertical spacing and left alignment. A small bottom row may contain “© Karim Ben Boubaker” and a text “Back to top” control. The navbar remains the fast primary switcher; the footer provides context, repetition at the end of long pages, and a clear path from reading to collaboration.

### The Outsider

Use a quiet, five-column footer that clarifies destinations without pretending this is a large publication.

- **About** — About
- **Work** — Projects
- **Background** — Experience
- **Writing** — Blog
- **Connect** — LinkedIn, GitHub

Place “Karim Ben Boubaker” and the concise descriptor “AI Engineer” above or beside the columns. Add a small copyright line beneath. Do not add a newsletter, résumé download, contact form, sitemap, services, or extra social platforms without real destinations. Avoid icon-only social links; outsiders need recognizable text labels.

The fixed navbar is primary wayfinding and should remain the fastest route between sections. The footer is a secondary recovery surface: it reassures visitors who reach the end of a page, exposes the site’s information architecture, and provides direct external connection links. Grouping links under plain-language headings makes route purpose understandable to a first-time visitor; do not repeat the navbar as an unlabelled second menu.

Render the footer in normal flow with a full-viewport-width, card-toned background, a top hairline, 67.2px top padding, and 30px bottom padding. Constrain its inner wrapper to 1300px with 20px gutters. On desktop, use five equal or proportionally balanced columns with 10px gaps. On tablet, preserve the grid until labels become cramped; then reduce column width naturally. On mobile, use two columns, left-align everything, and let the final item occupy the remaining row. Give every link a 44px minimum touch target, visible keyboard focus, restrained orange hover/focus color, and readable contrast. Keep surfaces flat: no gradients, shadows, or decorative clutter.

### The Executor

Use a quiet, utility-focused footer with one identity line and five link groups:

- **About:** About → `/`
- **Work:** Projects → `/projects/`; Experience → `/experience/`
- **Writing:** Blog → `/blog/`
- **Connect:** LinkedIn → existing profile URL; GitHub → existing profile URL
- **Site:** Back to top → `#top`

Do not list individual articles until their canonical URLs are known. Do not add Contact, newsletter signup, résumé download, “Services,” legal claims, social icons, or a second brand statement.

Semantic structure:

```jsx
<footer>
  <div className="footer__inner">
    <div className="footer__intro">
      <p>Karim Ben Boubaker</p>
      <p>AI Engineer exploring reliable knowledge systems for knowledge work.</p>
    </div>
    <nav aria-label="Footer navigation">
      <section><h2>About</h2>…</section>
      …
    </nav>
    <small>© {year} Karim Ben Boubaker</small>
  </div>
</footer>
```

Keep the footer in normal flow, but make it full-bleed with `width: 100vw` and `margin-inline: calc(50% - 50vw)`. Its inner wrapper uses `max-width: 1300px`, `margin-inline: auto`, and `padding-inline: 20px`.

Use the existing card-toned surface, warm near-black palette, hairline border, flat color, and 67.2px/30px top-bottom padding. The link grid has 10px gaps: five columns on desktop, three on tablet, and two on mobile. Links receive minimum 44px vertical hit areas, readable contrast, and visible `:focus-visible` outlines. Keep typography and links subordinate to the fixed primary navbar; the footer is a recovery and orientation aid, not a duplicate navigation bar.

## Peer review round

The advisor responses were randomized as follows for review:

- **Response A:** The Outsider
- **Response B:** The Contrarian
- **Response C:** The Executor
- **Response D:** The Expansionist
- **Response E:** The First Principles Thinker

The runtime had no available agent slot for a second five-agent pass while the background research writer was completing. Therefore, the five reviews below were completed as isolated internal reviewer passes, each using only the anonymized responses. This preserves the required independent-review stage, with the runtime limitation recorded explicitly.

### Reviewer 1

1. **Strongest:** Response B. It has the clearest editorial constraint: use the five-column layout without manufacturing five categories. It also gives a defensible rejection list and protects the site from generic portfolio drift.
2. **Biggest blind spot:** Response C. “Back to top” is implementation-ready but assumes a `#top` target and a need that has not been established. Its five-group structure may also encourage unnecessary filler.
3. **All five missed:** The footer should be checked against the actual page lengths and route context. A shared footer can be related to every page through the verified site map, but it should not invent page-specific copy merely to feel customized.

### Reviewer 2

1. **Strongest:** Response A. Its plain-language grouping is easiest for a first-time visitor to understand, and it treats the footer as secondary recovery navigation rather than a competing header.
2. **Biggest blind spot:** Response D. “Background” duplicates Experience and would create a misleading fifth category unless it contains real, distinct content.
3. **All five missed:** The final implementation must keep the footer outside `<main>` and preserve one page-level footer landmark. Visual columns need semantic headings and lists, not only CSS positioning.

### Reviewer 3

1. **Strongest:** Response E. It derives the footer from three concrete user jobs—orientation, secondary routing, and verified external presence—and avoids adding a marketing funnel.
2. **Biggest blind spot:** Response B. Leaving unused space is defensible, but it needs a deliberate grid-span treatment so the desktop footer feels composed rather than accidentally incomplete.
3. **All five missed:** A full-width treatment must be tested with the repository’s stable scrollbar gutters and narrow breakpoints. A naive `100vw` rule can produce horizontal overflow; the surface and inner cap should be separated.

### Reviewer 4

1. **Strongest:** Response C. It is the most directly implementable: it names the groups, destinations, source structure, sizes, breakpoints, and focus behavior.
2. **Biggest blind spot:** Response D. It overvalues a five-column taxonomy and repeats Experience under two labels, which conflicts with the site’s small, evidence-bounded content model.
3. **All five missed:** There is no evidence that a newsletter, résumé, contact form, or “hire me” action belongs on this site. The council correctly rejects them, but the final decision should say that the absence is intentional, not merely deferred styling.

### Reviewer 5

1. **Strongest:** Response B. It best balances the design-system requirement with content honesty: five tracks can be a visual scaffold, not a content quota.
2. **Biggest blind spot:** Response A. Its separate About, Work, Background, and Writing headings are understandable, but “Background” is too close to Experience and may be read as a destination that does not exist.
3. **All five missed:** The footer should not repeat the navbar’s icons, tooltips, or compact active-state treatment. Text links can repeat destinations for a distinct page-end purpose while remaining visually subordinate.

## Chairman synthesis

### Where the Council Agrees

- A footer earns its place here as a page-end orientation and recovery surface, not as a second hero, sales funnel, or generic mega-footer.
- It should contain only verified, useful destinations: About (`/`), Projects (`/projects/`), Experience (`/experience/`), Blog (`/blog/`), LinkedIn, and GitHub.
- A short owner/context statement is useful and grounded in the existing About content. No email, phone, location, employer, availability statement, résumé, newsletter, services, or legal page should be invented.
- The footer must be semantic, keyboard reachable, visibly focused, text-labelled, and in normal document flow. It must not be fixed or sticky like the navbar.
- The surface should be full-bleed and card-toned, while its content is capped at 1300px with 20px gutters. Use the existing 67.2px top padding, 30px bottom padding, hairline separation, flat surfaces, and restrained typography.
- The five-column desktop requirement is a composition rule, not a reason to create five artificial content categories. Reflow to two columns on mobile and one only when narrow labels become cramped.

### Where the Council Clashes

- Some advisors propose five populated groups, including `Site`/`Back to top` or a separate `Background` group. Others argue for two meaningful groups and open space. The latter is the better fit: the site has four internal routes and two external profiles, not five distinct footer taxonomies.
- Some advisors include a copyright line. It is conventional but not necessary, and the current site has not established a copyright/legal convention. Omit it unless Karim confirms the wording. A footer should not make a legal claim by default.
- Some advisors suggest a `Back to top` link. It is harmless only when a real `#top` target exists and long-page testing shows value. It is not part of the initial content decision.
- The exact number of tablet columns varies between two and three. The project design explicitly specifies two columns on smaller screens; follow that shared contract and allow a one-column narrow fallback if wrapping or target spacing becomes poor.

### Blind Spots the Council Caught

- The five-track grid can be honored through spans and breathing room rather than filler. Use a composed arrangement such as `Context` spanning two tracks, `Explore` spanning two tracks, and `Connect` occupying one track.
- “Background” is not a safe synonym for Experience; it creates a duplicate destination and should be rejected.
- The full-width surface and capped content are separate responsibilities. Use a normal-flow footer that fills its parent width and an independent inner wrapper; avoid a careless `100vw` implementation that can fight stable scrollbar gutters and create page-level overflow.
- The footer’s relationship to the navbar is functional, not merely visual: the navbar is the compact primary switcher, while the footer is the readable page-end directory and connection point. Repeated links are acceptable when their grouping and styling communicate that difference.
- A footer inside `<main>` or inside the route article would change its semantics and scope. It belongs after `</main>` in the shared shell, with a single site-wide footer landmark.

### The Recommendation

Implement one shared footer in `PageShell`, after the route’s `<main>` content, with this content:

1. **Context** — `Karim Ben Boubaker` and `AI Engineer exploring how humans and AI agents can collaborate in knowledge work.`
2. **Explore** — About, Projects, Experience, Blog.
3. **Connect** — LinkedIn and GitHub, using the existing visible text links and verified URLs.
4. No extra route, article list, email, newsletter, résumé, services, legal boilerplate, copyright line, or “back to top” control in the first version.

Use a semantic `<footer>` with a named footer navigation, grouped headings, unordered lists, and normal anchors. Keep the footer’s text links subordinate to the fixed navbar: no repeated SVG icons, tooltips, or compact icon-only controls. Use the existing tokens: `--surface-card`, `--ink`/`--body`, `--muted`, `--hairline`, and `--primary` for restrained interaction states. Keep focus visible and target areas at the project’s 44px baseline.

For layout, make the footer surface full-width in normal flow. Put an inner wrapper at `max-width: 1300px`, centered with 20px horizontal gutters. Use the documented five-track desktop composition with meaningful spans rather than five populated categories; a practical arrangement is Context across two tracks, Explore across two tracks, and Connect across one. Reflow those same groups to two columns below desktop and one column only when required for legibility. Preserve source order and avoid an accordion or mobile-only hidden navigation.

This gives visitors a clear page ending and a second route into the site without changing the site’s personal, quiet editorial character or making unsupported promises.

### The One Thing to Do First

Add the shared footer skeleton to `PageShell`—outside `<main>`—with the exact Context, Explore, and Connect content above, before writing any CSS. This fixes the semantic scope and content contract first; the full-width surface and responsive grid can then be calibrated against the rendered routes.

## Research basis

The primary-source UX/UI and accessibility evidence used by the council is recorded in [`footer-ux-research.md`](footer-ux-research.md), including WHATWG, W3C WAI/WCAG, MDN, USWDS, and GOV.UK Design System sources.
