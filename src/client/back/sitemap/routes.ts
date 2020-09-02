import { Home } from '../../front/views/home/home';
import { CalculatorInput } from '../../front/views/calculator/input/input';
import { CalculatorOutput } from '../../front/views/calculator/output/output';
import { History } from '../../front/views/history/history';
import { About } from '../../front/views/about/about';
import { Contact } from '../../front/views/contact/contact';

export enum RoutePath {
	Home = '/home',
	CInput = '/calculator/input',
	COutput = '/calculator/output',
	History = '/history',
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
		key: 'History',
		path: RoutePath.History,
		exact: true,
		component: History
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
