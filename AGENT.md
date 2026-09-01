# About Page Design Decisions

## Scope

- Recreate the About page with React and Vite.
- Preserve the main content, navbar, and important assets from the existing reference implementation.
- Keep the page personal, direct, and authentic rather than making it look like a generic portfolio template.

## Content and structure

- Remove the AI Research Intern experience entry.
- Remove the Offenburg University and INSAT education lines.
- Remove the experience, projects, blog, GitHub, and LinkedIn links.
- Remove the section divider/fineline.
- Remove the footer.

## Navbar

- Preserve the minimalist navbar design.
- Do not modify the existing icon artwork or SVG paths.
- Spacing, padding, dimensions, and alignment may be adjusted.
- Keep the navbar horizontally centered.
- Use 40px square controls on desktop with increased horizontal spacing.
- Use 44px square controls on mobile for comfortable touch interaction.
- Keep the navbar responsive and prevent horizontal overflow at narrow phone widths.

## Layout and visual direction

- Use balanced whitespace and a clear vertical rhythm between the navbar, introduction, portrait, and content sections.
- Calibrate the navbar against the page content so it does not feel visually undersized or disconnected.
- Treat the personal image as part of the page’s overall visual balance and calibrate its size and placement accordingly.
- Maintain a minimal, quiet dark interface with clear typography hierarchy and no unnecessary page chrome.

## UX and accessibility standards

- Use WCAG 2.2 target-size guidance as a baseline: 24x24px minimum and 44x44px for enhanced touch targets.
- Follow Apple Human Interface Guidelines’ 44x44pt recommendation for touch controls where practical.
- Verify desktop and mobile layouts with rendered browser screenshots.
- Check comfortable margins, control spacing, keyboard/focus usability, and horizontal overflow at representative viewport sizes.
