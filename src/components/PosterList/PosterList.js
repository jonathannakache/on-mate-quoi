import React, { Component } from "react";
// import Poster from "../Poster/Poster";
import { Grid, Container } from "semantic-ui-react";
import Poster from "../Poster/Poster";
import "./PosterList.css";
import ButtonMovie from "../ButtonMovie/ButtonMovie";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class PosterList extends Component {
  render() {
    const { data, movies, alreadySeen, addWatchlist, wishList } = this.props;

    const PosterArray = data.results.map(movie => {

      if (movie.poster_path && movie.overview !== "") {
        return (
          <Grid.Column>
            <Link to={`/movie/${movie.id}`} >
              <Poster
                title={movie.title}
                releaseDate={movie.release_date}
                key={movie.id}
                id={movie.id}
                note={movie.vote_average}
                langueOriginal={movie.original_language}
                image={movie.poster_path}
                synopsis={movie.overview}
              />
            </Link>

            <ButtonMovie
              id={movie.id}
              wishList={wishList.map(movie => movie.name)}
              addWatchlist={() => addWatchlist(movie.id)}
              movies={movies.map(movie => movie.name)}
              alreadySeen={() => alreadySeen(movie.id)}
            />
          </Grid.Column>
        );
      }
    });
    let loadResults;

    if (data.total_results == 0) {
      loadResults = <h3>Aucun films trouve</h3>;
    } else if (data.page) {
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
