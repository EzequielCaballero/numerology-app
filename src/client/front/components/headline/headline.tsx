import React from 'react';
import { SVGSelector } from '../svg/selector';
import './headline.css';

type TProps = {
	title: string;
	subtitle: string;
};

export const Headline: React.FunctionComponent<TProps> = ({ title, subtitle }) => {
	return (
		<div className="headline-content">
			<SVGSelector name="logoMandala" />
			<div className="headline-content-text">
				<p>{title}</p>
				<p>
					<strong>{subtitle.toUpperCase()}</strong>
				</p>
			</div>
		</div>
	);
};
