import React from 'react';
import { Route, Switch } from 'react-router-dom';
//COMPONENTS
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Err404 from './components/err404/err404';
import useImgLoader from './components/hook/img/loader';
import Routes from '../backend/sitemap/routes';
//BASIC STYLE
import _backgroundX4 from './assets/background-x4.jpg';
import _backgroundX3 from './assets/background-x3.jpg';
import _backgroundX2 from './assets/background-x2.jpg';
import _backgroundX1 from './assets/background-x1.jpg';
import _backgroundPH from './assets/background-ph.jpg';
import './App-variables.css';
import './App-style.css';
import './App-responsive.css';
import './App-animation.css';

const App = (): JSX.Element => {
	const srcs: string[] = [ _backgroundX4, _backgroundX3, _backgroundX2, _backgroundX1 ];
	const imgHDLoaded = useImgLoader(srcs);

	return (
		<div className="site" style={{ backgroundImage: `url(${imgHDLoaded || _backgroundPH})` }}>
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
	);
};

export default App;
