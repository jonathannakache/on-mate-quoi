import React, { Component } from "react";
import { FormSearchMovie, Header, Footer } from "../../components";
import "./SearchMovie.css";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class SearchMovie extends Component {
  state = {
    categories: [],
    isSearch: false,
    resultMovies: [],
    redirect: false
  };

  getForm = async (genre, acteur, year) => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=1&primary_release_year=${year}&with_people=${acteur}&with_genres=${genre}`;
    console.log(URL, "url");

    await axios.get(URL).then(res => {
      this.props.resultMovies(res.data);
      this.setState({ redirect: true });
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/result" />;
    }
    return (
      <div className="app">
        <div className="searchMovie">
          <Header badge={5} />
          <FormSearchMovie getForm={this.getForm} />
          <Footer />
        </div>
      </div>
    );
  }
}
