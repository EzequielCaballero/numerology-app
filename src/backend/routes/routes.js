//PUBLIC VIEWS
import Home from '../../frontend/pages/home/home';
import Calculator from '../../frontend/pages/calculator/calculator';
import About from '../../frontend/pages/about/about';
import Contact from '../../frontend/pages/contact/contact';

const Routes = [
	{
		path: '/(|home)',
		exact: true,
		component: Home
	},
	{
		path: '/calculator',
		exact: true,
		component: Calculator
	},
	{
		path: '/about',
		exact: true,
		component: About
	},
	{
		path: '/contact',
		exact: true,
		component: Contact
	}
];

export default Routes;
