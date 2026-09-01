const items = [
  { label: 'About', href: '/', icon: 'about' },
  { label: 'Projects', href: '/projects/', icon: 'projects' },
  { label: 'Experience', href: '/experience/', icon: 'experience' },
  { label: 'Skills', href: '/skills/', icon: 'skills' },
  { label: 'Blog', href: '/blog/', icon: 'blog' },
]

function Icon({ name }) {
  const paths = {
    about: <><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></>,
    projects: <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L11 4.1A2 2 0 0 0 9.31 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />,
    experience: <><rect width="20" height="14" x="2" y="6" rx="2" /><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><path d="M2 10h20" /></>,
    skills: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />,
    blog: <><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></>,
  }

  return <svg className="site-nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths[name]}</svg>
}

export default function Navbar({ currentPath = typeof window !== 'undefined' ? window.location.pathname : '/' }) {
  const normalizedPath = currentPath.replace(/\/+$/, '') || '/'

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <ul className="site-nav-list">
        {items.map((item) => {
          const normalizedHref = item.href.replace(/\/+$/, '') || '/'
          const isCurrent = normalizedPath === normalizedHref || (normalizedHref !== '/' && normalizedPath.startsWith(`${normalizedHref}/`))

          return (
            <li className="site-nav-item" key={item.label}>
              <a
                className={`site-nav-link${isCurrent ? ' is-current' : ''}`}
                href={item.href}
                aria-label={item.label}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <Icon name={item.icon} />
                <span className="site-nav-tooltip" aria-hidden="true">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
