import React from 'react';
import { Route, Switch } from 'react-router-dom';
//COMPONENTS
import { Head } from './components/head/head';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Err404 } from './components/err404/err404';
import { Routes } from '../backend/sitemap/routes';
//BASIC STYLE
import './app/variables.css';
import './app/styles.css';
import './app/responsive.css';
import './app/animation.css';
import { ProviderSetup } from './provider/setup';

export const App: React.FC = (): JSX.Element => {
	return (
		<ProviderSetup>
			<div className="site">
				<Head />
				<header className="site-header">
					<Navbar />
				</header>
				<main className="site-content">
					<Switch>
						{Routes.map(({ key, path, exact, component: Component }) => (
							<Route key={key} path={path} exact={exact} render={(props) => <Component {...props} />} />
						))}
						<Route render={(props) => <Err404 {...props} />} />
					</Switch>
				</main>
				<footer className="site-footer">
					<Footer />
				</footer>
			</div>
		</ProviderSetup>
	);
};
