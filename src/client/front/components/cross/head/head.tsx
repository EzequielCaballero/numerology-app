import React from 'react';
import { Helmet } from 'react-helmet';
import { useImgLoader } from '../../../hooks/imgloader';
import { useContextSetup } from '../../../context/setup';
import _backgroundX4 from '../../../assets/background-x4.jpg';
import _backgroundX3 from '../../../assets/background-x3.jpg';
import _backgroundX2 from '../../../assets/background-x2.jpg';
import _backgroundX1 from '../../../assets/background-x1.jpg';
import _backgroundPH from '../../../assets/background-ph.jpg';

export const Head: React.FunctionComponent = () => {
	const srcs: string[] = [ _backgroundX4, _backgroundX3, _backgroundX2, _backgroundX1 ];
	const { translate, theme } = useContextSetup();
	const background = useImgLoader(srcs, _backgroundPH);

	return (
		<Helmet>
			<html lang={translate.locale()} />
			<meta name="description" content={translate.t('cross.head.description')} />
			<meta name="theme-color" content={theme === 'dark' ? '#3b1f32' : '#ffffff'} />
			<title>{translate.t('cross.head.title_long')}</title>
			<body data-theme={theme} />
			<style type="text/css">{`.site { background-image: url(${background}) }`}</style>
		</Helmet>
	);
};
