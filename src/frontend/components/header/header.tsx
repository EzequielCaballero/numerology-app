import React from 'react';
import logo from '../../assets/logo-1.png';
import './header.css';

type TProps = {
	title: string;
};

const Header: React.FunctionComponent<TProps> = ({ title }) => {
	return (
		<div className="header-content">
			<img src={logo} className="header-content-logo" alt="logo" />
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
