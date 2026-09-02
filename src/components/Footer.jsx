const footerLinks = [
  {
    label: 'karimbb2002@gmail.com',
    href: 'mailto:karimbb2002@gmail.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Med-Karim-Ben-Boubaker',
    external: true,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-credit">Made by Mohamed Karim Ben Boubaker <span aria-hidden="true">·</span> © {year}</p>
        <nav className="site-footer-social" aria-label="Footer links">
          <ul>
            {footerLinks.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {label}{external && <> <span aria-hidden="true">↗</span></>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
