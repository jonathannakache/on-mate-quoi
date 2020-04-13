import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import { Poster } from "../../components/Poster/Poster";
import axios from "axios";

class TopRated extends Component {
  state = {
    isReady: false,
    resultMovies: {},
  };
  // async componentDidMount() {
  //   await axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/top_rated?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR`
  //     )
  //     .then((res) => {
  //       this.setState({ resultMovies: res.data, isReady: true });
  //     });
  // }
  async componentDidMount() {
    await axios
      .all([
        await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&page=1`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&page=2`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&page=3`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=9356fe45f1a3414d6abef47c00824a9e&language=fr-FR&page=4`
        ),
      ])

      .then(
        axios.spread((page1, page2, page3, page4) => {
          const allPages = [page1.data, page2.data, page3.data, page4.data];
          this.setState({ resultMovies: allPages, isReady: true });
        })
      );
  }

  renderMovies = () => {
    const { buttonState, movies } = this.props;

    const render = this.state.resultMovies.map((page) => {
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
        <p className="loading">CHARGEMENT</p>
        <div className="loader"></div>
      </div>
    );
  }
}

export { TopRated };
