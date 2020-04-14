import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import { Poster } from "../../components/";
import { Link, Redirect } from "react-router-dom";
import "./Watchlist.css";
import axios from "axios";

let arrData = [];
let arrWatchlist = [];

class Watchlist extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      isReady: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.getWatchlist();
  }
  next = async () => {
    const movies = this.state.userData.movies;

    for (const movie of await movies) {
      if (movie.isAddWatchlist) {
        arrWatchlist.push(movie.id);
      }
    }

    this.setState({ arrWatchlist: arrWatchlist });
    for (const movie of await this.state.arrWatchlist) {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie}}?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR`
        )
        .then((res) => arrData.push(res.data));
    }

    setTimeout(() => {
      this.setState({ isReady: true, noMovie: false });
    }, 600);
  };

  getWatchlist = async () => {
    await fetch("/api/getData")
      .then((res) => res.text())
      .then((res) => {
        if (res === "Unauthorized") {
          this.props.logout();
          this.setState({ redirect: true });
          return;
        } else {
          this.setState({
            userData: JSON.parse(res),
          });
          this.next();
        }
      });
  };

  renderMovies = () => {
    let genre_ids = [];
    const renderMovies = arrData.map((movie) => {
      const a = movie.genres.forEach((element) => {
        genre_ids.push(element.id);
      });

      return (
        <Grid.Column key={movie.id}>
          <Poster
            movies={this.state.userData.movies}
            title={movie.title}
            releaseDate={movie.release_date}
            id={movie.id}
            note={movie.vote_average}
            langueOriginal={movie.original_language}
            image={movie.poster_path}
            buttonState={this.props.buttonState}
            genre_ids={genre_ids}
          />
        </Grid.Column>
      );
    });
    if (this.state.arrWatchlist < 1) {
      this.setState({ isReady: false, noMovie: true });
    } else if (arrData.length < 1) {
      setTimeout(() => {
        this.setState({ isReady: false });
        this.getWatchlist();
      }, 50);
    } else {
      arrWatchlist = [];
      arrData = [];
      return renderMovies;
    }
  };

  render() {
    const { noMovie, isReady, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }

    if (noMovie) {
      return (
        <div>
          <div className="back-btn">
            <Link
              to="/account"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              Retour
            </Link>
          </div>
          <div className="container">
            <h2 style={{ textAlign: "center" }}>
              IL N'Y A PAS DE FILM DANS TA WATCH LIST
            </h2>
          </div>
        </div>
      );
    }
    return isReady ? (
      <div>
        <div className="back-btn">
          <Link
            to="/account"
            style={{
              color: "inherit",
              listStyle: "none",
              textDecoration: "none",
            }}
          >
            Retour
          </Link>
        </div>
        <div className="container">
          <div className="watchlist">
            <h4>MA WATCHLIST</h4>
            <span>Il te reste</span>{" "}
            <span className="color">{`${this.props.watchlistLength}`}</span>
            <span> films à voir </span>{" "}
          </div>
        </div>
        <Container>
          <Grid columns={4} stackable>
            <Grid.Row>{this.renderMovies()}</Grid.Row>
          </Grid>
        </Container>
      </div>
    ) : (
      <div>
        <div className="back-btn">
          <Link
            to="/account"
            style={{
              color: "inherit",
              listStyle: "none",
              textDecoration: "none",
            }}
          >
            Retour
          </Link>
        </div>
        <p className="loading">CHARGEMENT</p>
        <div className="loader"></div>
      </div>
    );
  }
}

export { Watchlist };
