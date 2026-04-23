import { Link } from 'react-router-dom';

const SignInPage = () => {
	return (
		<div className="auth-page auth-page--fade-in">
			{/* Header */}
			<div className="auth-header">
				<span className="auth-header__badge">USER ACCESS</span>
				<span className="auth-header__brand">REGODON.OS</span>
				<h1 className="auth-header__title">Authentication</h1>
			</div>

			{/* Form */}
			<form className="auth-form" autoComplete="off">
				<div className="auth-field">
					<label htmlFor="signin-email" className="auth-field__label">
						EMAIL
					</label>
					<input
						id="signin-email"
						type="email"
						placeholder="user@regodon.network"
						autoComplete="email"
						className="auth-field__input"
					/>
				</div>

				<div className="auth-field">
					<label htmlFor="signin-password" className="auth-field__label">
						PASSWORD
					</label>
					<input
						id="signin-password"
						type="password"
						placeholder="••••••••••"
						autoComplete="current-password"
						className="auth-field__input"
					/>
				</div>

				<button type="submit" className="auth-submit">
					LOGIN
				</button>

				<p className="auth-switch">
					{'> '}NO ACCOUNT YET?{' '}
					<Link to="/auth/signup" className="auth-switch__link">
						SIGN UP
					</Link>
				</p>
			</form>
		</div>
	);
};

export default SignInPage;
