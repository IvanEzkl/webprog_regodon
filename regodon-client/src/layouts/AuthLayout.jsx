import { Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';


const useClock = () => {
	const [now, setNow] = useState(new Date());
	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(id);
	}, []);
	return now;
};


const GridCanvas = () => {
	const ref = useRef(null);
	useEffect(() => {
		const cvs = ref.current;
		if (!cvs) return;
		const ctx = cvs.getContext('2d');
		let raf;
		let offset = 0;

		const draw = () => {
			const w = (cvs.width = cvs.offsetWidth);
			const h = (cvs.height = cvs.offsetHeight);
			ctx.clearRect(0, 0, w, h);

		
			ctx.strokeStyle = 'rgba(255,255,255,0.03)';
			ctx.lineWidth = 1;
			const gap = 48;
			for (let x = 0; x < w; x += gap) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, h);
				ctx.stroke();
			}
			for (let y = 0; y < h; y += gap) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(w, y);
				ctx.stroke();
			}

			
			offset = (offset + 0.35) % h;
			const grad = ctx.createLinearGradient(0, offset - 60, 0, offset + 60);
			grad.addColorStop(0, 'rgba(255,255,255,0)');
			grad.addColorStop(0.5, 'rgba(255,255,255,0.04)');
			grad.addColorStop(1, 'rgba(255,255,255,0)');
			ctx.fillStyle = grad;
			ctx.fillRect(0, offset - 60, w, 120);

			raf = requestAnimationFrame(draw);
		};
		draw();
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<canvas
			ref={ref}
			className="auth-grid-canvas"
			aria-hidden="true"
		/>
	);
};


const InfoPanel = ({ now }) => {
	const utc = now.toLocaleTimeString('en-GB', {
		timeZone: 'UTC',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});

	const localTime = now.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});

	const localDate = now.toLocaleDateString('en-US', {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	});

	const dayOfYear = Math.ceil(
		(now - new Date(now.getFullYear(), 0, 1)) / 86400000
	);

	return (
		<div className="auth-info-panel">
			<GridCanvas />

			
			<div className="auth-info-hero">
				<span className="auth-info-hero__sub">SYS://</span>
				<span className="auth-info-hero__big">
					{String(now.getHours()).padStart(2, '0')}
				</span>
				<span className="auth-info-hero__label">REGODON</span>
			</div>

			
			<p className="auth-info-tagline">
				SECURE INTERFACE FOR<br />
				OPERATIONAL DATA RETRIEVAL.
			</p>

			
			<div className="auth-info-clock">
				<div className="auth-info-clock__row">
					<span className="auth-info-clock__label">UTC</span>
					<span className="auth-info-clock__value">{utc}</span>
				</div>
				<div className="auth-info-clock__row">
					<span className="auth-info-clock__label">LOCAL</span>
					<span className="auth-info-clock__value">{localTime}</span>
				</div>
				<div className="auth-info-clock__row">
					<span className="auth-info-clock__label">DATE</span>
					<span className="auth-info-clock__value">{localDate}</span>
				</div>
				<div className="auth-info-clock__row">
					<span className="auth-info-clock__label">DAY</span>
					<span className="auth-info-clock__value">{dayOfYear} / 365</span>
				</div>
			</div>
		</div>
	);
};


const AuthLayout = () => {
	const now = useClock();

	return (
		<section className="auth-layout">
			<div className="auth-layout__grid">
			
				<div className="auth-form-panel">
					<div className="auth-form-panel__inner">
						<Outlet />
					</div>
				</div>

				
				<InfoPanel now={now} />
			</div>
		</section>
	);
};

export default AuthLayout;
