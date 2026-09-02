# Footer UX/UI research

**Date:** 2026-09-02

**Question:** What footer content and information architecture should this small React/Vite personal site use, and how should the footer complement the fixed navbar across desktop, tablet, and mobile?

**Scope:** Page-level semantics, secondary navigation and findability, ownership/context/contact information, full-bleed versus capped layout, and accessible interaction. Sources are limited to WHATWG, MDN, W3C WAI/WCAG, USWDS, and GOV.UK Design System guidance.

## Decision summary

Add one shared, normal-flow `<footer>` after the page’s `<main>` content in `PageShell`. Treat it as a quiet page ending and a secondary directory, not as a second hero or a generic “mega-footer”. Use the existing four internal destinations and two verified social profiles, plus a short owner/context statement. Keep the current fixed navbar as the compact primary navigation; the footer may repeat the destination names as a second way to reach them, but should not reproduce its icon artwork, tooltips, or active-state treatment.

Use the existing five-track desktop grid as a layout scaffold, not as a reason to manufacture five categories. Let the meaningful groups span tracks when necessary. At tablet and mobile widths, reflow to two columns, then one column only if the labels become cramped. Keep the footer surface full-bleed and its contents inside the existing 1300px cap with 20px gutters.

## Evidence

### 1. A page footer is a semantic page-level content boundary

**Evidence.** The [WHATWG HTML Standard’s `footer` definition](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element) says that a footer represents the footer for its nearest sectioning content, or for the `body` when there is no such ancestor. It typically contains information about the section, including authorship, related-document links, and copyright data. A footer without a sectioning ancestor applies to the whole page and does not itself create a new section. [MDN’s `<footer>` reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer) likewise describes the page-level use and notes that the element is exposed as the `contentinfo` landmark in the page-level context.

**Inference for this site.** The shared footer belongs outside the route article and outside `<main>` as a sibling in the shared shell. That makes its scope the whole page, avoids confusing it with article metadata, and gives assistive-technology users a stable page-level landmark on every route. Use native `<footer>`; do not add a redundant `role="contentinfo"` unless a tested legacy-browser requirement makes it necessary. Keep exactly one site-wide footer per page. [MDN’s `contentinfo` guidance](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/contentinfo_role) says pages should have one top-level contentinfo landmark and recommends the native element.

**Recommendation.** Render one shared `<footer class="site-footer">` after `</main>`. Keep article-level metadata out of it. If a future article needs its own author/date footer, that is a different, nested section-footer use and must not become a second page-level contentinfo landmark.

### 2. A footer can provide a second, lightweight route to important content

**Evidence.** [WCAG 2.4.5, Multiple Ways](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html) requires more than one way to locate a page within a set of pages and explains that even a small site can use links from the home page as a sufficient site map. [USWDS footer guidance](https://designsystem.digital.gov/components/footer/) says to curate footer links toward popular content that may answer remaining questions, and explicitly says the footer does not need to mirror the header’s grouping. The [WHATWG `nav` definition](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element) says a footer’s short list of site links may not need a `nav` element, while allowing `nav` for a substantive navigation block.

**Inference for this site.** Because the fixed navbar is always available, the footer does not need to become a full sitemap, search system, or duplicate icon menu. It is still useful at the end of long project, experience, and article pages: users who reach the page bottom get a clear, text-based route back to the four top-level destinations and the two known external profiles. This is a second location for the same high-value destinations, not a claim that every page or future content type needs a footer link.

**Recommendation.** Use a single secondary link group such as `<nav aria-label="Footer links">` when the multi-column set is implemented. Give links visible, destination-specific text. Do not add a footer search, sitemap, tags, article pagination, newsletter, or “resources” section. The footer route set should remain the verified set:

- `/` — About
- `/projects/` — Projects
- `/experience/` — Experience
- `/blog/` — Blog
- existing LinkedIn profile
- existing GitHub profile

The footer should use plain text links and lists. It should not repeat the navbar’s SVG icons, hover tooltips, compact icon-only targets, or current-page visual treatment.

### 3. Ownership, context, and contact information belong there only when true

**Evidence.** The [WHATWG footer definition](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element) includes authorship and related information among typical footer content. The [WHATWG `address` definition](https://html.spec.whatwg.org/multipage/sections.html#the-address-element) says `address` represents contact information for the nearest article or body and must not contain non-contact information. [MDN’s `contentinfo` reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/contentinfo_role) describes identifying information, navigation links, and privacy statements as common contentinfo material. USWDS recommends limiting contact information to useful, current email or phone details and avoiding stale social accounts. ([USWDS footer guidance](https://designsystem.digital.gov/components/footer/))

**Inference for this site.** The site has a verified owner name, role, focus, LinkedIn link, and GitHub link, but the repository context does not provide a verified email address, location, employer, availability promise, privacy page, or contact route. The footer can make ownership and context clearer without inventing any of those facts.

**Recommendation.** Include a short text block such as:

> Karim Ben Boubaker — AI Engineer exploring how humans and AI agents can collaborate in knowledge work.

Use the already verified LinkedIn and GitHub destinations under a `Connect` heading. If an email is later supplied, add a real `mailto:` link inside an `address` element; do not put the role description or copyright text in `address`. Do not add “available for work”, an email address, a location, a company affiliation, a legal/privacy link, or a copyright year unless the owner provides or verifies it.

### 4. Full-bleed surface and capped inner content solve different layout problems

**Evidence.** [USWDS’s layout grid guidance](https://designsystem.digital.gov/utilities/layout-grid/) distinguishes a centered, max-width `grid-container` from full-width content: omit the container when a region should span the page, and use the container when its content should be centered and capped with responsive horizontal padding. [GOV.UK Design System layout guidance](https://design-system.service.gov.uk/styles/layout/) recommends designing small screens first, avoiding overly long lines with a maximum page width, and using responsive grid widths rather than assumptions about specific devices. GOV.UK’s [footer component documentation](https://design-system.service.gov.uk/components/footer/) also models separate footer navigation sections and an inner-container option.

**Inference for this site.** The requested full-width footer surface and the existing 1300px content cap are complementary: the surface should visually close the viewport, while the links and identity block should align to the site’s shared content reference frame. Reusing the 20px gutter and keeping the inner cap prevents the five-column desktop grid from becoming too wide or the mobile footer from touching the viewport edge.

**Recommendation.** Keep the footer in normal document flow with:

- a full-viewport-width `surface-card` background and a quiet top hairline;
- 67.2px top padding and 30px bottom padding, as already specified in `DESIGN.md`;
- an inner wrapper capped at 1300px with 20px horizontal gutters;
- five columns at desktop, with 10px column gaps and approximately 44.8px row spacing;
- two columns below the desktop breakpoint, with groups allowed to span both columns;
- one column only as a narrow-width fallback when link labels or the 20px gutters would otherwise create cramped wrapping.

The five-column rule should be implemented as a five-track composition, not five equally populated taxonomies. A practical arrangement is `Explore` spanning two tracks, `Connect` using one, and the owner/context block spanning two. This preserves the visual contract while respecting the site’s small content set.

### 5. Semantic grouping and accessible interaction matter more than visual density

**Evidence.** [WCAG 1.3.1, Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) requires relationships expressed visually to remain programmatically determinable or available in text. [W3C’s navigation landmark pattern](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html) says to use `<nav>` for navigation landmarks and to give multiple navigation landmarks unique labels. [WCAG 2.4.4, Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) says the purpose of each link must be determinable from its text or programmatically associated context; W3C notes that meaningful link text also helps users who browse a page’s link list.

**Inference for this site.** The footer’s visual columns should be real groups with headings and unordered lists, not positioned text that only looks grouped. Since the navbar is already a separate navigation landmark, the footer navigation needs a distinct name such as `Footer links`. The visible labels should carry the meaning; icons are optional decoration, not the accessible name.

**Recommendation.** Use a structure equivalent to:

```html
<footer class="site-footer">
  <div class="site-footer__inner">
    <nav aria-label="Footer links">
      <!-- grouped headings and unordered lists of verified links -->
    </nav>
    <div class="site-footer__context">
      <!-- owner name and short, verified context statement -->
    </div>
  </div>
</footer>
```

Use visible group headings, real `<ul>`/`<li>` lists, normal anchors with `href`, and `aria-hidden="true"` for any decorative icon next to a text label. Keep external-link behavior consistent with the existing social links; if they open a new tab, retain an accessible indication of that behavior. Do not make the footer collapsible on mobile: this small set can reflow into two columns without introducing accordion state, extra focus management, or hidden links.

### 6. Keyboard focus, contrast, target size, and reflow must be verified in the rendered footer

**Evidence.** [WCAG 2.4.7, Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) requires a visible keyboard-focus mode. [WCAG 2.4.11, Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) specifically warns that author-positioned persistent content, including a sticky footer, must not hide the focused item. [WCAG 2.5.8, Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) sets a 24×24 CSS-pixel minimum with spacing exceptions. [WCAG 1.4.3, Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) requires 4.5:1 for normal text and 3:1 for large text. [WCAG 1.4.10, Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) requires non-excepted content to reflow to a 320 CSS-pixel equivalent without forcing page-level horizontal scrolling. [WCAG 2.4.1, Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) requires a mechanism to bypass repeated blocks, while [WCAG 3.2.3, Consistent Navigation](https://www.w3.org/WAI/WCAG21/Understanding/consistent-navigation.html) requires repeated navigation mechanisms to occur in the same relative order across pages. USWDS’s [footer accessibility tests](https://designsystem.digital.gov/components/footer/accessibility-tests/) also checks tab order, contrast, and link-purpose clarity.

**Inference for this site.** A normal-flow footer is safer than a sticky bottom bar because it cannot cover focused links or page content. The existing skip link, navbar focus styling, stable source order, and shared footer placement already provide the right foundation; the new footer must preserve them across all routes and breakpoints.

**Recommendation.** Verify that:

- every footer link is keyboard reachable in a logical source order and has a visible `:focus-visible` outline;
- link text and the footer’s secondary text meet contrast requirements on `surface-card`; do not rely on orange alone to communicate state;
- link hit areas are at least the project’s 44px target where practical, with enough separation between adjacent targets;
- no label, focus ring, or link becomes clipped at tablet or mobile widths;
- the five-to-two-column transition produces no page-level horizontal overflow at narrow widths and high zoom;
- the footer remains after the main content in the same relative order on About, Projects, Experience, Blog, article, and not-found routes;
- no hover-only content is required to understand or activate a footer link;
- if any future footer disclosure is added, it receives the same keyboard, focus, reduced-motion, and accessible-name treatment as the existing navbar interactions.

## Proposed content and information architecture

| Area | Content to implement | Treatment |
| --- | --- | --- |
| Explore | About, Projects, Experience, Blog | One secondary navigation group; visible text links to the existing top-level routes. |
| Connect | LinkedIn, GitHub | Reuse the existing verified URLs and visible names; keep external-link behavior explicit. |
| Context | Karim Ben Boubaker; “AI Engineer exploring how humans and AI agents can collaborate in knowledge work.” | Plain text identity/context, not a new route or marketing claim. |
| Ownership/meta | Optional owner line only if the owner confirms the desired wording; otherwise omit copyright/legal boilerplate. | Small, subordinate text below or beside the main groups. |

Desktop layout: a full-bleed card-toned footer with a 1300px inner wrapper. Use five grid tracks: let `Explore` span two, `Connect` span one, and `Context` span two. Keep link groups left-aligned, text-based, and subordinate to the fixed navbar.

Tablet/mobile layout: reflow to two equal columns with `Explore` spanning the available width when needed. Keep the same source order and group order. At the narrowest width, switch to one column if two columns cause label wrapping, target collisions, or overflow. Do not introduce a hamburger, accordion, carousel, or sticky footer.

## Claims and content to reject unless verified

- A personal email address, phone number, location, employer, availability statement, or contact form.
- Privacy, cookies, accessibility, terms, licensing, or other legal links that do not correspond to real published pages or obligations.
- A newsletter signup, RSS/feed claim, search, sitemap, tags, article archive taxonomy, or “resources” section outside the documented site scope.
- Social accounts beyond the existing LinkedIn and GitHub links, especially accounts that may become stale.
- A copyright year, “last updated” date, technology credits, or hosting/deployment claim unless the owner confirms the wording and source.
- Repeated icon artwork, tooltips, invisible labels, hover-only interactions, or a fixed/sticky footer.
- Five artificial link categories created only to fill the desktop grid. The five-track treatment should remain visually balanced through spans and context text, not duplicate destinations.

## Sources used

- [WHATWG HTML Standard — `footer`](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element)
- [WHATWG HTML Standard — `nav`](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element)
- [WHATWG HTML Standard — `address`](https://html.spec.whatwg.org/multipage/sections.html#the-address-element)
- [MDN — `<footer>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer)
- [MDN — `contentinfo` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/contentinfo_role)
- [W3C WAI — WCAG 2.4.5 Multiple Ways](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html)
- [W3C WAI-ARIA APG — Navigation landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html)
- [W3C WAI — WCAG 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [W3C WAI — WCAG 2.4.4 Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
- [W3C WAI — WCAG 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [W3C WAI — WCAG 2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [W3C WAI — WCAG 2.5.8 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [W3C WAI — WCAG 1.4.3 Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3C WAI — WCAG 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [W3C WAI — WCAG 2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- [W3C WAI — WCAG 3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG21/Understanding/consistent-navigation.html)
- [USWDS — Footer](https://designsystem.digital.gov/components/footer/)
- [USWDS — Layout grid](https://designsystem.digital.gov/utilities/layout-grid/)
- [USWDS — Footer accessibility tests](https://designsystem.digital.gov/components/footer/accessibility-tests/)
- [GOV.UK Design System — Footer](https://design-system.service.gov.uk/components/footer/)
- [GOV.UK Design System — Layout](https://design-system.service.gov.uk/styles/layout/)
