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

  searchMovie = async movie => {
    this.setState({ movie });
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=1`
      )
      .then(res => {
        this.setState({ resultMovies: res.data });
      });
  };

  render() {
    return (
      <div className="home">
        <HeaderImg />
        <SearchBar searchMovie={this.searchMovie} />
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
