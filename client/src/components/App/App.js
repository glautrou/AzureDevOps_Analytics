// @flow

import React, { Component } from "react";
import logo from "../../logo.svg";
import "./App.css";
import AppRouter from "./AppRouter.js";
import About from "../About";

// function test(x: ?number): string {
//   if (x) {
//     return x;
//   }
//   return "default string";
// }

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <About
          applicationName="Azure DevOps Analytics"
          author="Gilles Lautrou"
        />
        <AppRouter />
      </div>
    );
  }
}

export default App;
