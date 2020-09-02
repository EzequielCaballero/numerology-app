import React from 'react';
import { RoutePath } from '../../../../../back/sitemap/routes';

type TProps = {
	changeView: (path: string) => void;
};

export const NavbarLinkList: React.FunctionComponent<TProps> = ({ changeView }) => {
	return (
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
	);
};
