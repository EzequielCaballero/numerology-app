import React from 'react';
import { useContextSetup } from '../../../../provider/setup';
import { SVGSelector } from '../../../svg/selector';

export const NavbarThemeSwitch: React.FunctionComponent = () => {
	const { theme, switchTheme } = useContextSetup();

	return (
		<div className="nav-change-theme">
			<button onClick={() => switchTheme()}>
				{theme === 'dark' ? <SVGSelector name="iconSun" /> : <SVGSelector name="iconMoon" />}
			</button>
		</div>
	);
};
