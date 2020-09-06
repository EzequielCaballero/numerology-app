import React from 'react';
import { RoutePath } from '../../../../../back/sitemap/routes';
import { useContextSetup } from '../../../../context/setup';

type TProps = {
	changeView: (path: string) => void;
};

export const NavbarLinkList: React.FunctionComponent<TProps> = ({ changeView }) => {
	const { translate } = useContextSetup();
	return (
		<div className="nav-custom-links">
			<button id="route_home" onClick={() => changeView(RoutePath.Home)}>
				{translate.t('cross.navbar.menu.0')}
			</button>
			<button id="route_calculator" onClick={() => changeView(RoutePath.CInput)}>
				{translate.t('cross.navbar.menu.1')}
			</button>
			<button id="route_history" onClick={() => changeView(RoutePath.History)}>
				{translate.t('cross.navbar.menu.2')}
			</button>
			<button id="route_about" onClick={() => changeView(RoutePath.About)}>
				{translate.t('cross.navbar.menu.3')}
			</button>
			<button id="route_contact" onClick={() => changeView(RoutePath.Contact)}>
				{translate.t('cross.navbar.menu.4')}
			</button>
		</div>
	);
};
