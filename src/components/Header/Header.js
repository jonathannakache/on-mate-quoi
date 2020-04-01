import React from "react";
import FontAwesome from "react-fontawesome";
import "./Header.css";
import { NavLink, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ isAuth, badge, userData }) => {
  let history = useHistory();

  function disconnect() {
    Cookies.remove("token");
    userData({}, false);
    console.log("4");
    history.push("/");
  }

  return isAuth ? (
    <div className="header-login header">
      <FontAwesome className="header--movie" name="film" size="5x" />
      <NavLink to="/">ON MATE QUOI ? </NavLink>
      <NavLink to="/search">trouver un film</NavLink>
      <NavLink to="/moncompte">Mon Compte</NavLink>
      <span onClick={disconnect}>Se déconnecter</span>
      <FontAwesome className="header--heart" name="heart" size="5x" />

      <div className="header--badge">{badge}</div>
    </div>
  ) : (
    <div className="header-logout header">
      <NavLink to="/">ON MATE QUOI ? </NavLink>
      <NavLink to="/login">Se connecter</NavLink>
    </div>
  );
};

export { Header };
