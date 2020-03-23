import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";
import { Redirect } from "react-router-dom";
import { Header, HeaderImg, Footer } from "../index";
import axios from "axios";

class SearchBar extends Component {
  state = {
    movie: "",
    redirect: false
  };
  searchBarMovie = async movie => {
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=1`
      )
      .then(res => {
        this.props.resultMovies(res.data);
        this.setState({ redirect: true });
      });
  };

  handleChange = event => {
    this.setState({
      movie: event.target.value
    });
  };

  handleKeyUp = event => {
    if (event.key === "Enter") {
      // this.props.searchMovie(this.state.movie);
      this.setState({
        movie: ""
      });
      this.searchBarMovie(this.state.movie);
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchMovie(this.state.movie);
    this.setState({
      movie: "",
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/result" />;
    }
    return (
      <div className="app">
        <Header badge={5} />
        <HeaderImg />
        <div className="searchBar--container">
          <div className="searchBar">
            <input
              className="searchBar--input"
              type="text"
              placeholder="Rechercher un Film"
              value={this.state.movie}
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
            />

            <div className="searchBar--submit">
              <FontAwesome
                className="searchIcon"
                onClick={this.handleSubmit}
                name="search"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export { SearchBar };
