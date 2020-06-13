import React from 'react';
//CSS
import './navbar.css';

const Navbar = () => {
	return (
		<div className="nav-custom">
			<input type="checkbox" id="nav-custom-check" />
			<div className="nav-custom-header">
				<div className="nav-custom-icon">
					<a href="/home" rel="noopener noreferrer">
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
									stroke="#FFFFFF"
									strokeWidth="25"
									strokeLinejoin="round"
									d="M16-192l240-192l96,72v-32h48v72l96,80h-48V0H328
              v-160h-96V0H64v-192H16z"
								/>
							</g>
						</svg>
					</a>
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
				<a href="/home" rel="noopener noreferrer">
					Inicio
				</a>
				<a href="/calculator" rel="noopener noreferrer">
					Calculadora
				</a>
				<a href="/about" rel="noopener noreferrer">
					¿Cómo funciona?
				</a>
				<a href="/contact" rel="noopener noreferrer">
					Contacto
				</a>
			</div>
		</div>
	);
};

export default Navbar;
