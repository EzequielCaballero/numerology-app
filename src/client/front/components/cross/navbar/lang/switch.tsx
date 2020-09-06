import React from 'react';
import { useContextSetup } from '../../../../context/setup';

export const NavbarLangSwitch: React.FunctionComponent = () => {
	const { translate, switchLang } = useContextSetup();

	return (
		<div className="nav-switch lang">
			<button onClick={() => switchLang()}>{translate.t('cross.navbar.lang')}</button>
		</div>
	);
};
