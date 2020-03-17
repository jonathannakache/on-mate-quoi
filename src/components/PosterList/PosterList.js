import React, { Component } from "react";
// import Poster from "../Poster/Poster";
import { Grid, Container } from "semantic-ui-react";
import Poster from "../Poster/Poster";
import "./PosterList.css";

class PosterList extends Component {
  render() {
    const { resultMovies, isAddWatchlist, buttonState } = this.props;

    const PosterArray = resultMovies.results.map(movie =>  {
      if (movie.poster_path && movie.overview !== "") {
        return (
          <Grid.Column
              key={movie.id}
            >
            <Poster
              title={movie.title}
              releaseDate={movie.release_date}
              id={movie.id}
              note={movie.vote_average}
              langueOriginal={movie.original_language}
              image={movie.poster_path}
              synopsis={movie.overview}
              isAddWatchlist={isAddWatchlist}
              buttonState={buttonState}
            />
          </Grid.Column>
        );
      }
    });
    let loadResults;

    if (resultMovies.total_results === 0) {
      loadResults = <h3>Aucun films trouve</h3>;
    } else if (resultMovies.page) {
      loadResults = (
        <div>
          <h3>NOUVEAUX FILMS</h3>
          <Container>
            <Grid columns={4} stackable>
              <Grid.Row>{PosterArray}</Grid.Row>
            </Grid>
          </Container>
        </div>
      );
    }

    return <div>{loadResults} </div>;
  }
}

export { PosterList };
