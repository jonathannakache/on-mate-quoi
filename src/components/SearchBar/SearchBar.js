import React, { Component } from "react";
import "./SearchBar.css";
import { HeaderImg } from "../index";
import { Redirect } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { isAuth as Auth } from "../../utils/isAuth";
import axios from "axios";

class SearchBar extends Component {
  state = {
    movie: "",
    redirect: false,
  };

  searchBarMovie = async (movie) => {
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=1`
      )
      .then((res) => {
        this.props.resultMovies(res.data);
        this.setState({ redirect: true, searchBarMovie: "", movie: "" });
      });
  };

  handleChange = (event) => {
    this.setState({
      movie: event.target.value,
    });
  };

  handleKeyUp = (event) => {
    if (event.key === "Enter") {
      this.searchBarMovie(this.state.movie);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.searchBarMovie(this.state.movie);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/result" />;
    }
    return Auth.authentificated ? (
      <>
        <h3>Hello John</h3>
        <h4>Recherche rapide</h4>
        <div className="searchbar">
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
        </div>
      </>
    ) : (
      <div className="app">
        <HeaderImg />
      </div>
    );
  }
}

export { SearchBar };
