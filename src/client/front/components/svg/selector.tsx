import React from 'react';
import { SVGIconBack } from './icon/back';
import { SVGIconCheck } from './icon/check';
import { SVGIconDelete } from './icon/delete';
import { SVGIconEdit } from './icon/edit';
import { SVGIconEmail } from './icon/email';
import { SVGIconHome } from './icon/home';
import { SVGIconMoon } from './icon/moon';
import { SVGIconSave } from './icon/save';
import { SVGIconShare } from './icon/share';
import { SVGIconSun } from './icon/sun';
import { SVGIconSwitch } from './icon/switch';
import { SVGIconTrash } from './icon/trash';
import { SVGIconView } from './icon/view';
import { SVGLogoMandala } from './logo/mandala';
import { SVGLogoGithub } from './logo/github';
import { SVGLogoFacebook } from './logo/facebook';
import { SVGLogoWhatsapp } from './logo/whatsapp';
import { SVGSpinnerRotary } from './spinner/rotary';

const _SVG_CATALOG = {
	iconBack: SVGIconBack,
	iconCheck: SVGIconCheck,
	iconDelete: SVGIconDelete,
	iconEdit: SVGIconEdit,
	iconEmail: SVGIconEmail,
	iconHome: SVGIconHome,
	iconMoon: SVGIconMoon,
	iconSave: SVGIconSave,
	iconShare: SVGIconShare,
	iconSun: SVGIconSun,
	iconSwitch: SVGIconSwitch,
	iconTrash: SVGIconTrash,
	iconView: SVGIconView,
	logoMandala: SVGLogoMandala,
	logoGithub: SVGLogoGithub,
	logoFacebook: SVGLogoFacebook,
	logoWhatsapp: SVGLogoWhatsapp,
	spinnerRotary: SVGSpinnerRotary
};

type TProps = {
	name: keyof typeof _SVG_CATALOG;
};

export const SVGSelector: React.FunctionComponent<TProps> = ({ name }) => {
	try {
		const SVG: React.FunctionComponent = _SVG_CATALOG[name];
		return <SVG />;
	} catch (error) {
		console.error(`Error obtaining svg component: ${name}`);
		return null;
	}
};
