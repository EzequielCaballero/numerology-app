//PUBLIC VIEWS
import Home from '../../frontend/pages/home/home';
import CalculatorInput from '../../frontend/pages/calculator/input/calculator-input';
import CalculatorOutput from '../../frontend/pages/calculator/output/calculator-output';
import About from '../../frontend/pages/about/about';
import Contact from '../../frontend/pages/contact/contact';

export enum RoutePath {
	Home = '/home',
	CInput = '/calculator/input',
	COutput = '/calculator/output',
	About = '/about',
	Contact = '/contact'
}

type Route = {
	key: string;
	path: string;
	exact: boolean;
	component: React.ComponentClass<any>;
};

export const Routes: Route[] = [
	{
		key: 'Home',
		path: '/(|home)',
		exact: true,
		component: Home
	},
	{
		key: 'Calculator-input',
		path: '/calculator(|/input)',
		exact: true,
		component: CalculatorInput
	},
	{
		key: 'Calculator-output',
		path: RoutePath.COutput,
		exact: true,
		component: CalculatorOutput
	},
	{
		key: 'About',
		path: RoutePath.About,
		exact: true,
		component: About
	},
	{
		key: 'Contact',
		path: RoutePath.Contact,
		exact: true,
		component: Contact
	}
];
