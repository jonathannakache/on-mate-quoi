import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import { Poster, Footer, Header } from "../index";
import "./PosterList.css";
import { Link } from "react-router-dom";

class PosterList extends Component {
  renderMovies = () => {
    const { resultMovies, buttonState } = this.props;

    const renderMovies = resultMovies.results.map(movie => {
      if (movie.poster_path && movie.overview !== "") {
        return (
          <Grid.Column key={movie.id}>
            <Poster
              movies={this.props.movies}
              title={movie.title}
              releaseDate={movie.release_date}
              id={movie.id}
              note={movie.vote_average}
              langueOriginal={movie.original_language}
              image={movie.poster_path}
              buttonState={buttonState}
            />
          </Grid.Column>
        );
      }
    });
    return renderMovies;
  };

  render() {
    return (
      <div className="app">
        {this.props.resultMovies.results.length === 0 ? (
          <div className="posterList">
            <h1>pas de films</h1>
            <Link to="/search">
              <button>rechercher un film </button>
            </Link>
            <Footer />
          </div>
        ) : (
          <div className="posterLwt">
            <Container>
              <Grid columns={4} stackable>
                <Grid.Row>{this.renderMovies()}</Grid.Row>
              </Grid>
            </Container>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

export { PosterList };
