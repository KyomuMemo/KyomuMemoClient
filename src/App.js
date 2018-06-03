import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

class TestComponent extends Component {
  render() {
    return (
      <div>
        <p>This is Test Component.</p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <Link to="/test">to test</Link>
          </div>
          <Route path="/test" component={TestComponent} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
