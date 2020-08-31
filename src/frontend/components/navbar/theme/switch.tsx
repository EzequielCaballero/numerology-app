import React from 'react';
import { useContextSetup } from '../../../provider/setup';
import SVGSelector from '../../svg/selector';

export const NavbarThemeSwitch: React.FunctionComponent = () => {
	const { switchTheme } = useContextSetup();

	return (
		<div className="nav-change-theme">
			<button onClick={() => switchTheme()}>
				<SVGSelector name="logoMandala" />
			</button>
		</div>
	);
};
