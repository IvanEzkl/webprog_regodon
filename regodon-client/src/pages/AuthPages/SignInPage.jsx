import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../UserService';

const SignInPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		setError('');
		try {
			const normalizedEmail = email.trim().toLowerCase();
			const { data } = await loginUser({ email: normalizedEmail, password });

			if (data?.type === 'viewer') {
				setError('Viewers are not allowed to log in.');
				return;
			}

			localStorage.setItem('token', data.token);
			localStorage.setItem('firstName', data.firstName);
			localStorage.setItem('type', data.type);

			navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } });
		} catch (err) {
			const message = err?.response?.data?.message || 'Login failed. Please try again.';
			setError(message);
		}
	};

	return (
		<div className="auth-page auth-page--fade-in">
			
			<div className="auth-header">
				<span className="auth-header__badge">USER ACCESS</span>
				<span className="auth-header__brand">REGODON.OS</span>
				<h1 className="auth-header__title">Authentication</h1>
			</div>

			
			<form className="auth-form" autoComplete="off" onSubmit={handleLogin}>
				{error && <p className="auth-error">{error}</p>}
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
						value={email}
						onChange={(event) => setEmail(event.target.value)}
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
						value={password}
						onChange={(event) => setPassword(event.target.value)}
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
