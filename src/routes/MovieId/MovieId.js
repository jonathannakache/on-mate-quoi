import React, { Component } from "react";
import "./MovieId.css";
import axios from "axios";
import { Footer, Header } from "../../components";

class MovieId extends Component {
  state = {
    id: "",
    getVideo: {},
    resultMovies: {},
    getCredit: {},
    load: false
  };

  async componentDidMount() {
    const str = window.location.pathname;
    const movieID = str.substr(7);

    await axios
      .all([
        await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR`
        )
      ])
      .then(
        axios.spread((getVideo, getCredit, getDetail) => {
          this.setState({
            getVideo: getVideo.data,
            resultMovies: getDetail.data,
            getCredit: getCredit.data,
            id: movieID,
            load: true
          });
        })
      );
  }

  renderMovie = () => {
    function time_convert(num) {
      var hours = Math.floor(num / 60);
      var minutes = num % 60;
      return hours + " h " + minutes + " minutes";
    }
    const { resultMovies, getVideo, getCredit } = this.state;
    const director = getCredit.crew.filter(
      director => director.job === "Director"
    )[0].name;

    return (
      <div className=" container">
        <div className="search-movie movie-id row">
          <div className="col-3">
            <figure>
              <img
                draggable="false"
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${resultMovies.poster_path}`}
                className="movie-id-img"
                alt=""
              />
            </figure>
          </div>
          <div className="col-9">
            <h3>{resultMovies.title}</h3>
            <p>Realisateur :</p>
            <p className="result">{director}</p>
            <p>Durée</p>
            <p className="result">{time_convert(resultMovies.runtime)}</p>
            <p>Acteurs :</p>
            <p className="categories">
              {getCredit.cast
                .map(acteur => (
                  <span className="categories">{acteur.name}</span>
                ))
                .slice(0, 7)}
            </p>
            <p>
              {resultMovies.genres.length > 1 ? "Categories :" : "Categorie :"}
            </p>
            <p>
              {resultMovies.genres.map(element => (
                <span className="categories">{element.name}</span>
              ))}
            </p>
            <p>Synopsis :</p>
            <p className="result">{resultMovies.overview}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="add-to-watchlist col-6">
            <a href="#">Ajouter a ma Watchlist</a>
          </div>
          <div className="col-3"></div>
        </div>

        {getVideo.results.length > 0 ? (
          <div className="iframe-container">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getVideo.results[0].key}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  render() {
    const { load } = this.state;

    return (
      <div className="app">
        <Header badge={5} />
        <div className="bg">
          {load ? this.renderMovie() : `erreur`}
          <Footer />
        </div>
      </div>
    );
  }
}

export { MovieId };
