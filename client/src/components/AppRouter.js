import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Analytic from "./Analytic";
import About from "./About";
const Home = () => <h2>Home</h2>;

const AppRouter = () => (
  <Router>
    <div>
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
    </div>
  </Router>
);

export default AppRouter;
