import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import { Poster } from "../../components/Poster/Poster";
import axios from "axios";

// import "./PosterList.css";

class TopRated extends Component {
  state = {
    isReady: false,
    resultMovies: {},
  };
  async componentDidMount() {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR`
      )
      .then((res) => {
        this.setState({ resultMovies: res.data, isReady: true });
      });
  }

  renderMovies = () => {
    const { buttonState, movies } = this.props;

    const renderMovie = this.state.resultMovies.results.map((movie) => {
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
            />
          </Grid.Column>
        );
      }
    });
    return renderMovie;
  };

  render() {
    const { isReady } = this.state;
    return isReady ? (
      <div>
        <h2>LES MIEUX NOTÉS</h2>
        <Container>
          <Grid columns={4} stackable>
            <Grid.Row>{this.renderMovies()}</Grid.Row>
          </Grid>
        </Container>
      </div>
    ) : (
      <div>
        <h4 style={{ textAlign: "center", fontSize: "2rem" }}>LOADING</h4>
        <div className="loader"></div>
      </div>
    );
  }
}

export { TopRated };
