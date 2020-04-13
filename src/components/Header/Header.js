// import React from "react";
import "./Header.css";
import { NavLink, Redirect } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { isAuth as Auth } from "../../utils/isAuth";
import axios from "axios";
import React, { Component } from "react";
import { SearchBar } from "../SearchBar/SearchBar";

class Header extends Component {
  render() {
    return Auth.authentificated ? (
      <div className="header">
        <div className="title">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <h1>ON MATE QUOI ?</h1>
          </NavLink>
        </div>
        <SearchBar resultMovies={this.props.resultMovies} />
        <NavLink to="/watchlist" style={{ textDecoration: "none" }}>
          <FontAwesome className="header-heart" name="heart" size="5x" />
          <div className="header-badge">{this.props.badge}</div>
        </NavLink>
      </div>
    ) : (
      <div className="header">
        <div className="title">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <h1>ON MATE QUOI ?</h1>
          </NavLink>
        </div>
        <div className="login">
          <NavLink
            style={{
              color: "inherit",
              listStyle: "none",
              textDecoration: "none",
            }}
            to="/login"
          >
            <span>
              Se connecter <i class="fas fa-sign-in-alt"></i>
            </span>
          </NavLink>
        </div>
      </div>
    );
  }
}

export { Header };
