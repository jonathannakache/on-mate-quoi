import React, { Component } from "react";
import axios from "axios";
import "./FormSearchMovie.css";

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Aventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comédie",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentaire",
  },
  {
    id: 18,
    name: "Drame",
  },
  {
    id: 10751,
    name: "Familial",
  },
  {
    id: 14,
    name: "Fantastique",
  },
  {
    id: 36,
    name: "Histoire",
  },
  {
    id: 27,
    name: "Horreur",
  },
  {
    id: 10402,
    name: "Musique",
  },
  {
    id: 9648,
    name: "Mystère",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science-Fiction",
  },
  {
    id: 10770,
    name: "Téléfilm",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "Guerre",
  },
  {
    id: 37,
    name: "Western",
  },
];

class FormSearchMovie extends Component {
  state = {
    genre: [],
    acteur: "",
    acteurID: "",
    year: "",
    resultsPeople: [],
  };

  handleSubmit = (event) => {
    const { year, acteurID, genre } = this.state;
    event.preventDefault();
    const genreSeparate = genre.join(",");
    this.props.getForm(genreSeparate, acteurID, year);
    this.setState({ genre: [], acteurID: "", year: "" });
  };

  handleClick = (event) => {
    const isInclude = this.state.genre.includes(event.target.id);
    if (isInclude) {
      this.setState({
        genre: this.state.genre.filter((item) => item !== event.target.id),
      });
    } else {
      this.setState({
        genre: [...this.state.genre, event.target.id],
      });
    }
  };
  renderPeople = () => {
    const renderPeople = this.state.resultsPeople
      .map((people) => {
        return (
          <div
            onClick={() =>
              this.setState({ acteur: people.name, resultsPeople: [] })
            }
          >
            {people.name}
          </div>
        );
      })
      .slice(0, 7);
    return renderPeople;
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangePeople = async (event) => {
    await this.setState({
      acteur: event.target.value,
    });
    const person = this.state.acteur;
    await axios
      .get(
        `https://api.themoviedb.org/3/search/person?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${person}&page=1&include_adult=false`
      )
      .then((res) => {
        this.setState({
          resultsPeople: res.data.results,
        });
      });
  };
  render() {
    return (
      <form
        className="form-search-movie container"
        onSubmit={this.handleSubmit}
      >
        <div className="form-check row">
          <h4 className="formSearchMovieTitles">Catégories</h4>
          {genres.map((genre) => {
            return (
              <input
                className={
                  this.state.genre.includes(genre.id.toString())
                    ? "col-2 form-search-movie-categories-include"
                    : "col-2 form-search-movie-categories"
                }
                type="button"
                key={genre.id}
                name={genre.id}
                id={genre.id}
                value={genre.name}
                onClick={this.handleClick}
              />
            );
          })}
        </div>
        <div className="form-search-movie-bg">
          <h4 className="formSearchMovieTitles">Acteur</h4>
          <input
            className="formSearchMovieInput"
            type="text"
            placeholder="..."
            name="acteur"
            id="acteur"
            autocomplete="off"
            onChange={this.handleChangePeople}
            value={this.state.acteur}
          />
          {this.state.resultsPeople
            .map((people) => {
              return (
                <div
                  className="peoples"
                  onClick={() =>
                    this.setState({
                      acteur: people.name,
                      acteurID: people.id,
                      resultsPeople: [],
                    })
                  }
                >
                  {people.name}
                </div>
              );
            })
            .slice(0, 7)}
        </div>
        <div className="form-search-movie-bg">
          <h4 className="formSearchMovieTitles">Année du film</h4>
          <input
            placeholder="..."
            name="year"
            className="formSearchMovieInput"
            id="year"
            onChange={this.handleChange}
            value={this.state.year}
          />
        </div>

        <button
          type="submit"
          className="formSearchMovieSubmit"
          onSubmit={this.handleSubmit}
        >
          Chercher
        </button>
      </form>
    );
  }
}

export { FormSearchMovie };
