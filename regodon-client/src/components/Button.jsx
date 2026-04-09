import { Link } from "react-router-dom";

const variantClasses = {
  primary: 'bg-[var(--ink-900)] text-white hover:bg-[var(--ink-700)]',
  secondary: 'bg-[var(--bg-card)] text-[var(--ink-900)] hover:bg-[var(--bg-soft)]',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border-2 border-[var(--border-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;