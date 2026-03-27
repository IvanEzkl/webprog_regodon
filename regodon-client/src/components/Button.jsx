import { Link } from "react-router-dom";

const variantClasses = {
  primary: 'bg-[#140D19] text-[#E7D3E6] hover:bg-[#36284C]',
  secondary: 'bg-white text-[#140D19] hover:bg-[#9D6E90]/20',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border-2 border-[#36284C] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition',
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