import React from 'react';
import { Helmet } from 'react-helmet';
import { useImgLoader } from '../../hooks/img/loader';
import { useContextSetup } from '../../provider/setup';
import _backgroundX4 from '../../assets/background-x4.jpg';
import _backgroundX3 from '../../assets/background-x3.jpg';
import _backgroundX2 from '../../assets/background-x2.jpg';
import _backgroundX1 from '../../assets/background-x1.jpg';
import _backgroundPH from '../../assets/background-ph.jpg';

export const Head = () => {
	const srcs: string[] = [ _backgroundX4, _backgroundX3, _backgroundX2, _backgroundX1 ];
	const { theme } = useContextSetup();
	const background = useImgLoader(srcs, _backgroundPH);

	return (
		<Helmet>
			<html lang="es" />
			<meta name="description" content="Calculadora para la obtención de números pitagóricos" />
			<meta name="theme-color" content={theme === 'dark' ? '#000000' : '#ffffff'} />
			<title>Numerología pitagórica</title>
			<body data-theme={theme} />
			<style type="text/css">{`.site { background-image: url(${background}) }`}</style>
		</Helmet>
	);
};
