import React from 'react';
import { useHistory } from 'react-router-dom';
//CSS
import './navbar.css';

const Navbar = () => {
	const history = useHistory();

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
							version="1.1"
							id="svg2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							width="30"
							height="30"
						>
							<g transform="translate(0,448)">
								<path
									fill="none"
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
				<button onClick={() => changeView('/home')}>Inicio</button>
				<button onClick={() => changeView('/calculator')}>Calculadora</button>
				<button onClick={() => changeView('/about')}>¿Cómo funciona?</button>
				<button onClick={() => changeView('/contact')}>Contacto</button>
			</div>
		</div>
	);
};

export default Navbar;
