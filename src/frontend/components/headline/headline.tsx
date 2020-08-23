import React from 'react';
import SVGSelector from '../svg/selector';
import './headline.css';

type TProps = {
	title: string;
};

const Header: React.FunctionComponent<TProps> = ({ title }) => {
	return (
		<div className="headline-content">
			<SVGSelector name="logoMandala" />
			<div className="headline-content-text">
				<p>Numerología pitagórica</p>
				<p>
					<strong>{title}</strong>
				</p>
			</div>
		</div>
	);
};

export default Header;
