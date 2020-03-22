import React, { Component } from "react";
import axios from "axios";
import { HeaderImg, SearchBar, PosterList, Footer } from "../../components";
import "./Home.css";

class Home extends Component {
  state = {
    movies: [
      {
        id: "",
        isWatch: false,
        isAddWatchlist: false
      }
    ],
    movie: "",
    resultMovies: {
      results: []
    }
  };

  buttonState = btnState => {
    const filteredItem = this.state.movies.filter(
      item => item.id !== btnState.id
    );
    this.setState({
      movie: this.state.id,
      data: this.state.data,
      movies: [...filteredItem, btnState]
    });
  };

  render() {
    return (
      <div className="home">
        <HeaderImg />
        <SearchBar searchMovie={this.props.searchMovie} />
        <PosterList
          resultMovies={this.state.resultMovies}
          alreadySeen={this.alreadySeen}
          movies={this.state.movies}
          wishList={this.state.wishList}
          buttonState={this.buttonState}
        />

        <Footer />
      </div>
    );
  }
}

export { Home };
