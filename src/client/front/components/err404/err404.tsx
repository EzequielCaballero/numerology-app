import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../back/sitemap/routes';
import './err404.css';

export const Err404: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
	const backToHome = () => {
		history.push(RoutePath.Home);
	};

	return (
		<div className="box">
			<div className="box-content">
				<p className="err404-text">{`Ups... la página solicitada no existe 😬`}</p>
				<button className="btn-action" onClick={() => backToHome()}>
					Volver al inicio
				</button>
			</div>
		</div>
	);
};
