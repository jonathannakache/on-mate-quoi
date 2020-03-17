import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./Header.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class Header extends Component {
  render() {
    return (
      <div id="header">
        <FontAwesome className="header--movie" name="film" size="5x" />
        <Link to="/">ON MATE QUOI ? </Link>
        <Link to="/login">Se connecter</Link>
        <Link to="/login">trouver un film</Link>

        {/* <Link to="/search-movie">Login</Link> */}
        <FontAwesome className="header--heart" name="heart" size="5x" />

        <div className="header--badge">{this.props.badge}</div>
      </div>
    );
  }
}

export { Header };
