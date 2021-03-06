import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import { Poster } from "../index";
import "./PosterList.css";
import { Link } from "react-router-dom";

class PosterList extends Component {
  renderMovies = () => {
    const { resultMovies, buttonState, movies } = this.props;
    const render = resultMovies.map((page) => {
      const onePage = page.results.map((movie) => {
        if (movie.poster_path && movie.overview !== "") {
          return (
            <Grid.Column key={movie.id}>
              <Poster
                movies={movies}
                title={movie.title}
                releaseDate={movie.release_date}
                id={movie.id}
                note={movie.vote_average}
                langueOriginal={movie.original_language}
                image={movie.poster_path}
                buttonState={buttonState}
                genre_ids={movie.genre_ids}
              />
            </Grid.Column>
          );
        }
      });
      return onePage;
    });
    return render;
  };

  render() {
    return (
      <div>
        {this.props.resultMovies[0].results.length === 0 ? (
          <div>
            <h1>pas de films</h1>
            <Link to="/search">
              <button>rechercher un film </button>
            </Link>
          </div>
        ) : (
          <div>
            <Container>
              <Grid columns={4} stackable>
                <Grid.Row>{this.renderMovies()}</Grid.Row>
              </Grid>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export { PosterList };
