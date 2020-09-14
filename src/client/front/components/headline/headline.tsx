import React from 'react';
import { useHistory } from 'react-router-dom';
import { RoutePath } from '../../../back/sitemap/routes';
import { SVGSelector } from '../svg/selector';
import './headline.css';

type TProps = {
	title: string;
	subtitle: string;
};

export const Headline: React.FunctionComponent<TProps> = ({ title, subtitle }) => {
	const history = useHistory();

	const backToHome = () => {
		history.push(RoutePath.Home);
	};

	return (
		<div className="headline-content">
			<button aria-label="Home" onClick={() => backToHome()}>
				<SVGSelector name="logoMandala" />
			</button>
			<div className="headline-content-text">
				<p>{title}</p>
				<p>
					<strong>{subtitle.toUpperCase()}</strong>
				</p>
			</div>
		</div>
	);
};
