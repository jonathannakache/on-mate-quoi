import React, { Component } from "react";
import { FormSearchMovie, Header } from "../../components";
import "./SearchMovie.css";
import { Redirect } from "react-router-dom";

export default class SearchMovie extends Component {
  state = {
    categories: [],
    isSearch: false,
    resultMovies: [],
    redirect: false
  };

  categories = genre => {
    this.props.categories(genre);
    this.setState({
      categories: genre,
      redirect: true
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/result" />;
    }
    return (
      <div className="searchMovie">
        <Header badge={5} />

        <FormSearchMovie categories={this.categories} />
      </div>
    );
  }
}
