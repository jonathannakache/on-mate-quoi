import "./SearchBar.css";
import { useHistory } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { isAuth as Auth } from "../../utils/isAuth";
import axios from "axios";

import React, { useState } from "react";

const SearchBar = ({ resultMovies }) => {
  let history = useHistory();

  const [movie, setMovie] = useState("");
  const searchBarMovie = async (movie) => {
    await axios
      .all([
        await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=1&include_adult=false`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=2&include_adult=false`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=3&include_adult=false`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&query=${movie}&page=4&include_adult=false`
        ),
      ])

      .then(
        axios.spread((page1, page2, page3, page4) => {
          const total = [page1.data, page2.data, page3.data, page4.data];
          resultMovies(total);
          setMovie("");
          history.push("/result");
        })
      );
  };

  const handleChange = (event) => {
    setMovie(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      searchBarMovie(movie);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    searchBarMovie(movie);
  };

  return Auth.authentificated ? (
    <>
      <div className="searchbar">
        <input
          className="searchbar-input"
          type="text"
          placeholder="Rechercher un Film"
          value={movie}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <div className="searchbar-submit">
          <FontAwesome
            className="search-icon"
            onClick={handleSubmit}
            name="search"
          />
        </div>
      </div>
    </>
  ) : null;
};

export { SearchBar };
