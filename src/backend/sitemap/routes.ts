//PUBLIC VIEWS
import Home from '../../frontend/pages/home/home';
import CalculatorInput from '../../frontend/pages/calculator/input/calculator-input';
import CalculatorOutput from '../../frontend/pages/calculator/output/calculator-output';
import About from '../../frontend/pages/about/about';
import Contact from '../../frontend/pages/contact/contact';

export enum RoutePath {
	Home = '/home',
	CInput = '/calculator/input',
	COutput = '/calculator/result',
	About = '/about',
	Contact = '/contact'
}

type Route = {
	key: RoutePath;
	path: string;
	exact: boolean;
	component: React.ComponentClass<any>;
};

export const Routes: Array<Route> = [
	{
		key: RoutePath.Home,
		path: '/(|home)',
		exact: true,
		component: Home
	},
	{
		key: RoutePath.CInput,
		path: '/calculator(|/input)',
		exact: true,
		component: CalculatorInput
	},
	{
		key: RoutePath.COutput,
		path: '/calculator/result',
		exact: true,
		component: CalculatorOutput
	},
	{
		key: RoutePath.About,
		path: '/about',
		exact: true,
		component: About
	},
	{
		key: RoutePath.Contact,
		path: '/contact',
		exact: true,
		component: Contact
	}
];
