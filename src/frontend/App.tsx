import React from 'react';
import { Route, Switch } from 'react-router-dom';
//COMPONENTS
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import { Routes } from '../backend/sitemap/routes';
import Err404 from './components/err404/err404';
//BASIC STYLE
import './App-variables.css';
import './App-style.css';
import './App-responsive.css';
import './App-animation.css';

function App() {
	return (
		<div className="site">
			<header className="site-header">
				<Navbar />
			</header>
			<main className="site-content">
				<Switch>
					{Routes.map(({ key, path, exact, component: Component, ...rest }) => (
						<Route
							key={key}
							path={path}
							exact={exact}
							render={(props) => <Component {...props} {...rest} />}
						/>
					))}
					<Route render={(props) => <Err404 {...props} />} />
				</Switch>
			</main>
			<footer className="site-footer">
				<Footer />
			</footer>
		</div>
	);
}

export default App;
