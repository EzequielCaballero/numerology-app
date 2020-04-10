//PUBLIC VIEWS
import Home from "../../frontend/pages/home/home";
import Calculator from "../../frontend/pages/calculator/calculator";

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