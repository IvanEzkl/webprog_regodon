import Logo from './Logo';

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/ezekiel.regodon' },
  { label: 'GitHub', href: 'https://github.com/IvanEzkl' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivan-ezekiel-regodon-082a67379/' },
];

const SocialIcon = ({ label }) => {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'h-4 w-4',
    'aria-hidden': 'true',
  };

  if (label === 'Facebook') {
    return (
      <svg {...common}>
        <path d="M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1 -1h3V3h-4a5 5 0 0 0 -5 5v2h-2" />
      </svg>
    );
  }

  if (label === 'GitHub') {
    return (
      <svg {...common}>
        <path d="M9 19c-5 1.5-5-2.5-7-3" />
        <path d="M14 22v-4a3 3 0 0 0 -.88-2.12c3.94 -.44 6.88 -2 6.88 -5.88a4.81 4.81 0 0 0 -1.28 -3.3a4.22 4.22 0 0 0 -.08 -3.3s-1.05 -.33 -3.44 1.3a11.64 11.64 0 0 0 -6.4 0c-2.39 -1.63 -3.44 -1.3 -3.44 -1.3a4.22 4.22 0 0 0 -.08 3.3a4.81 4.81 0 0 0 -1.28 3.3c0 3.85 2.94 5.44 6.88 5.88A3 3 0 0 0 10 18v4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M8 11v5" />
      <path d="M8 8v.01" />
      <path d="M12 16v-5" />
      <path d="M16 16v-3a2 2 0 0 0 -4 0" />
      <path d="M3 5h18" />
    </svg>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-10 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-7 sm:gap-8 lg:flex-row">
        <div className="text-center lg:text-left">
          <Logo className="justify-center lg:justify-start" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-500)]">
            Ivan Ezekiel Regodon | NU Manila
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              title={link.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--border-soft)] bg-[var(--bg-card)] text-[var(--ink-700)] shadow-[0_8px_18px_-14px_rgba(39,50,74,0.8)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-soft)] hover:text-[var(--ink-900)]"
            >
              <SocialIcon label={link.label} />
            </a>
          ))}
        </nav>

        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ink-500)]">
          © {year}
        </div>
        </div>
    </footer>
  );
};

export default Footer;
