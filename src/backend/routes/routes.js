//PUBLIC VIEWS
import Home from '../../frontend/pages/home/home';
import CalculatorInput from '../../frontend/pages/calculator/input/calculator-input';
import CalculatorOutput from '../../frontend/pages/calculator/output/calculator-output';
import About from '../../frontend/pages/about/about';
import Contact from '../../frontend/pages/contact/contact';

const Routes = [
	{
		path: '/(|home)',
		exact: true,
		component: Home
	},
	{
		path: '/calculator(|/input)',
		exact: true,
		component: CalculatorInput
	},
	{
		path: '/calculator/result',
		exact: true,
		component: CalculatorOutput
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
