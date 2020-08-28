import React from 'react';
import { Helmet } from 'react-helmet';
import useImgLoader from '../../hook/img/loader';
import _backgroundX4 from '../../assets/background-x4.jpg';
import _backgroundX3 from '../../assets/background-x3.jpg';
import _backgroundX2 from '../../assets/background-x2.jpg';
import _backgroundX1 from '../../assets/background-x1.jpg';
import _backgroundPH from '../../assets/background-ph.jpg';

const Head = () => {
	const srcs: string[] = [ _backgroundX4, _backgroundX3, _backgroundX2, _backgroundX1 ];
	const backgroundImg = useImgLoader(srcs, _backgroundPH);
	return (
		<Helmet>
			<html lang="en" />
			<meta name="description" content="Calculadora para la obtención de números pitagóricos" />
			<meta name="theme-color" content="#342042" />
			<title>Numerología pitagórica con React</title>
			<body data-theme={'dark'} />
			<style type="text/css">{`.site { background-image: url(${backgroundImg}) }`}</style>
		</Helmet>
	);
};

export default Head;