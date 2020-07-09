import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RoutePath } from '../../../backend/sitemap/routes';
import './err404.css';

const Err404: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
	const backToHome = () => {
		history.push(RoutePath.Home);
	};

	return (
		<div className="err404-box">
			<div className="err404-content">
				<p>{`Ups... la ruta solicitada no existe 😬`}</p>
				<button className="btn-action" onClick={() => backToHome()}>
					Volver al inicio
				</button>
			</div>
		</div>
	);
};

export default Err404;
