import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Header from "./Header.js";
import Footer from "./Footer.js";

import Analytic from "../Analytic";
import About from "../About";
const Home = () => <h2>Home</h2>;

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/analytic/">Analytic</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/analytic/" component={Analytic} />
        <Route
          path="/about/"
          render={routeProps => (
            <About
              {...routeProps}
              applicationName="Azure DevOps Analytics"
              author="Gilles Lautrou"
            />
          )}
        />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
