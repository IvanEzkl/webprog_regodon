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

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-[var(--border-soft)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="transition-opacity hover:opacity-80">
          <Logo />
        </NavLink>

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
      </div>
    </header>
  );
};

export default NavBar;