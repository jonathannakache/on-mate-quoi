import React, { Component } from "react";
import { FormSearchMovie } from "../../components";
import { Redirect } from "react-router-dom";
import axios from "axios";

class SearchMovie extends Component {
  state = {
    categories: [],
    isSearch: false,
    resultMovies: [],
    redirect: false,
  };

  getForm = async (genre, acteur, year) => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&sort_by=popularity.desc&include_adult=false&page=1&primary_release_year=${year}&with_people=${acteur}&with_genres=${genre}`;

    await axios.get(URL).then((res) => {
      this.props.resultMovies(res.data);
      this.setState({ redirect: true });
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/result" />;
    }
    return (
      <div>
        <FormSearchMovie getForm={this.getForm} />
      </div>
    );
  }
}

export { SearchMovie };
