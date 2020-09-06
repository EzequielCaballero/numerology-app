import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../../back/sitemap/routes';
import { useContextSetup } from '../../../context/setup';
import './err404.css';

export const Err404: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
	const { translate } = useContextSetup();
	const backToHome = () => {
		history.push(RoutePath.Home);
	};

	return (
		<div className="box">
			<div className="box-content">
				<p className="err404-text">{`${translate.t('cross.err404.msg')} 😬`}</p>
				<button className="btn-action" onClick={() => backToHome()}>
					{translate.t('cross.err404.btn')}
				</button>
			</div>
		</div>
	);
};
