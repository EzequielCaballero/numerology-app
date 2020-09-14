import React from 'react';
import { useContextSetup } from '../../../../context/setup';
import { SVGSelector } from '../../../svg/selector';

export const NavbarTheme: React.FunctionComponent = () => {
	const { translate, theme, switchTheme } = useContextSetup();

	return (
		<div className="nav-switch theme">
			<button aria-label={translate.t('cross.navbar.theme')} onClick={() => switchTheme()}>
				{theme === 'dark' ? <SVGSelector name="iconSun" /> : <SVGSelector name="iconMoon" />}
			</button>
		</div>
	);
};
