import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../../UserService';

const SignUpPage = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');

		const trimmedFirstName = firstName.trim();
		const trimmedLastName = lastName.trim();
		const trimmedEmail = email.trim().toLowerCase();
		const usernameSeed = trimmedEmail.split('@')[0] || 'user';

		if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !password) {
			setError('Please fill in all fields.');
			return;
		}

		if (!/^[^@]+@[^@]+\.[^@]+$/.test(trimmedEmail)) {
			setError('Enter a valid email address.');
			return;
		}

		if (password.length < 8) {
			setError('Password must be at least 8 characters.');
			return;
		}

		setIsSubmitting(true);
		try {
			await createUser({
				firstName: trimmedFirstName,
				lastName: trimmedLastName,
				age: '18',
				gender: 'other',
				contactNumber: '00000000000',
				email: trimmedEmail,
				type: 'editor',
				username: usernameSeed.toLowerCase(),
				password,
				address: 'N/A',
				isActive: true,
			});

			navigate('/auth/signin');
		} catch (err) {
			const rawMessage = err?.response?.data?.message || err.message || '';
			console.error(rawMessage);
			const duplicateEmail = /duplicate key|email_1/i.test(rawMessage);
			const duplicateUsername = /duplicate key|username_1/i.test(rawMessage);
			if (duplicateEmail) {
				setError('Email already exists. Please use another email.');
				return;
			}
			if (duplicateUsername) {
				setError('Username already exists. Please choose another username.');
				return;
			}
			setError('Registration failed. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="auth-page auth-page--fade-in">
			
			<div className="auth-header">
				<span className="auth-header__badge">USER ENROLLMENT</span>
				<span className="auth-header__brand">REGODON.OS</span>
				<h1 className="auth-header__title">Registration</h1>
			</div>

			
			<form className="auth-form" autoComplete="off" onSubmit={handleSubmit}>
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
							value={firstName}
							onChange={(event) => {
								setFirstName(event.target.value);
								setError('');
							}}
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
							value={lastName}
							onChange={(event) => {
								setLastName(event.target.value);
								setError('');
							}}
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
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
							setError('');
						}}
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
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
							setError('');
						}}
					/>
				</div>

				{error && <p className="auth-error">{error}</p>}

				<button type="submit" className="auth-submit" disabled={isSubmitting}>
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