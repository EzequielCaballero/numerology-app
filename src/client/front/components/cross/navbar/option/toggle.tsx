import React from 'react';

export const NavbarToggle: React.FunctionComponent = () => {
	return (
		<React.Fragment>
			<input type="checkbox" id="nav-custom-check" />
			<div className="nav-custom-btn">
				<label htmlFor="nav-custom-check">
					<span />
					<span />
					<span />
				</label>
			</div>
		</React.Fragment>
	);
};
