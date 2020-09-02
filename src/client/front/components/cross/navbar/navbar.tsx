import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../../back/sitemap/routes';
import { NavbarThemeSwitch } from './theme/switch';
import { NavbarLinkList } from './link/list';
import { NavbarToggleMenu } from './toggle/menu';
import './navbar.css';

export const Navbar: React.FunctionComponent = () => {
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
			<NavbarThemeSwitch />
			<NavbarToggleMenu />
			<NavbarLinkList changeView={changeView} />
		</div>
	);
};
