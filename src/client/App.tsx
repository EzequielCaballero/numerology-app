import React from 'react';
import { Route, Switch } from 'react-router-dom';
//COMPONENTS
import { Routes } from './back/sitemap/routes';
import { Head } from './front/components/cross/head/head';
import { Navbar } from './front/components/cross/navbar/navbar';
import { Footer } from './front/components/cross/footer/footer';
import { Err404 } from './front/components/err404/err404';
//BASIC STYLE
import './front/app/variables.css';
import './front/app/styles.css';
import './front/app/responsive.css';
import './front/app/animation.css';
import { ProviderSetup } from './front/provider/setup';

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
