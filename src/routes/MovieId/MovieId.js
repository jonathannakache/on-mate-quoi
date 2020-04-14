import React, { Component } from "react";
import "./MovieId.css";
import axios from "axios";
import ButtonMovie from "../../components/ButtonMovie/ButtonMovie";

class MovieId extends Component {
  state = {
    id: "",
    getVideo: {},
    resultMovies: {},
    getCredit: {},
    load: false,
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
        ),
      ])
      .then(
        axios.spread((getVideo, getCredit, getDetail) => {
          this.setState({
            getVideo: getVideo.data,
            resultMovies: getDetail.data,
            getCredit: getCredit.data,
            id: movieID,
            load: true,
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
      (director) => director.job === "Director"
    )[0].name;

    return (
      <div className="container">
        <div className="movie-id">
          <div>
            <figure>
              <img
                draggable="false"
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${resultMovies.poster_path}`}
                className="movie-id-img"
                alt=""
              />
            </figure>
          </div>
          <div className="movie-id-description">
            <div>
              <div className="movie-id-header">
                <h3>{resultMovies.title}</h3>
                <ButtonMovie
                  cssBtn="movie-id-btn"
                  style={{ padding: "3rem" }}
                  movies={this.props.movies}
                  id={this.state.id}
                  buttonState={this.props.buttonState}
                />
              </div>
              <div className="movie-id-time">
                <p>{resultMovies.release_date.slice(0, 4)}</p>
                <p>{director}</p>
                <p>{time_convert(resultMovies.runtime)}</p>
              </div>
              <div className="movie-id-border"></div>
              <div className="movie-id-synopsis">
                <p>{resultMovies.overview}</p>
              </div>
              <div className="movie-id-border"></div>
              <div className="movie-id-actors">
                <p>Acteurs :</p>
                <p className="categories">
                  {getCredit.cast
                    .map((acteur) => (
                      <span className="categories">{acteur.name}</span>
                    ))
                    .slice(0, 7)}
                </p>
              </div>
              <div className="movie-id-actors">
                <p>
                  {resultMovies.genres.length > 1
                    ? "Categories :"
                    : "Categorie :"}
                </p>
                <p>
                  {resultMovies.genres.map((element) => (
                    <span className="categories">{element.name}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {getVideo.results.length > 0 ? (
          <div className="iframe-container">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getVideo.results[0].key}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen="true"
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
        <div className="bg">{load ? this.renderMovie() : `erreur`}</div>
      </div>
    );
  }
}

export { MovieId };
