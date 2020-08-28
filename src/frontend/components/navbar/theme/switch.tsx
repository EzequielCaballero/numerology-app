import React from 'react';
import { useSetupContext } from '../../../provider/setup';
import SVGSelector from '../../svg/selector';

export const NavbarThemeSwitch: React.FunctionComponent = () => {
	const { switchTheme } = useSetupContext();

	return (
		<div className="nav-change-theme">
			<button onClick={() => switchTheme()}>
				<SVGSelector name="logoMandala" />
			</button>
		</div>
	);
};
