import React from "react";
import { Route, Switch } from "react-router-dom";
import Routes from "./routes/routes";
import Err404 from "./components/err404/err404";
//BASIC STYLE
import "./App.css";
import "./pages/shared/animations.css";

function App() {
  return (
    <div className="site">
      <header className="site-header"></header>
      <main className="site-content">
        <Switch>
          {Routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={(props) => <Component {...props} {...rest} />}
            />
          ))}
          <Route render={(props) => <Err404 {...props} />} />
        </Switch>
      </main>
      <footer className="site-footer"></footer>
    </div>
  );
}

export default App;
