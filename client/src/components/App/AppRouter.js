import React, { Component } from "react";
import { adalApiFetch, getToken } from "../../config/adalConfig";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Header from "./Header.js";
import Footer from "./Footer.js";

import Analytic from "../Analytic/Applications.js";
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

// const AppRouter = () => (
//   <Router>
//     <div>
//       <Header />
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/analytic/">Analytic</Link>
//           </li>
//           <li>
//             <Link to="/about/">About</Link>
//           </li>
//         </ul>
//       </nav>
//       <Switch>
//         <Route path="/" exact component={Home} />
//         <Route path="/analytic/" component={Analytic} />
//         <Route
//           path="/about/"
//           render={routeProps => (
//             <About
//               {...routeProps}
//               applicationName="Azure DevOps Analytics"
//               author="Gilles Lautrou"
//             />
//           )}
//         />
//         <Route component={NoMatch} />
//       </Switch>
//       <Footer />
//     </div>
//   </Router>
// );

// export default AppRouter;

class AppRouter extends Component {
  state = {
    apiResponse: ""
  };

  componentDidMount() {
    console.log(getToken());
    // We're using Fetch as the method to be called, and the /me endpoint
    // from Microsoft Graph as the REST API request to make.
    adalApiFetch(fetch, "https://graph.microsoft.com/v1.0/me", {})
      .then(response => {
        // This is where you deal with your API response. In this case, we
        // interpret the response as JSON, and then call `setState` with the
        // pretty-printed JSON-stringified object.
        response.json().then(responseJson => {
          this.setState({ apiResponse: JSON.stringify(responseJson, null, 2) });
        });
      })
      .catch(error => {
        // Don't forget to handle errors!
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <p>API response:</p>
        <pre>{this.state.apiResponse}</pre>
      </div>
    );
  }
}

export default AppRouter;
