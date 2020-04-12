// import React from "react";
import "./Header.css";
import { NavLink, Redirect } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { isAuth as Auth } from "../../utils/isAuth";
import axios from "axios";
import React, { Component } from "react";

class Header extends Component {
  // state = {
  //   movie: "",
  //   redirect: false,
  // };

  // searchBarMovie = async (movie) => {
  //   await axios
  //     .get(
  //       `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=1`
  //     )
  //     .then((res) => {
  //       this.props.resultMovies(res.data);
  //       this.setState({ redirect: true, searchBarMovie: "", movie: "" });
  //     });
  // };

  // handleChange = (event) => {
  //   this.setState({
  //     movie: event.target.value,
  //   });
  // };

  // handleKeyUp = (event) => {
  //   if (event.key === "Enter") {
  //     this.searchBarMovie(this.state.movie);
  //   }
  // };

  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   this.searchBarMovie(this.state.movie);
  // };

  render() {
    return Auth.authentificated ? (
      <div className="header">
        <div className="title">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <h1>ON MATE QUOI ?</h1>
          </NavLink>
        </div>
        <NavLink to="/watchlist" style={{ textDecoration: "none" }}>
          <FontAwesome className="header-heart" name="heart" size="5x" />
          <div className="header-badge">{this.props.badge}</div>
        </NavLink>

        {/* <div className="searchbar">
          <input
            className="searchbar-input"
            type="text"
            placeholder="Rechercher un Film"
            value={this.state.movie}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
          <div className="searchbar-submit">
            <FontAwesome
              className="search-icon"
              onClick={this.handleSubmit}
              name="search"
            />
          </div>
        </div> */}
      </div>
    ) : (
      <div className="header">
        <div className="title">
          <NavLink to="/">
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
