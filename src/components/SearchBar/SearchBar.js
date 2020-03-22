import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";
import { Redirect } from "react-router-dom";
import { Header, HeaderImg, Footer } from "../index";

class SearchBar extends Component {
  state = {
    movie: "",
    redirect: false
  };

  handleChange = event => {
    this.setState({
      movie: event.target.value
    });
  };

  handleKeyUp = event => {
    if (event.key === "Enter") {
      this.props.searchMovie(this.state.movie);
      this.setState({
        movie: "",
        redirect: true
      });
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
      <div className="app" >
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
