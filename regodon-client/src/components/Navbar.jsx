import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] transition-colors',
    isActive
      ? 'border-[var(--border-strong)] bg-[var(--p-lavender)] text-[var(--ink-900)]'
      : 'border-transparent text-[var(--ink-700)] hover:border-[var(--border-soft)] hover:bg-[var(--accent-bg)] hover:text-[var(--ink-900)]',
  ].join(' ');

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="theme-switch__icon" aria-hidden="true">
    <path d="M14.2 3.6A8.6 8.6 0 1 0 20.4 16a8 8 0 1 1-6.2-12.4z" />
    <path d="M18.3 7.2h.1M20.2 9.1h.1" className="theme-switch__spark" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="theme-switch__icon" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.2v2.3M12 19.5v2.3M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.2 12h2.3M19.5 12h2.3M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
  </svg>
);

const NavBar = ({ theme, onToggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-[var(--border-soft)] bg-[var(--bg-surface)]/95 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="transition-opacity hover:opacity-80">
          <Logo />
        </NavLink>

        <div className="flex items-center gap-4 md:gap-5">
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
          <button
            type="button"
            onClick={onToggleTheme}
            className={`theme-switch ${isDark ? 'theme-switch--dark' : 'theme-switch--light'}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            <span className="theme-switch__knob">
              {isDark ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;