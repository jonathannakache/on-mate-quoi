import React from "react";
import Cookies from "js-cookie";
import "./Navbar.css";
import { NavLink, useHistory } from "react-router-dom";
import { isAuth as Auth } from "../../utils/isAuth";

const Navbar = ({ badge, logout }) => {
  let history = useHistory();

  function disconnect() {
    Cookies.remove("token");
    logout("logout");
    history.push("/");
  }

  return Auth.authentificated ? (
    <div className="navbar-fix">
      <div className="navbar-content">
        <div>
          <h3>Menu</h3>
          <div className="navbar-link">
            <NavLink
              to="/"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              <i class="fas fa-home"></i> Accueil
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink
              to="/search"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              <i class="fas fa-search-plus"></i> Recherche avancée
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink
              to="/new-movies"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              <i class="far fa-calendar-plus"></i> Dernières sorties
            </NavLink>
          </div>
          <div className="navbar-link">
            <NavLink
              to="/top-rated"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              <i class="fas fa-star"></i> Les mieux notés
            </NavLink>
          </div>

          <div className="navbar-link">
            <NavLink
              to="/popular"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              <i class="fas fa-sort-amount-up"></i> Films du moment
            </NavLink>
          </div>
        </div>
        <div>
          <h3>Tableau de bord</h3>
          <div className="navbar-link">
            <NavLink
              to="/account"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              <i class="fas fa-user"></i> Mon compte
            </NavLink>
          </div>

          <div className="navbar-link">
            <NavLink
              to="/watchlist"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              <i class="fas fa-heart"></i> Ma watchlist
            </NavLink>
          </div>
        </div>
      </div>
      <div className="navbar-logout">
        <h3 onClick={disconnect}>Se déconnecter</h3>
      </div>
    </div>
  ) : null;
};

export { Navbar };
