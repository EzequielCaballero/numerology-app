import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
//CSS
import './navbar.css';

const Navbar = () => {
	const history = useHistory();
	const location = useLocation();

	useEffect(
		() => {
			const currentPath = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];
			document.querySelectorAll('.nav-custom-links > button').forEach((btn) => {
				btn.classList.remove('active-route');
			});
			document.getElementById(`route_${currentPath}`).classList.add('active-route');
		},
		[ location ]
	);

	const changeView = (newView) => {
		let navCheck = document.getElementById('nav-custom-check');
		navCheck.checked = false;
		history.push(newView);
	};

	return (
		<div className="nav-custom">
			<input type="checkbox" id="nav-custom-check" />
			<div className="nav-custom-header">
				<div className="nav-custom-icon">
					<button onClick={() => changeView('/home')}>
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
									d="M16-192l240-192l96,72v-32h48v72l96,80h-48V0H328
              v-160h-96V0H64v-192H16z"
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
				<button id="route_home" onClick={() => changeView('/home')}>
					Inicio
				</button>
				<button id="route_calculator" onClick={() => changeView('/calculator')}>
					Calculadora
				</button>
				<button id="route_about" onClick={() => changeView('/about')}>
					¿Cómo funciona?
				</button>
				<button id="route_contact" onClick={() => changeView('/contact')}>
					Contacto
				</button>
			</div>
		</div>
	);
};

export default Navbar;
