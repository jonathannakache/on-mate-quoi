import React, { Component } from "react";

const genres = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Aventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comédie"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentaire"
  },
  {
    id: 18,
    name: "Drame"
  },
  {
    id: 10751,
    name: "Familial"
  },
  {
    id: 14,
    name: "Fantastique"
  },
  {
    id: 36,
    name: "Histoire"
  },
  {
    id: 27,
    name: "Horreur"
  },
  {
    id: 10402,
    name: "Musique"
  },
  {
    id: 9648,
    name: "Mystère"
  },
  {
    id: 10749,
    name: "Romance"
  },
  {
    id: 878,
    name: "Science-Fiction"
  },
  {
    id: 10770,
    name: "Téléfilm"
  },
  {
    id: 53,
    name: "Thriller"
  },
  {
    id: 10752,
    name: "Guerre"
  },
  {
    id: 37,
    name: "Western"
  }
];

class FormSearchMovie extends Component {
  state = {
    genre: []
  };

  handleSubmit = event => {
    event.preventDefault();
    const genreSeparate = this.state.genre.join(",");
    this.props.categories(genreSeparate);
    this.setState({ genre: [] });
  };

  handleChange = event => {
    const isInclude = this.state.genre.includes(event.target.value);
    if (isInclude) {
      this.setState({
        genre: this.state.genre.filter(item => item !== event.target.value)
      });
    } else {
      this.setState({
        genre: [...this.state.genre, event.target.id]
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-check">
          {genres.map(genre => {
            return (
              <input
                className="btn btn-primary btn-sm"
                type="button"
                key={genre.id}
                name={genre.id}
                id={genre.id}
                value={genre.name}
                onClick={this.handleChange}
              />
            );
          })}
        </div>

        <button type="submit" onSubmit={this.handleSubmit}>
          Chercher
        </button>
      </form>
    );
  }
}

export { FormSearchMovie };
