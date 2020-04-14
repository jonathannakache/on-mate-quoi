import { FormSearchMovie } from "../../components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import React from "react";
import { useState } from "react";

const SearchMovie = ({ resultMovies }) => {
  const [isReady, setIsReady] = useState(false);

  let history = useHistory();

  const getForm = async (genre, acteur, year) => {
    setIsReady(true);
    await axios
      .all([
        await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=1&primary_release_year=${year}&with_people=${acteur}&with_genres=${genre}`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=2&primary_release_year=${year}&with_people=${acteur}&with_genres=${genre}`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=3&primary_release_year=${year}&with_people=${acteur}&with_genres=${genre}`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=4&primary_release_year=${year}&with_people=${acteur}&with_genres=${genre}`
        ),
      ])
      .then(
        axios.spread((page1, page2, page3, page4) => {
          const total = [page1.data, page2.data, page3.data, page4.data];
          resultMovies(total);
          history.push("/result");
        })
      );
  };
  return isReady ? (
    <div>
      <p className="loading">CHARGEMENT</p>
      <div className="loader"></div>
    </div>
  ) : (
    <div>
      <FormSearchMovie getForm={getForm} />
    </div>
  );
};

export { SearchMovie };
