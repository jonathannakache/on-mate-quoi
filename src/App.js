import React, { Component } from "react";
import { HeaderImg, SearchBar, PosterList } from "./components";
import { LoginForm, NotFound, MovieId } from "./routes";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

  resultMovies = response => {
    this.setState({ resultMovies: response });
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
                searchMovie={this.props.searchMovie}
                resultMovies={this.state.resultMovies}
                alreadySeen={this.alreadySeen}
                movies={this.state.movies}
                wishList={this.state.wishList}
                buttonState={this.buttonState}
              />
            </Route>
            <Route exact path="/search">
              <SearchMovie resultMovies={this.resultMovies} />
            </Route>
            <Route exact path="/">
              <SearchBar resultMovies={this.resultMovies} />
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
