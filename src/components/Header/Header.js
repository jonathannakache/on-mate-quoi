import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./Header.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div id="header">
        <FontAwesome className="header--movie" name="film" size="5x" />
        <NavLink to="/">ON MATE QUOI ? </NavLink>
        <NavLink to="/login">Se connecter</NavLink>
        <NavLink to="/login">trouver un film</NavLink>
        <FontAwesome className="header--heart" name="heart" size="5x" />

        <div className="header--badge">{this.props.badge}</div>
      </div>
    );
  }
}

export { Header };
