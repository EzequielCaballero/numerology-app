import React, { useEffect } from 'react';
import { useContextSetup } from '../../../../context/setup';
import { Switcher } from '../../../switcher/switcher';

export const NavbarLang: React.FunctionComponent = () => {
	const { translate, switchLang } = useContextSetup();
	const langSwitch = translate.locale() === 'en' ? 'ES' : 'EN';

	useEffect(
		() => {
			if (langSwitch === 'ES') {
				const switcherCheckbox: HTMLInputElement = document.getElementById('switcher-lang') as HTMLInputElement;
				switcherCheckbox.checked = true;
			}
		},
		[ langSwitch ]
	);

	return (
		<div className="nav-switch lang">
			<Switcher identifier="switcher-lang" title={langSwitch} action={switchLang} />
		</div>
	);
};
