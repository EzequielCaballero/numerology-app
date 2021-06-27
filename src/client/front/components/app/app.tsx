import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../../back/sitemap/routes';
import { ScrollToTop } from '../../hooks/scrolltotop';
import { Navbar } from '../cross/navbar/navbar';
import { Footer } from '../cross/footer/footer';
import { Err404 } from '../err404/err404';
import { ProviderSetup } from '../../context/setup';
import { THead, Head } from '../cross/head/head';
import './css/variables.css';
import './css/styles.css';
import './css/responsive.css';
import './css/animation.css';

const PAGE_HEAD:THead  = { page: "cross" }

export const App: React.FC = (): JSX.Element => {

	return (
		<ProviderSetup>
			<div className="site">
				<ScrollToTop />
				<Head {...PAGE_HEAD} />
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
