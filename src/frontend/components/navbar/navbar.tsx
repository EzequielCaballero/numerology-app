import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../backend/sitemap/routes';
import './navbar.css';

const Navbar: React.FunctionComponent = () => {
	const history = useHistory();
	const location = useLocation();
	const changeView = (newView: string): void => {
		let navCheck: HTMLInputElement = document.getElementById('nav-custom-check') as HTMLInputElement;
		navCheck.checked = false;
		history.push(newView);
	};

	useEffect(
		() => {
			const currentPath =
				location.pathname === '/' ? RoutePath.Home.split('/')[1] : location.pathname.split('/')[1];
			document.querySelectorAll('.nav-custom-links > button').forEach((btn) => {
				btn.classList.remove('active-route');
			});
			const buttonLink: HTMLButtonElement = document.getElementById(`route_${currentPath}`) as HTMLButtonElement;
			if (buttonLink) buttonLink.classList.add('active-route');
		},
		[ location ]
	);

	return (
		<div className="nav-custom">
			<input type="checkbox" id="nav-custom-check" />
			<div className="nav-custom-header">
				<div className="nav-custom-icon">
					<button onClick={() => changeView(RoutePath.Home)}>
						<svg
							id="home_icon"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							width="30"
							height="30"
						>
							<g transform="translate(0,448)">
								<path
									strokeWidth="25"
									strokeLinejoin="round"
									d="M16-192l240-192l96,72v-32h48v72l96,80h-48V0H328v-160h-96V0H64v-192H16z"
								/>
							</g>
						</svg>
					</button>
				</div>
			</div>
			<div className="nav-custom-btn">
				<label htmlFor="nav-custom-check">
					<span />
					<span />
					<span />
				</label>
			</div>

			<div className="nav-custom-links">
				<button id="route_home" onClick={() => changeView(RoutePath.Home)}>
					Inicio
				</button>
				<button id="route_calculator" onClick={() => changeView(RoutePath.CInput)}>
					Calculadora
				</button>
				<button id="route_history" onClick={() => changeView(RoutePath.History)}>
					Historial
				</button>
				<button id="route_about" onClick={() => changeView(RoutePath.About)}>
					¿Cómo funciona?
				</button>
				<button id="route_contact" onClick={() => changeView(RoutePath.Contact)}>
					Contacto
				</button>
			</div>
		</div>
	);
};

export default Navbar;
