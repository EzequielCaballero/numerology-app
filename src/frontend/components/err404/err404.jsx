import React from 'react';
import { useHistory } from 'react-router-dom';

import './err404.css';

const Err404 = () => {
	const history = useHistory();

	const backToHome = () => {
		history.push('/home');
	};

	return (
		<div className="err404-box">
			<div className="err404-content">
				<p>{`Ups... la ruta solicitada no existe 😬`}</p>
				<button className="err404-btn" onClick={() => backToHome()}>
					Volver al inicio
				</button>
			</div>
		</div>
	);
};

export default Err404;
