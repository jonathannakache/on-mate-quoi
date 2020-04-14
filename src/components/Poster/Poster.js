import React, { Component } from "react";
import ButtonMovie from "../ButtonMovie/ButtonMovie";
import { Link } from "react-router-dom";
import "./Poster.css";
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
class Poster extends Component {
  render() {
    const { image, title, id, movies, buttonState, genre_ids } = this.props;

    let result = [];
    genre_ids.forEach((element) => {
      genres.forEach((genre) => {
        if (element == genre.id) {
          result.push(genre.name);
        }
      });
    });
    const categories = result.slice(0, 2).join(", ").toString();

    return (
      <>
        <div className="poster-img">
          <Link to={`/movie/${id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${image}`}
              className="card"
            />
          </Link>
          <div className="children">
            <ButtonMovie id={id} movies={movies} buttonState={buttonState} />
          </div>
        </div>
        <h6>{title}</h6>
        <p className="categories">{categories}</p>
      </>
    );
  }
}

export { Poster };
