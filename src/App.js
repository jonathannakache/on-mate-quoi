import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";
import { PosterList, Header, Footer, Navbar } from "./components";
import {
  Home,
  LoginForm,
  NotFound,
  MovieId,
  Register,
  Watchlist,
  UserSettings,
  Account,
  SearchMovie,
  Popular,
  NewMovies,
  Upcoming,
} from "./routes";
import AuthService from "./utils/AuthService";
import "./App.css";
import { isAuth } from "./utils/isAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
toast.configure();

class App extends Component {
  state = {
    userData: {
      movies: [],
    },
    movie: "",
    resultMovies: [
      {
        results: [],
      },
    ],
    watchlistLength: "",
  };

  async componentDidMount() {
    await fetch("/checkToken")
      .then((res) => {
        if (res.status === 200) {
          isAuth.authentificated = true;
          this.getData();
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        isAuth.authentificated = false;
        this.setState({
          userData: {
            movies: [{}],
          },
        });
      });
  }

  moviesLenght = (moviesLenght) => {
    this.setState({ moviesLenght });
  };

  updateUser = async () => {
    const userData = this.state.userData;
    await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ userData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.error(err, "CATCH");
      });
  };

  logout = (toast) => {
    isAuth.authentificated = false;
    this.setState({
      userData: {
        movies: [{}],
      },
    });
    if (toast === "logout") {
      this.SeeYouSoon(`À bientot 😉`);
    } else {
      this.SeeYouSoon(`La cession a expire`);
    }
  };

  SeeYouSoon = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  getData = async () => {
    await fetch("/api/getData")
      .then((res) => res.text())
      .then((res) => {
        this.setState({
          userData: JSON.parse(res),
        });
        isAuth.authentificated = true;
      })
      .catch((err) => {
        isAuth.authentificated = false;
      });

    this.updateWatchlist();
  };

  userData = (data, aut) => {
    isAuth.authentificated = aut;
    this.setState({
      userData: data,
    });
    this.updateWatchlist();
  };

  resultMovies = (total) => {
    this.setState({ resultMovies: total });
  };

  buttonState = async (btnState) => {
    const selectedItem = this.state.userData.movies.find(
      (item) => item.id === btnState.id
    );
    if (selectedItem === undefined) {
      await this.setState((prevState) => ({
        userData: {
          ...prevState.userData,
          movies: [...prevState.userData.movies, btnState],
        },
      }));
    } else {
      const filteredItem = this.state.userData.movies.filter(
        (item) => item.id !== btnState.id
      );

      this.setState((prevState) => ({
        userData: { ...prevState.userData, movies: filteredItem },
      }));
    }
    this.updateWatchlist();
    this.updateUser();
  };

  updateWatchlist = async () => {
    const movies = this.state.userData.movies;
    let arrWatchlist = [];
    const allMovies = await movies.map((movie) => {
      if (movie.isAddWatchlist) {
        arrWatchlist.push(movie.id);
      }
    });
    this.setState({ watchlistLength: arrWatchlist.length });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            badge={this.state.watchlistLength}
            resultMovies={this.resultMovies}
          />
          <div className="content">
            <div className={isAuth.authentificated ? "navbar-width" : null}>
              <Navbar badge={this.state.watchlistLength} logout={this.logout} />
            </div>
            <div className="main">
              <Switch>
                {/* PRIVATE */}
                <Route exact path="/popular">
                  <AuthService
                    child={Popular}
                    logout={this.logout}
                    movies={this.state.userData.movies}
                    buttonState={this.buttonState}
                  />
                </Route>
                <Route exact path="/new-movies">
                  <AuthService
                    child={NewMovies}
                    logout={this.logout}
                    movies={this.state.userData.movies}
                    buttonState={this.buttonState}
                  />
                </Route>

                <Route exact path="/upcoming">
                  <AuthService
                    child={Upcoming}
                    logout={this.logout}
                    movies={this.state.userData.movies}
                    buttonState={this.buttonState}
                  />
                </Route>

                <Route exact path="/watchlist">
                  <AuthService
                    child={Watchlist}
                    buttonState={this.buttonState}
                    logout={this.logout}
                    watchlistLength={this.state.watchlistLength}
                  />
                </Route>
                <Route exact path="/settings">
                  <AuthService child={UserSettings} logout={this.logout} />
                </Route>
                <Route exact path="/account">
                  <AuthService child={Account} logout={this.logout} />
                </Route>

                <Route exact path="/movie/:movie">
                  <AuthService
                    child={MovieId}
                    movies={this.state.userData.movies}
                    buttonState={this.buttonState}
                    logout={this.logout}
                  />
                </Route>

                <Route exact path="/result">
                  <AuthService
                    child={PosterList}
                    logout={this.logout}
                    movies={this.state.userData.movies}
                    buttonState={this.buttonState}
                    resultMovies={this.state.resultMovies}
                  />
                </Route>

                <Route exact path="/search">
                  <AuthService
                    child={SearchMovie}
                    logout={this.logout}
                    resultMovies={this.resultMovies}
                  />
                </Route>

                {/* PUBLIC */}
                <Route exact path="/login">
                  <LoginForm userData={this.userData} />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/">
                  <Home resultMovies={this.resultMovies} />
                </Route>
                <Route path="/">
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
    // <Footer />;
  }
}

export default App;
