import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import { Poster, Footer, Header } from "../index";
import "./PosterList.css";
import { Link } from "react-router-dom";

class PosterList extends Component {
  renderMovies = () => {
    const { resultMovies, isAddWatchlist, buttonState } = this.props;

    const renderMovies = resultMovies.results.map(movie => {
      if (movie.poster_path && movie.overview !== "") {
        return (
          <Grid.Column key={movie.id}>
            <Poster
              title={movie.title}
              releaseDate={movie.release_date}
              id={movie.id}
              note={movie.vote_average}
              langueOriginal={movie.original_language}
              image={movie.poster_path}
              isAddWatchlist={isAddWatchlist}
              buttonState={buttonState}
            />
          </Grid.Column>
        );
      }
    });
    return renderMovies;
  };

  render() {
    console.log(this.props.searchMovie, "posterList searchMovie");

    console.log(this.props.resultMovies, "result movies ;-)");
    return (
      <div className="app">
        {this.props.resultMovies.results.length === 0 ? (
          <div className="posterList">
            <Header badge={5} />
            <h1>pas de films</h1>
            <Link to="/search">
              <button>rechercher un film </button>
            </Link>
            <Footer />
          </div>
        ) : (
          <div className="posterList">
            <Header badge={5} />
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
