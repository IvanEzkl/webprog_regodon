import { Link } from 'react-router-dom';

const SignUpPage = () => {
	return (
		<div className="auth-page auth-page--fade-in">
			{/* Header */}
			<div className="auth-header">
				<span className="auth-header__badge">USER ENROLLMENT</span>
				<span className="auth-header__brand">REGODON.OS</span>
				<h1 className="auth-header__title">Registration</h1>
			</div>

			{/* Form */}
			<form className="auth-form" autoComplete="off">
				<div className="auth-field-row">
					<div className="auth-field">
						<label htmlFor="first-name" className="auth-field__label">
							FIRST NAME
						</label>
						<input
							id="first-name"
							type="text"
							placeholder="first_name"
							autoComplete="given-name"
							className="auth-field__input"
						/>
					</div>

					<div className="auth-field">
						<label htmlFor="last-name" className="auth-field__label">
							LAST NAME
						</label>
						<input
							id="last-name"
							type="text"
							placeholder="last_name"
							autoComplete="family-name"
							className="auth-field__input"
						/>
					</div>
				</div>

				<div className="auth-field">
					<label htmlFor="signup-email" className="auth-field__label">
						EMAIL
					</label>
					<input
						id="signup-email"
						type="email"
						placeholder="node@regodon.network"
						autoComplete="email"
						className="auth-field__input"
					/>
				</div>

				<div className="auth-field">
					<label htmlFor="signup-password" className="auth-field__label">
						PASSWORD
					</label>
					<input
						id="signup-password"
						type="password"
						placeholder="••••••••••"
						autoComplete="new-password"
						className="auth-field__input"
					/>
				</div>

				<button type="submit" className="auth-submit">
					SIGN UP
				</button>

				<p className="auth-switch">
					{'> '}ALREADY HAVE AN ACCOUNT?{' '}
					<Link to="/auth/signin" className="auth-switch__link">
						SIGN IN
					</Link>
				</p>
			</form>
		</div>
	);
};

export default SignUpPage;