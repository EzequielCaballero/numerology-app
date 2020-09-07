import React from 'react';
import './switcher.css';

type TProps = {
	identifier: string;
	title: string;
	action: () => void;
};

export const Switcher: React.FunctionComponent<TProps> = ({ identifier, title, action }) => {
	return (
		<span className="custom-switcher">
			<input type="checkbox" id={identifier} />
			<label className="switcher-label" htmlFor={identifier} onClick={action}>
				<span>{title}</span>
			</label>
		</span>
	);
};
