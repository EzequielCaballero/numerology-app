import React from 'react';
import { Route, Switch } from 'react-router-dom';
//COMPONENTS
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Err404 from './components/err404/err404';
import ImgLoader from './components/img/loader';
import Routes from '../backend/sitemap/routes';
//BASIC STYLE
import _backgroundHD from './assets/background-hd.jpg';
import _backgroundLD from './assets/background-ld.jpg';
import './App-variables.css';
import './App-style.css';
import './App-responsive.css';
import './App-animation.css';

const App = (): JSX.Element => {
	const imgHDLoaded = ImgLoader(_backgroundHD);

	return (
		<div className="site" style={{ backgroundImage: `url(${imgHDLoaded || _backgroundLD})` }}>
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
