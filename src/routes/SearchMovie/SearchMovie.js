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

  searchMovies = async categories => {
    const genres = `&with_genres=${categories}`;
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1${genres}`
      )
      .then(res => {
        this.props.resultMovies(res.data);
        this.setState({ redirect: true });
        console.log(res.data, "res");
      });
  };

  categories = genre => {
    this.setState({
      categories: genre
    });
    this.searchMovies(genre);
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/result" />;
    }
    return (
      <div className="searchMovie">
        <Header badge={5} />
        <FormSearchMovie categories={this.categories} />
        <Footer />
      </div>
    );
  }
}
