import React, { Component } from "react";
import { SearchBar, PosterList, Header } from "./components";
import { LoginForm, NotFound, MovieId, Register } from "./routes";
import WithAuth from "./withAuth";
import MonCompte from "./MonCompte";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect
} from "react-router-dom";
import SearchMovie from "./routes/SearchMovie/SearchMovie";

// export let auth = {
//   isAuth: false
// };

class App extends Component {
  state = {
    userData: {},
    movie: "",
    isAuth: false,
    resultMovies: {
      results: []
    }
  };

  updateUser = async () => {
    const userData = this.state.userData;
    await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ userData }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log(res, " RESPONSE"))
      .catch(err => {
        console.error(err, "CATCH");
      });
  };
  async componentDidMount() {
    await fetch("/api/getData")
      .then(res => res.text())
      .then(res => {
        this.setState({
          userData: JSON.parse(res),
          isAuth: true
        });
      })
      .catch(err => {
        console.error(err, "CATCH");
      });
  }

  userData = (data, isAuth) => {
    this.setState({
      userData: data,
      isAuth: isAuth
    });
  };

  isAuth = isAuth => {
    this.setState({
      isAuth: isAuth
    });
  };

  resultMovies = response => {
    this.setState({ resultMovies: response });
  };

  buttonState = async btnState => {
    console.log(btnState.id, "btnstate");
    const selectedItem = this.state.userData.movies.find(
      item => item.id === btnState.id
    );
    if (selectedItem === undefined) {
      await this.setState(prevState => ({
        userData: {
          ...prevState.userData,
          movies: [...prevState.userData.movies, btnState]
        }
      }));
    } else {
      const filteredItem = this.state.userData.movies.filter(
        item => item.id !== btnState.id
      );

      await this.setState(prevState => ({
        userData: { ...prevState.userData, movies: filteredItem }
      }));
    }

    this.updateUser();
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            badge={5}
            isAuth={this.state.isAuth}
            userData={this.userData}
          />

          <Switch>
            {/* PRIVATE */}
            <Route exact path="/moncompte">
              <WithAuth child={MonCompte} userData={this.userData} />
            </Route>

            <Route exact path="/movie/:movie">
              <WithAuth child={MovieId} userData={this.userData} />
            </Route>

            <Route exact path="/result">
              <WithAuth
                child={PosterList}
                userData={this.userData}
                searchMovie={this.props.searchMovie}
                resultMovies={this.state.resultMovies}
                movies={this.state.userData.movies}
                buttonState={this.buttonState}
              />
            </Route>

            <Route exact path="/search">
              <WithAuth
                child={SearchMovie}
                resultMovies={this.resultMovies}
                userData={this.userData}
              />
            </Route>

            {/* PUBLIC */}
            <Route exact path="/login">
              <LoginForm userData={this.userData} isAuth={this.state.isAuth} />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <SearchBar
                resultMovies={this.resultMovies}
                isAuth={this.state.isAuth}
              />
            </Route>
            <Route path="/">
              <NotFound isAuth={this.state.isAuth} userData={this.userData} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
