//PUBLIC VIEWS
import Home from "../pages/home/home";
import Calculator from "../pages/calculator/calculator";

const Routes = [{
        path: "/(|home)",
        exact: true,
        component: Home
    },
    {
        path: "/calculator",
        exact: true,
        component: Calculator
    }
];

export default Routes;