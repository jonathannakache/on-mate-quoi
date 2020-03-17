import React, { Component } from "react";
import { HeaderImg, SearchBar, PosterList, Footer } from "../../components";
import "./Home.css";

class Home extends Component {
  state = {
    movie: "",
    isLoad: false,
    data: {
      results: []
    },
    movies: [],
    wishList: []
  };

  alreadySeen = movie => {
    if (this.state.movies.some(item => item.name === movie)) {
      this.setState({
        movies: this.state.movies.filter(i => i.name !== movie)
      });
    } else {
      this.setState({
        movies: [...this.state.movies, { name: movie, movieSeen: true }]
      });
    }
  };

  addWatchlist = movie => {
    if (this.state.wishList.some(item => item.name === movie)) {
      this.setState({
        wishList: this.state.wishList.filter(i => i.name !== movie)
      });
    } else {
      this.setState({
        wishList: [...this.state.wishList, { name: movie, movieSeen: true }]
      });
    }
  };

  searchMovie = async movie => {
    this.setState({ movie });
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=1`
    );
    const json = await response.json();
    this.setState({ data: json });
  };

  render() {
    return (
      <div className="home">
        <HeaderImg />
        <SearchBar searchMovie={this.searchMovie} />
        <PosterList
          data={this.state.data}
          isLoad={this.state.isLoad}
          alreadySeen={this.alreadySeen}
          addWatchlist={this.addWatchlist}
          movies={this.state.movies}
          wishList={this.state.wishList}
        />

        <Footer />
      </div>
    );
  }
}

export { Home };
