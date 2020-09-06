import React from 'react';
import './footer.css';
import { useContextSetup } from '../../../context/setup';

export const Footer: React.FunctionComponent<any> = () => {
	const { translate } = useContextSetup();
	return (
		<div className="footer-box">
			<p className="footer-title">
				<span>{translate.t('cross.footer.prefix')}</span>
				<span>
					<strong>{translate.t('cross.footer.author')}</strong>
				</span>
				<span>| {translate.t('cross.footer.year')}</span>
			</p>
		</div>
	);
};
