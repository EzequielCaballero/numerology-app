import React from 'react';
import { Helmet } from 'react-helmet';
import { URLParams } from '../../../../back/services/handler/urlparams';
import { useImgLoader } from '../../../hooks/imgloader';
import { useContextSetup } from '../../../context/setup';
import _backgroundX4 from '../../../assets/background-x4.jpg';
import _backgroundX3 from '../../../assets/background-x3.jpg';
import _backgroundX2 from '../../../assets/background-x2.jpg';
import _backgroundX1 from '../../../assets/background-x1.jpg';
import _backgroundPH from '../../../assets/background-ph.jpg';

export type THead = {
	page: string
}

export const Head: React.FunctionComponent<THead> = ({ page }) => {
	const srcs: string[] = [ _backgroundX4, _backgroundX3, _backgroundX2, _backgroundX1 ];
	const { translate, theme } = useContextSetup();
	const background = useImgLoader(srcs, _backgroundPH);

	return (
		<React.Fragment>
		{ (page === "cross") ?
			<Helmet>
				<html lang={translate.locale()} />
				<meta name="theme-color" content={theme === 'dark' ? '#3b1f32' : '#ffffff'} /> 
				<body data-theme={theme} />
				<style type="text/css">{`.site { background-image: url(${background}) }`}</style>
			</Helmet>
		:
			<Helmet>
				<title>{translate.t(`${page}.head.title`)}</title>
				<meta name="title" content={`${translate.t(`${page}.head.meta_title`)}`}/>
				<meta name="description" content={`${translate.t(`${page}.head.meta_description`)}`}/>
				<meta property="og:site_name" content="Destino Numérico" />
				<meta property="og:title" content={`${translate.t(`${page}.head.meta_title`)}`} />
				<meta property="og:description" content={`${translate.t(`${page}.head.meta_description`)}`} />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={`${translate.t(`${page}.head.meta_title`)}`} />
				<meta name="twitter:description" content={`${translate.t(`${page}.head.meta_description`)}`} />
				<meta property="og:image" content={`https://${URLParams.getOnlyDomain()}/assets/logoicon.png`} />
				<meta property="og:url" content={URLParams.getCurrentURL()} />
			</Helmet>
		}
		</React.Fragment>
	);
};
