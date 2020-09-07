import React from 'react';
import { useContextSetup } from '../../../../context/setup';
import { SVGSelector } from '../../../svg/selector';

export const NavbarTheme: React.FunctionComponent = () => {
	const { theme, switchTheme } = useContextSetup();

	return (
		<div className="nav-switch theme">
			<button onClick={() => switchTheme()}>
				{theme === 'dark' ? <SVGSelector name="iconSun" /> : <SVGSelector name="iconMoon" />}
			</button>
		</div>
	);
};
