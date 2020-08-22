import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../backend/sitemap/routes';
import SVGSelector from '../../components/svg/selector';
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
						<SVGSelector name="iconHome" />
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
