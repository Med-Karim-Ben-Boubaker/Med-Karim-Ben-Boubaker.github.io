# Interactive data-visual effect terminology

**Date:** 2026-09-04  
**Question:** What formal UI/design terms best describe data-like graphics appearing on hover, cursor-reactive backgrounds, and interactive tech/noise visuals?  
**Scope:** Terminology, implementation vocabulary, live first-party demos, and accessibility constraints. This is a research note only; no application code was changed.

## Decision summary

There is no single formal name for all of these effects. Use a layered description:

```text
trigger/state      + visual motif          + motion/interaction       + rendering technique
hover state        + digital-rain motif   + reveal microinteraction  + CSS overlay
pointer position   + particle field       + pointer-reactive          + canvas/WebGL
time/noise input   + procedural texture    + ambient/expressive motion + shader
```

For this site, the clearest design-brief terms are **hover-triggered digital-rain overlay**, **pointer-reactive particle background**, and **procedural noise texture**. Use **data visualization** only when the visual actually encodes information a visitor is expected to interpret; binary digits used as atmosphere are better described as a **data-inspired decorative motif** or **Matrix-style/digital-rain effect**.

## Recommended vocabulary

| Visual or behavior | Preferred term | Use it when | Avoid calling it |
| --- | --- | --- | --- |
| 0/1s, pseudo-code, or changing numbers appear when a card/link is hovered | **Hover-triggered digital-rain overlay**; **hover-revealed data-inspired motif** | The content is decorative and appears as a response to hover/focus. The Three.js examples and tsParticles demos use “rain” and “Matrix” for related character/particle scenes. ([Three.js Compute Rain](https://threejs.org/examples/webgpu_compute_particles_rain); [tsParticles Matrix preset](https://particles.js.org/demos/recipes/matrix)) | Data visualization, unless the values encode real, legible data. |
| A small visual change occurs on hover or focus | **Hover state** plus **hover-triggered microinteraction** | Material defines hover as an interaction state; Carbon uses microinteraction for component feedback and revealing information. ([Material 3 states](https://m3.material.io/foundations/interaction/states/overview); [Carbon motion](https://carbondesignsystem.com/elements/motion/overview/)) | “A fancy hover effect” in a design spec. |
| A background follows the mouse, touch, or pointer | **Pointer-reactive background layer**; **interactive particle field** | The effect responds to position or movement, especially when it is rendered behind content. “Pointer” is more inclusive than “cursor”; Vanta and tsParticles explicitly document mouse/touch or external interactions. ([Vanta.js](https://github.com/tengbao/vanta); [tsParticles interactivity](https://particles.js.org/docs/documents/tsParticles_Engine.Options_Interactivity.html)) | Cursor animation, unless it is specifically attached to a desktop cursor. |
| Dots/lines repel, attract, connect, or leave a trail near the pointer | **Pointer-reactive particle system**; name the mode when useful: **repulse**, **attract**, **trail**, or **links** | The particles have independent positions and interaction rules. tsParticles uses “external interactions” for mouse/touch behavior and names these modes in its API. ([tsParticles interaction guide](https://particles.js.org/guide/plugins-customization-interaction); [tsParticles interactivity events](https://particles.js.org/options/interactivity-events)) | Generic “background animation.” |
| Grain, clouding, organic distortion, or a flowing field is algorithmically generated | **Procedural noise texture/field**; **noise-driven visual** | The appearance is generated from a noise function or field rather than a fixed image. p5.js describes Perlin noise as producing sequences that appear random and organic. ([p5.js Noise example](https://p5js.org/examples/Repetition-Noise/)) | Random texture, unless randomness is genuinely the mechanism. |
| GPU-rendered distortion, fluid motion, or procedural deformation | **Shader effect**; more specifically **noise-driven WebGL/GLSL shader** or **fragment-shader distortion** | The effect is implemented with custom GPU shader code. Three.js defines `ShaderMaterial` as custom GLSL programs running on the GPU and its hover demo calls the pattern “WebGL distortion hover.” ([Three.js ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html); [Codrops WebGL distortion hover](https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/)) | “WebGL background” when the important design behavior is the shader or distortion. |
| Sliced, offset, flashing, or misregistered layers appear on hover | **Glitch effect**; **glitch hover treatment** | The visual uses clipped/offset layers, blend modes, and short flashes. Codrops documents this pattern as a CSS glitch effect and notes that it can be applied to text as well as images. ([Codrops CSS Glitch Effect](https://tympanus.net/codrops/2017/12/21/css-glitch-effect/)) | Noise effect, which suggests grain or procedural variation rather than signal disruption. |
| A non-functional visual continuously adds atmosphere | **Ambient background motion** or **expressive motion** | It supports tone rather than communicating state or completing a task. Carbon distinguishes subtle “productive motion” from more visible “expressive motion.” ([Carbon motion](https://carbondesignsystem.com/elements/motion/overview/)) | Interactive data visualization, unless it conveys interpretable data. |

## Rendering vocabulary

- **CSS hover overlay:** Best for a small, deterministic reveal of text, digits, or a texture. Use opacity/transform and a pseudo-element or sibling layer; call the interaction a microinteraction, not a background system.
- **Canvas particle system:** Best for many independent dots, symbols, links, trails, or character columns. The official tsParticles demos expose this model directly, including `Matrix`, `Links`, `Hyperspace`, and `Ribbons`, plus live pause/resume controls and source projects. ([tsParticles ready-to-use demos](https://particles.js.org/demos/); [tsParticles playground](https://particles.js.org/playground/))
- **WebGL/GLSL shader:** Best for dense procedural fields, fluid/noise distortion, and GPU-rendered post-processing. Three.js’s `ShaderMaterial` documentation is the implementation reference for custom GLSL materials. ([Three.js ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html))
- **Blend/compositing layer:** If the effect is combined with existing content, describe the compositing explicitly: CSS `background-blend-mode` blends an element’s background layers, while `mix-blend-mode` blends an element with its backdrop. ([MDN `background-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-blend-mode); [MDN `mix-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode))

## Live first-party examples and what they demonstrate

| Example | Useful reference |
| --- | --- |
| [Vanta.js gallery](https://www.vantajs.com/) and [Vanta source repository](https://github.com/tengbao/vanta) | Calls the category **animated website backgrounds**, renders with Three.js or p5.js, and documents mouse/touch interaction plus fallback concerns. |
| [tsParticles official demos](https://particles.js.org/demos/), [Matrix preset](https://particles.js.org/demos/recipes/matrix), and [demo source](https://github.com/tsparticles/tsparticles/tree/main/demo) | A practical vocabulary for **particle backgrounds**, `Matrix`, `Links`, `Ribbons`, hover, attract, grab, repulse, and particle-to-particle interactions. |
| [Three.js Compute Rain](https://threejs.org/examples/webgpu_compute_particles_rain) | A live official source demo using the concise **rain** label for a data-like falling-particle scene. The [particle examples index](https://threejs.org/examples/?q=particle) also exposes fluid, snow, attractor, and linked-particle variants. |
| [p5.js Noise](https://p5js.org/examples/Repetition-Noise/) | A first-party example for **Perlin noise** and organic procedural variation, with editable source code. |
| [Codrops Interactive Points](https://tympanus.net/Development/InteractivePoints/) | A live **interactive points**/hover background treatment that is useful for studying pointer-linked points without treating them as literal data. |
| [Codrops Distortion Hover Effect](https://tympanus.net/Development/DistortionHoverEffect/) | A live **WebGL distortion hover** demo; the companion [source explanation](https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/) identifies displacement images and Three.js. |
| [Codrops CSS Glitch Effect](https://tympanus.net/codrops/2017/12/21/css-glitch-effect/) | A source-backed **glitch hover** pattern using clipped layers, blend modes, offsets, and flashes; it explicitly notes that the technique can target text. |

## Accessibility and naming guardrails

- Treat hover as a state, not as the only input. Any meaningful reveal must also work on keyboard focus. WCAG 2.2’s **Content on Hover or Focus** criterion requires hover/focus content to be dismissible, hoverable, and persistent long enough to use. ([WCAG 2.2, SC 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html))
- Keep decorative motion non-essential and honor reduced-motion preferences. WCAG 2.2 names **Animation from Interactions** as a criterion, and W3C’s C39 technique recommends `prefers-reduced-motion` to suppress interaction-triggered motion when requested. ([WCAG 2.2, SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html); [W3C C39](https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html))
- Do not label changing decorative digits as a visualization in product/design copy unless their values have meaning. “Data-inspired,” “digital,” or “Matrix-style” communicates the aesthetic without implying an analytical purpose.
- For this small portfolio, the lowest-complexity progression is: CSS hover-reveal first; a bounded canvas particle layer only if the visual requires many moving elements; a shader only if procedural distortion or fluid/noise behavior is the actual goal. This is an implementation recommendation inferred from the capabilities and trade-offs shown by the cited demos, not a requirement of any source.

## Suggested design-spec wording

> Add a restrained **hover-triggered digital-rain overlay** to project links. The effect is a decorative **data-inspired motif**, not a data visualization. Keep it pointer/focus-equivalent, subordinate to the content, and disabled or reduced under `prefers-reduced-motion`.

> Add an optional **pointer-reactive particle background layer** behind the hero. Describe the visual as **ambient/expressive motion** and keep the canvas non-essential, low-contrast, bounded, and non-blocking for content interaction.

## Sources

- [Material Design 3 — States](https://m3.material.io/foundations/interaction/states/overview)
- [IBM Carbon Design System — Motion](https://carbondesignsystem.com/elements/motion/overview/)
- [Vanta.js — Animated website backgrounds](https://github.com/tengbao/vanta)
- [tsParticles — Ready-to-use demos](https://particles.js.org/demos/)
- [tsParticles — Matrix preset](https://particles.js.org/demos/recipes/matrix)
- [tsParticles — Demo source](https://github.com/tsparticles/tsparticles/tree/main/demo)
- [tsParticles — Interaction guide](https://particles.js.org/guide/plugins-customization-interaction)
- [Three.js — Compute Rain example](https://threejs.org/examples/webgpu_compute_particles_rain)
- [Three.js — `ShaderMaterial`](https://threejs.org/docs/pages/ShaderMaterial.html)
- [p5.js — Noise example](https://p5js.org/examples/Repetition-Noise/)
- [Codrops — Interactive Points](https://tympanus.net/Development/InteractivePoints/)
- [Codrops — WebGL Distortion Hover Effects](https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/)
- [Codrops — CSS Glitch Effect](https://tympanus.net/codrops/2017/12/21/css-glitch-effect/)
- [MDN — `background-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-blend-mode)
- [MDN — `mix-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode)
- [W3C WCAG 2.2 — Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- [W3C WCAG 2.2 — Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [W3C Technique C39 — `prefers-reduced-motion`](https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html)
