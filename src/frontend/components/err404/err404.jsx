import React from 'react';
import { Link } from 'react-router-dom';

import './err404.css';

const Err404 = () => {
	return (
		<div className="err404-box">
			<div className="err404-content">
				<p>{`Ups... la ruta solicitada no existe 😬`}</p>
				<Link to="/home" rel="noopener noreferrer" aria-label="Direct link to website home">
					Ir al inicio
				</Link>
			</div>
		</div>
	);
};

export default Err404;
