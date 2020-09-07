import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../../back/sitemap/routes';
import { NavbarLang } from './option/lang';
import { NavbarTheme } from './option/theme';
import { NavbarLinks } from './option/links';
import { NavbarToggle } from './option/toggle';
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
			<NavbarTheme />
			<span className="navbar-separator" />
			<NavbarLang />
			<NavbarToggle />
			<NavbarLinks changeView={changeView} />
		</div>
	);
};
