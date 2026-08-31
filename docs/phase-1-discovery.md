# Phase 1 — Website redesign discovery

**Audited:** 2026-08-25
**Status:** Discovery complete; audience, positioning, and a few launch-scope choices still need confirmation.

## Executive summary

The current site is a small Hugo/PaperMod blog with four published AI-focused articles, one draft article, a working custom domain, and a GitHub Pages deployment workflow. It is not yet a broader personal site: there are no project, about, now, résumé, talks, or contact pages in the source.

The redesign can stay on Hugo and retain the static GitHub Pages workflow. The strongest provisional launch shape is:

- Home with a clear positioning statement, selected work, and latest writing.
- Writing, preserving the existing article URLs and feeds.
- About, to explain experience and working interests beyond individual posts.
- Projects/Work, once at least one or two projects have verifiable repositories, demos, screenshots, or outcomes.
- Lightweight contact links through GitHub and LinkedIn; a dedicated form is not required for launch.

`Now`, newsletter, comments, interactive demos, and a client-side application should remain later work unless the user identifies a concrete need. The visual direction is confirmed as modern, technical, professional, near-black/dark, and inspired by shadcn/ui and AI-product interfaces. That inspiration does not require React or a framework migration.

## Evidence boundaries

The observations below are separated from recommendations:

- **Repository facts** come from the checked-out Hugo source, workflow, tracked generated output, and Git history.
- **Live-site facts** come from a read-only inspection of `https://karimbenboubaker.me/` and representative pages.
- **Direction marked provisional** is a recommendation for the next decision round, not a user-confirmed requirement.

## Repository and deployment audit

| Area | Observed state | Implication |
| --- | --- | --- |
| Generator | Hugo configuration is in [`hugo.yaml`](../hugo.yaml). The site uses `PaperMod`, pagination size 5, English, taxonomies for categories/tags/series, robots output, and production metadata. | A static content-first redesign is a natural continuation of the current system. |
| Theme | PaperMod is declared as a Git submodule at `themes/PaperMod`, pinned in the repository to commit `5a4651783fa9159123d947bd3511b355146d4797`. The checked-out submodule directory is currently empty because the clone has not initialized it. | A local Hugo build cannot be reproduced from this checkout until the submodule is initialized. Keep the theme pin explicit in future build checks. |
| Content | Source content consists of `content/archives.md`, `content/resources.md`, one AI section index, four non-draft posts, and one draft post. | The existing content supports Writing and a technical identity, but not yet every proposed personal-site section. |
| Local customization | The repository has a KaTeX-oriented `layouts/partials/extend_head.html` override and an inline-styled `layouts/shortcodes/audio.html` shortcode. | Hugo can support richer article presentation without a framework migration, but visual overrides should be consolidated before a major redesign. |
| Assets | Images, covers, profile media, and audio are stored under `static/`; generated copies are also present under tracked `public/`. | Asset provenance and duplicate generated files need a deliberate policy during implementation. |
| Domain | [`CNAME`](../CNAME) contains `karimbenboubaker.me`. The live custom domain is reachable over HTTPS. | Preserve the custom domain and test canonical URLs after any build changes. |
| CI/CD | [`.github/workflows/hugo.yaml`](../.github/workflows/hugo.yaml) runs on pushes to `main` or manually. It installs Hugo Extended `0.146.0`, Dart Sass, recursively checks out submodules, runs `hugo --gc --minify --baseURL "${{ steps.pages.outputs.base_url }}/"`, and deploys the `public` artifact with GitHub Pages actions. | The publishing path already supports a custom static build. The redesign should remain compatible with this workflow. |
| Local build | The Hugo CLI is not installed in this checkout, so a fresh local build was not run during discovery. | Phase 2 should use the CI Hugo version, initialize the theme, build into an isolated output directory, and inspect the rendered result. |

The working tree was clean at the start of discovery (`main...origin/main`). No existing user changes were modified.

### Build and generated-output risks

The tracked `public/` directory contains generated pages that do not correspond to current source content, including legacy-looking `/posts/ai/...` routes, `/posts/my-new-article/`, and `/posts/ai/machine-learning-basics/`. Its local `sitemap.xml`, feed, and HTML metadata also contain `localhost` URLs. The current workflow does not explicitly pass a clean-destination flag. Before launch, build into a clean temporary directory and decide whether `public/` should remain tracked; otherwise stale pages and metadata can drift into the Pages artifact.

The source configuration declares `baseURL: https://Med-Karim-Ben-Boubaker.github.io/`, while CI overrides the base URL using the Pages environment and the live site uses the custom domain. This is workable, but canonical, Open Graph, RSS, sitemap, and internal-link output should be verified under the final production URL.

## Current page and URL inventory

### Live and source-backed routes

| Route | Evidence and current role | Discovery decision |
| --- | --- | --- |
| `/` | Live homepage. Shows the welcome text, GitHub/LinkedIn links, and four article cards. | Keep as the primary entry point, but rewrite the value proposition and add selected work. |
| `/archives/` | Live archive listing four published posts by date. Source: `content/archives.md`. | Keep as a Writing archive or rename/reframe it as Writing if the new information architecture is clearer. |
| `/resources/` | Live route exists, but it renders the same archive-style post list as `/archives/`. Source: `content/resources.md` uses `layout: "archives"`. | Do not expose this as a meaningful launch section until it contains curated resources or is removed/redirected. |
| `/posts/artificial-intelligence/` | Current section index in source and visible in article breadcrumbs. | Preserve as the existing content section unless a redirect plan is approved. |
| `/posts/artificial-intelligence/gpt-from-scratch/` | Published post; links to the `gpt-2-from-scratch` GitHub repository. | Preserve. It is the strongest current candidate for a featured project/article relationship. |
| `/posts/artificial-intelligence/ai-infrastructure-is-something-diffrent/` | Published post; the misspelling in the path is part of the existing URL. | Preserve the URL; correct display text only if desired. |
| `/posts/artificial-intelligence/plan-and-act-paper-review/` | Published post about the PLAN-AND-ACT agent architecture. | Preserve. |
| `/posts/artificial-intelligence/ai-coding-agents/` | Published post about AI coding-agent architectures. | Preserve. |
| `/posts/artificial-intelligence/first-post/` | Draft source exists and is not shown in the live archive, but a matching generated page is present in tracked `public/`. | Treat as a draft/legacy artifact, not as launch content. Decide whether to remove or redirect the generated route. |

### Machine-generated and taxonomy routes

The configuration and generated output also include the following supporting routes:

- `/index.xml` and post/section RSS feeds;
- `/sitemap.xml` and `/robots.txt`;
- `/search/`;
- `/categories/`, `/tags/`, and `/series/`;
- `/posts/` and the AI section pagination routes.

The live homepage exposes an RSS alternate link, even though `hugo.yaml` sets `disableRSS: true`; this configuration/output mismatch should be resolved deliberately rather than assumed away. Search is generated but is not a primary navigation item in the live page.

## Current theme and content-pipeline limitations

1. **PaperMod is list/article oriented.** It already handles article metadata, cover images, breadcrumbs, table of contents, word count, code-copy controls, RSS, and theme switching. A personal-site information architecture will require Hugo layouts/partials and styling overrides for project cards, About content, and any editorial homepage sections.
2. **There is no project content model.** Projects are currently mentioned inside articles, not represented as structured content with status, role, links, screenshots, or outcomes. A Projects section should be backed by a small front matter schema rather than hand-authored homepage fragments.
3. **The current page model is too permissive for launch clarity.** `Resources` is a duplicate archive, and the broad home copy does not state a specific visitor benefit. New sections should not be added merely to fill navigation.
4. **The article pipeline has external rendering dependencies.** Pages with `math: true` load KaTeX assets from jsDelivr through the custom head partial. This is acceptable for the existing articles but should be checked for offline behavior, CSP, and long-term dependency policy.
5. **Generated output is not a reliable source of truth yet.** The tracked `public/` tree contains historical routes and localhost metadata that are not aligned with the current source. The next build must be clean and reproducible.
6. **A framework migration is unnecessary for the stated direction.** The visual language can be implemented with Hugo templates, CSS variables, and static assets. Introducing React would add a build/deployment surface without solving the current content and positioning gaps.

## Audience and positioning

### Confirmed direction

- The site should feel modern, technical, professional, and near-black/dark.
- The author wants the site to grow beyond a blog.
- Existing evidence is concentrated in AI engineering, language models, agents, infrastructure, and learning in public.

The primary audience has not yet been confirmed. Based on the source and live content, the following is the recommended working assumption:

> **Provisional primary audience:** technical hiring managers, engineers, and research/industry collaborators evaluating how Karim thinks, builds, and communicates about AI systems.

This audience is narrow enough to guide the site while still allowing public technical writing. A broader audience can remain secondary rather than making the homepage generic.

### Positioning options

| Option | One-sentence positioning | Strength | Risk |
| --- | --- | --- | --- |
| **A — AI systems builder (recommended provisional)** | “Karim Ben Boubaker builds and explains practical AI systems—from language models and agents to the infrastructure that supports them.” | Matches the strongest evidence in the repository and supports Projects + Writing. | May underspecify research interests if those become central. |
| **B — Research-minded AI engineer** | “I study, implement, and communicate the ideas behind reliable AI systems.” | Leaves room for experiments, paper reviews, and future research work. | Less concrete for a visitor deciding what Karim actually builds. |
| **C — Learn-in-public technical author** | “A technical notebook on learning, building, and explaining modern AI.” | Accurately reflects the current blog and keeps the editorial tone. | Does not position the author strongly enough for collaboration or hiring. |

**Provisional 30-second takeaway:** Karim is an AI engineer who can reason from fundamentals, implement systems, and explain the trade-offs clearly. This should be confirmed against the intended audience before homepage copy is written.

## Launch versus later sections

| Section | Recommendation | Basis / launch condition |
| --- | --- | --- |
| Home | **Launch requirement** | Existing entry point; must make the positioning, selected work, and latest writing immediately legible. |
| Writing | **Launch requirement** | Four published articles already exist; preserve their URLs, metadata, feeds, and images. |
| Projects/Work | **Provisional launch requirement** | Launch with one or two genuinely documented projects, beginning with the GPT-from-scratch repository if its scope, role, and outcome can be summarized accurately. Do not create an empty portfolio grid. |
| About | **Provisional launch requirement** | Needed to explain the person behind the articles; requires a short confirmed biography and current focus. |
| Contact | **Lightweight launch requirement** | GitHub and LinkedIn already provide real contact paths. A dedicated page or form is optional. |
| Now | **Later** | Useful only if it will be updated regularly. No current source content supports it. |
| Research | **Later or merge into Work** | Add as a separate section only if there are enough research projects, publications, experiments, or formal research goals to justify it. |
| Résumé | **Later / decision-dependent** | Add when a current résumé or role-targeted summary is ready. |
| Talks | **Later** | No talk inventory is present. |
| Uses | **Later** | No current inventory is present; low launch value compared with positioning and work. |
| Resources | **Do not launch as-is** | Current route duplicates the archive. Either curate it, rename the concept, or remove/redirect it. |
| Newsletter | **Deferred** | Requires a recurring value proposition and a consistent publishing habit. |

### Recommended launch exclusions

Unless the user selects otherwise, keep these out of the first redesign release: comments, a contact form, newsletter signup, custom search UI, analytics, interactive demos, authentication, and a client-side application. Existing RSS, sitemap, robots, social links, article math/code behavior, and the custom domain should be treated as preservation requirements while the scope is refined.

## Open decisions

1. Confirm the primary audience: employers, research collaborators, clients, engineers, or a deliberate combination.
2. Select or revise the one-sentence positioning statement.
3. Identify the projects that are real enough to show at launch, including repository/demo/screenshot/outcome evidence.
4. Confirm whether every existing URL must remain unchanged. Recommendation: yes for the four published article URLs, with redirects for any intentional taxonomy or section changes.
5. Decide between dark-only and dark-first with a light-mode option. Recommendation: retain dark-first with the existing toggle unless accessibility or brand requirements say otherwise.
6. Decide whether the existing `/resources/` route should become a curated resource page or be removed/redirected.
7. Confirm the launch exclusions above, especially analytics, search, contact form, and résumé.

## Risks and unknowns

- **SEO and link drift:** the misspelled infrastructure URL, legacy generated routes, feeds, canonical URLs, and social metadata require an explicit preservation/redirect audit.
- **Build reproducibility:** the local theme submodule is uninitialized and Hugo is unavailable locally; the first implementation pass must reproduce the CI toolchain.
- **Artifact drift:** tracked `public/` contains historical and localhost output. Clean-output builds and a decision about tracking generated files are required.
- **Content readiness:** Projects and About should not be filled with placeholders. Their launch status depends on receiving concise, evidence-backed source material.
- **Positioning ambiguity:** the current home copy combines “blog,” learning in public, and broad AI-system language without a clear primary visitor outcome.
- **Theme dependency:** PaperMod provides useful article behavior but may make a custom personal-site layout harder to maintain if too many theme internals are overridden. Keep overrides small and document them.

## Recommended next phase

Phase 2 should be **content and information architecture**, still within Hugo:

1. Confirm audience, positioning, and the launch section list.
2. Collect the evidence for each selected project and write the About/contact source content.
3. Define the URL policy and redirect list before changing navigation or section names.
4. Initialize the PaperMod submodule and reproduce the CI build in a clean output directory using Hugo Extended `0.146.0`.
5. Create a content model for projects and a minimal homepage wireframe in native Hugo templates/CSS.
6. Render and inspect representative pages before beginning the full visual implementation.

## References

- Live site: [karimbenboubaker.me](https://karimbenboubaker.me/)
- Repository: [Med-Karim-Ben-Boubaker.github.io](https://github.com/Med-Karim-Ben-Boubaker/Med-Karim-Ben-Boubaker.github.io)
- Hugo configuration: [`hugo.yaml`](../hugo.yaml)
- Deployment workflow: [`.github/workflows/hugo.yaml`](../.github/workflows/hugo.yaml)
- Current content: [`content/`](../content/)
- Current local overrides: [`layouts/`](../layouts/)
