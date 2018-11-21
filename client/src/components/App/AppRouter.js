import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header.js';
import Footer from './Footer.js';

import Analytic from '../Analytic/Applications.js';
import About from '../About';
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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: red[300],
      main: red[500],
      dark: red[700]
    },
    secondary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});

const AppRouter = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
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
  </MuiThemeProvider>
);

export default AppRouter;
