import React, { Component } from "react";
import { Header, HeaderImg, SearchBar, PosterList, Footer } from "./components";
import { Home, LoginForm, NotFound, MovieId } from "./routes";
import "./App.css";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchMovie from "./routes/SearchMovie/SearchMovie";

class App extends Component {
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

  searchMovies = async categories => {
    const genres = `&with_genres=${categories}`;
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1${genres}`
      )
      .then(res => {
        this.setState({ resultMovies: res.data });
      });
  };

  searchBarMovie = async movie => {
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=1`
      )
      .then(res => {
        this.setState({ resultMovies: res.data });
      });
  };

  buttonState = btnState => {
    const filteredItem = this.state.movies.filter(
      item => item.id !== btnState.id
    );
    this.setState({
      movies: [...filteredItem, btnState]
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginForm />
            </Route>
            <Route exact path="/movie/:movie">
              <MovieId />
            </Route>
            <Route exact path="/result">
              <PosterList
                resultMovies={this.state.resultMovies}
                alreadySeen={this.alreadySeen}
                movies={this.state.movies}
                wishList={this.state.wishList}
                buttonState={this.buttonState}
              />
            </Route>
            <Route exact path="/search">
              <SearchMovie categories={this.searchMovies} />
            </Route>
            <Route exact path="/">
              <SearchBar searchMovie={this.searchBarMovie} />
            </Route>
            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
