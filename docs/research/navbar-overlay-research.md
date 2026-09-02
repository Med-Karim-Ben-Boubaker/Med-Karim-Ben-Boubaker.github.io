# Persistent overlay navbar research

**Date:** 2026-09-02  
**Scope:** Portfolio-site navigation that remains visible while scrolling, spans the viewport, and uses a restrained translucent/blurred surface. Sources are limited to W3C/WCAG, MDN, and Apple’s Human Interface Guidelines.

## Recommendation

Use a **fixed persistent top navigation**: a full-width outer layer anchored to the viewport, with the existing centered icon list inside it. Keep the icon artwork, current-page state, hover/focus labels, and minimalist dark editorial treatment. Treat the visual treatment as a **translucent backdrop-filter surface** (often called a glass or frosted-glass navbar), not as a floating card: a low-opacity warm canvas fill, a subtle bottom hairline, and modest blur, with no shadow.

This is a design recommendation inferred from the requirements and the project’s existing system. The exact opacity and blur radius must be validated against the rendered pages because blur does not guarantee text contrast.

## Pattern and layout findings

- **Fixed vs. sticky:** `position: fixed` removes the element from normal flow and positions it against the viewport, which directly provides a navigation layer that remains visible during page scrolling. `position: sticky` remains tied to its nearest scrolling ancestor and containing block, so it can stop behaving as expected inside an ancestor with a scrolling mechanism. ([MDN: `position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position); [MDN: fixed persistent navigation example](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Positioning#fixed_positioning))
- **Full-width layering:** Make the outer nav span the viewport with logical block-start/inline insets (`inset-block-start: 0; inset-inline: 0`) and give it an explicit stacking level. A positioned element’s `z-index` controls its stack level and creates a local stacking context when set to an integer. ([MDN: `position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position); [MDN: `z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/z-index))
- **Content offset:** Fixed positioning does not reserve layout space. Preserve a deliberate top rhythm for the first page content, or reserve the nav’s effective height, so headings and the first focusable content are not hidden beneath the new layer. This is particularly important on mobile, where the existing `--page-top` is shorter than the desktop value.
- **Centering and width:** Keep the inner list centered in the same global reference frame as the documented page shells. The full-width background should not force the controls to become a full-width row; it should be the visual layer behind the centered navigation group.
- **Mobile viewport safety:** Add safe-area-aware inline and block padding when the nav is flush with the viewport. MDN documents `env(safe-area-inset-*)` for keeping content inside the visible rectangle on notched or rounded displays. ([MDN: `env()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env))

## Translucency, blur, and fallback

- Give the nav a partially transparent warm canvas surface, for example an alpha version of the existing `--canvas` token. `backdrop-filter` applies effects to pixels behind the element, and the element or its background must be transparent or partially transparent for the effect to be visible. ([MDN: `backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter))
- Define the readable non-blurred surface first, then add `backdrop-filter: blur(...)` inside `@supports (backdrop-filter: blur(1px))`. `@supports` is the standard CSS feature-query mechanism for conditional declarations. ([MDN: `@supports`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports))
- Use blur as a supporting depth cue, not as the contrast mechanism. Keep a sufficient alpha fill and a hairline boundary so the nav remains legible over plain canvas, imagery, cards, and active page content. Do not use a fully transparent background for text/icons.
- Stay consistent with `DESIGN.md`: no drop shadow, glow, gradient, or new saturated surface. A restrained translucent canvas plus the existing hairline is the smallest extension of the current depth system.

## Accessibility and interaction requirements

- **Contrast:** Test the actual composited result at every nav state. WCAG 2.2 requires at least 4.5:1 for normal text and 3:1 for large text; meaningful control/state visuals such as icons, borders, and focus indicators need at least 3:1 against adjacent colors. A blurred background can vary underneath the same label, so source-token contrast alone is insufficient. ([WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html); [WCAG 2.2 SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html))
- **Focus and skip link:** Preserve the existing semantic `<nav>`, `aria-current`, visible `:focus-visible` outline, and skip link. Make the skip link’s focused state stack above the fixed nav, and verify that focused page content is not entirely hidden by the nav. WCAG requires a visible keyboard-focus mode and says focused components must not be entirely obscured by author-created content. ([WCAG 2.2 SC 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html); [WCAG 2.2 SC 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html); [WCAG 2.2 SC 2.4.1](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html))
- **Targets and spacing:** Keep the project’s 40px desktop controls and 44px mobile controls. They exceed WCAG 2.2’s 24×24 CSS-pixel pointer-target minimum, and the mobile size matches Apple’s recommended default control size for iOS/iPadOS. Preserve a visible gap between adjacent controls; a modest increase from the current spacing is appropriate if the narrowest breakpoint still fits without horizontal overflow. ([WCAG 2.2 SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html); [Apple HIG: Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility))
- **Labels/tooltips:** Keep the existing labels on both pointer hover and keyboard focus. The links already have explicit accessible names via `aria-label`; that name must remain available independently of the visual popup. WAI-ARIA APG describes a tooltip as non-focusable, associated with its trigger by `aria-describedby`, and dismissible with `Escape`; it also notes that focus stays on the trigger. If the visual spans are upgraded to formal tooltip semantics, use stable IDs and `role="tooltip"`/`aria-describedby` rather than making the tooltip itself focusable. ([WAI-ARIA APG: Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/); [WAI-ARIA APG: Names and Descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/))
- **Hover/focus content:** Ensure each label remains visible long enough to read, does not disappear when a pointer moves toward it, and does not obscure essential content. WCAG 2.2’s hover/focus criterion requires dismissibility, hoverability, and persistence until the trigger is removed or the user dismisses the content. ([WCAG 2.2 SC 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html))
- **Reduced motion:** Do not hide or slide the navbar away based on scroll. Keep tooltip motion subtle and disable its positional transition under `prefers-reduced-motion: reduce`; an immediate opacity/state change is sufficient. MDN documents this media feature as the user preference for removing or reducing non-essential motion, including motion that can trigger vestibular discomfort. ([MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion))

## Grounded implementation checklist

Before implementation is accepted, verify at desktop and narrow mobile widths:

1. The nav remains visible at scroll positions near the top, middle, and bottom; the outer surface spans the viewport while the icon list stays centered.
2. The fallback surface is readable when blur is unavailable; the blurred surface is readable over every route’s content and never causes page-level horizontal overflow.
3. Skip link, nav links, tooltip labels, current-page state, and first content focus states remain visible and keyboard-operable.
4. Tooltips appear on hover and focus, do not take focus, and respect reduced motion; screen-reader output exposes each link’s name once.
5. 40px desktop / 44px mobile target sizes and the chosen increased gap remain usable at the compact fallback breakpoint.

## Current implementation inspected

The current navbar is rendered by `src/components/PageShell.jsx` as a top-level semantic nav. `src/components/Navbar.jsx` preserves four labeled links, inline SVG artwork, `aria-current`, and explicit `aria-label`s. `src/App.css` currently gives `.site-nav` a content-sized `margin-top`, opaque `--canvas-soft` fill, and a centered list with 12px desktop / 8px mobile gaps; it gives links 40px desktop / 44px mobile targets and reveals the CSS tooltip on `:hover` and `:focus-visible`. No application code was changed for this research task.

