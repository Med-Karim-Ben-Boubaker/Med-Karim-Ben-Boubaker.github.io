# Technology and logo provider research

**Research date:** 2026-09-02  
**Scope:** Replace the hand-maintained technology-icon registry used by the React/Vite experience and project pages with a broader, consistent source that supports white/black presentation.

## Executive recommendation

Use **theSVG as the primary brand/icon catalog**, consumed locally through **Iconify’s React component and individual `@iconify-icons/thesvg` imports**. Use the reviewed **Simple Icons** Iconify package for a mark that theSVG does not cover.

This combination addresses the current gap directly:

- theSVG’s live registry contains `pydanticai`, `langgraph`, and `neo4j`, as well as the current project technologies `python`, `react`, `vite`, `jupyter`, `github`, `obsidian`, `terraform`, and `mongodb` ([theSVG registry](https://thesvg.org/api/registry.json));
- the current implementation uses Simple Icons’ `qdrant` mark as the reviewed fallback for Qdrant, while Azure and RAGAS remain visible text-only because no reviewed monochrome mark is available in the selected catalogs;
- those entries expose a `mono` variant for the three missing technologies and the other listed developer tools, and the monochrome SVGs use `currentColor` (for example, [PydanticAI mono SVG](https://thesvg.org/icons/pydanticai/mono.svg));
- the Iconify package is suitable for a static site when used offline with individual icon objects, avoiding runtime requests to an icon API ([Iconify offline React example](https://github.com/iconify/iconify/blob/main/components-demo/react-demo/src/demo-components/UsageOffline.tsx));
- the existing CSS already uses `fill: currentColor`, so the visual treatment can remain token-driven and switch between the site’s white and black text colors without filters.

The recommended implementation is therefore:

```text
technology name
    -> reviewed provider slug
    -> local @iconify-icons/thesvg/<slug> import
    -> @iconify/react offline component
    -> CSS currentColor (white/black)
```

Keep employer logos separate. The existing Hochschule Offenburg, GreenEarthX, Oratio, and ACTIA images represent organizations in the experience-card header; technology marks represent tools used in a role. A technology catalog should not silently replace those verified employer assets.

## Current repository problem

`src/components/ProjectTechnologies.jsx` currently contains a hand-written `iconPaths` object. `TechnologyIcon` returns `null` when an item has no matching key. The experience data therefore renders text-only technology chips for entries such as PydanticAI, LangGraph, Neo4j, Terraform, Azure, MongoDB, and C/C++, even though the page data names those technologies. See [ProjectTechnologies.jsx](../../src/components/ProjectTechnologies.jsx) and the experience data in [App.jsx](../../src/App.jsx).

This is a registry and delivery problem, not a CSS problem: the component already renders an inline SVG and applies `fill: currentColor` in [App.css](../../src/App.css).

## Provider comparison

| Provider | Coverage relevant to this site | Monochrome / white-black fit | Delivery and maintenance | Main limitation |
| --- | --- | --- | --- | --- |
| **theSVG** | Live registry has all 11 checked slugs: PydanticAI, LangGraph, Neo4j, Python, React, Vite, Jupyter, GitHub, Obsidian, Terraform, and MongoDB. | `mono` exists for all 11 checked entries. Some brands additionally have `light` and `dark`; variants are per icon. Mono SVGs inherit `currentColor`. | Official npm packages, per-icon imports, React package, static SVG/CDN routes, and a machine-readable registry. | Individual brand licenses vary. `azure` currently exposes `default` and `wordmark`, not `mono`, so availability must be checked per slug. |
| **Simple Icons** | Broad, coherent brand collection. Current slugs include LangGraph, Neo4j, Pydantic, Python, React, Vite, Jupyter, GitHub, Obsidian, Terraform, and MongoDB. It does **not** currently include PydanticAI as a slug. | Strong fit for monochrome inline SVG: each icon has one path and can be rendered with `currentColor`. | Mature npm package with individual icon data and tree-shaking guidance. Icons are CC0 in the main collection, with trademark rights explicitly retained. | It does not solve the exact PydanticAI gap, and it does not provide a broad multi-collection catalog by itself. |
| **Iconify** | Aggregates many icon collections. Its search currently finds theSVG PydanticAI, LangGraph, and Neo4j entries and can expose many additional sets. | Excellent when the selected collection is monochrome; Iconify documents CSS color styling for monotone icons. Mixed collections can have inconsistent visual language and licenses. | React component, offline mode, and individual icon-object packages are available. API loading is convenient but introduces runtime network/CSP/cache dependence. | Iconify is a delivery/catalog layer, not one uniform brand collection; every selected collection and icon needs license/provenance review. |
| **Devicon** | Focused on development languages and tools, with 150+ icons. Current `devicon.json` includes Neo4j, Python, React, Vite, Jupyter, GitHub, MongoDB, Terraform, and Azure, but not PydanticAI or LangGraph. | Provides original/plain/line and colored/not-colored variants, so it can work for developer tools. | Raw SVG and npm/font delivery are documented. | Smaller coverage for newer AI frameworks, no exact PydanticAI/LangGraph solution, and the current npm package is much larger than the targeted per-icon alternatives. |

### Evidence for the comparison

- theSVG describes 6,500+ icons, 4,600+ brand icons, multiple variant types, tree-shakeable imports, and React support in its [official repository README](https://github.com/GLINCKER/thesvg/blob/main/README.md). The same README states that not every icon has every variant and that brand assets remain the property of their trademark holders.
- Simple Icons documents 3,400+ brand SVGs, slug-based downloads, npm imports, and bundler tree-shaking in its [official README](https://github.com/simple-icons/simple-icons/blob/develop/README.md). Its current slug list contains [LangGraph and Neo4j](https://github.com/simple-icons/simple-icons/blob/develop/slugs.md), and the Pydantic entry is [Pydantic, not PydanticAI](https://github.com/simple-icons/simple-icons/blob/develop/slugs.md).
- Devicon documents its 150+ icon scope, SVG/font formats, plain/line/colored variants, and brand-policy caveat in the [official README](https://github.com/devicons/devicon/blob/master/README.md).
- Iconify documents both API-backed components and offline icon-object imports in its [official repository](https://github.com/iconify/iconify), including the [offline React example](https://github.com/iconify/iconify/blob/main/components-demo/react-demo/src/demo-components/UsageOffline.tsx). Its React component documentation also describes on-demand retrieval and the local alternative ([React component README](https://github.com/iconify/iconify/blob/main/iconify-icon/react/readme.md)).

## Licensing and provenance

The license of the library code is not the same as the trademark status of a logo.

- theSVG’s code/tooling is MIT-licensed, but its README says individual brand icons remain intellectual property of their trademark holders and usage must follow brand guidelines ([theSVG license and disclaimer](https://github.com/GLINCKER/thesvg/blob/main/README.md#license)). The registry reports per-icon values such as `MIT`, `CC0-1.0`, and `brand-use`; this is why a small provider manifest should preserve the selected slug, variant, source URL, and reported license.
- Simple Icons’ main icon collection is CC0 ([license](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md)), but its legal disclaimer says trademark rights are not waived. Brand-policy review still applies.
- Devicon likewise instructs users to follow the relevant company or brand policy ([official README](https://github.com/devicons/devicon/blob/master/README.md)).

For this personal site, keep a local provenance note or manifest alongside the registry mapping. Do not claim that MIT/CC0 grants trademark permission or alter a mark beyond choosing the provider’s supplied monochrome variant.

## Delivery choice

Prefer **offline, local imports** for this static portfolio:

```bash
npm install @iconify/react @iconify-icons/thesvg @iconify-icons/simple-icons
```

Use individual icon imports such as `@iconify-icons/thesvg/pydanticai`, not a wildcard import of the entire catalog. Iconify’s individual icon package is designed for this object-based usage, and its package metadata marks the package as side-effect free. The package currently contains 3,700+ individual files; the build should include only the imported icons.

Avoid using the remote theSVG or Iconify CDN as the normal render path. Remote SVGs would make the page depend on third-party availability, Content Security Policy configuration, and an external request at render time. CDN usage is useful as a discovery or emergency fallback, not as the canonical production asset path.

## Proposed implementation shape

1. Replace the long `iconPaths` string object with a reviewed map from stable site-level keys to imported icon objects.
2. Add explicit keys for `pydanticai`, `langgraph`, `neo4j`, `terraform`, `azure`, `mongodb`, and `cpp`; do not infer slugs from display names at render time.
3. Render the icon object through Iconify’s offline React component so the SVG is inline and `currentColor` works.
4. Keep `.project-technology-icon` responsible only for size and `color`; use the existing `--ink` token for the default white/off-white presentation. If a light-background section is later introduced, switch the token to the site’s dark ink token.
5. Give every technology item either a reviewed icon or a deliberate neutral fallback. Missing icons should not disappear silently as they do today.
6. Add a small source/provenance table or comments documenting provider slug, variant, source URL, and license for non-obvious or brand-use entries.
7. Verify the result with lint, production build/prerender, and a narrow/high-zoom visual check of the experience timeline.

## Decision

Adopt **theSVG mono via local Iconify imports** for the technology chips. Keep Simple Icons as the fallback for any theSVG entry that is unavailable or whose supplied variant does not fit the design. The current experience implementation uses that fallback for Qdrant and deliberate text-only labels for Azure and RAGAS. Do not adopt Devicon as the primary provider: it has useful developer marks, but it does not cover the exact AI-framework gap that motivated this change.

This recommendation is an inference from the verified coverage, variant, licensing, and delivery evidence above; it should be rechecked when adding a new technology because catalogs and per-icon variants change.
