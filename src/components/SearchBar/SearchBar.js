import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    movie: ""
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
        movie: ""
      });
    }
  };

  handleSubmit = event => {
    this.props.searchMovie(this.state.movie);
    this.setState({
      movie: ""
    });
  };

  render() {
    return (
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
    );
  }
}

export { SearchBar };
