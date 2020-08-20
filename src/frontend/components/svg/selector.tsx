import React from 'react';
import SVGIconBack from './icon/back';
import SVGIconCheck from './icon/check';
import SVGIconDelete from './icon/delete';
import SVGIconEdit from './icon/edit';
import SVGIconEmail from './icon/email';
import SVGIconSave from './icon/save';
import SVGIconSwitch from './icon/switch';
import SVGIconTrash from './icon/trash';
import SVGIconView from './icon/view';
import SVGLogoGithub from './logo/github';

const _SVG_CATALOG = {
	back: SVGIconBack,
	check: SVGIconCheck,
	delete: SVGIconDelete,
	edit: SVGIconEdit,
	email: SVGIconEmail,
	save: SVGIconSave,
	switch: SVGIconSwitch,
	trash: SVGIconTrash,
	view: SVGIconView,
	github: SVGLogoGithub
};

type TProps = {
	name: keyof typeof _SVG_CATALOG;
};

const SVGSelector: React.FunctionComponent<TProps> = ({ name }) => {
	try {
		const SVG: React.FunctionComponent = _SVG_CATALOG[name];
		return <SVG />;
	} catch (error) {
		console.error(`Error obtaining svg component: ${name}`);
		return null;
	}
};

export default SVGSelector;
