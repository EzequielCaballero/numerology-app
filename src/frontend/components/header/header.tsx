import React from 'react';
import SVGSelector from '../svg/selector';
import './header.css';

type TProps = {
	title: string;
};

const Header: React.FunctionComponent<TProps> = ({ title }) => {
	return (
		<div className="header-content">
			<SVGSelector name="logoMain" />
			<div className="header-content-text">
				<p>Numerología pitagórica</p>
				<p>
					<strong>{title}</strong>
				</p>
			</div>
		</div>
	);
};

export default Header;
