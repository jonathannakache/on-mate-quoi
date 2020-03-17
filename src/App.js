import React, { Component } from "react";
import { Header } from "./components";
import { Home, LoginForm, NotFound, MovieId } from "./routes";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    const {} = this.props
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login">
              <Header badge={5} />
              <LoginForm />
            </Route>
            <Route exact path="/movie/:movie">
              <Header badge={5} />
              <MovieId />
            </Route>
            <Route exact path="/">
              <Header badge={5} />
              <Home />
            </Route>
            <Route path="/">
              <Header badge={5} />
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
