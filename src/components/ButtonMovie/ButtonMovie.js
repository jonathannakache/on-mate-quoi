import React, { Component } from "react";
import "./ButtonMovie.css";

class ButtonMovie extends Component {
  state = {
    id: "",
    isWatch: false,
    isAddWatchlist: false
  };
  componentDidMount() {
    const test = this.props.movies;
    for (const film of test) {
      if (film.id === this.props.id)
        this.setState({
          id: film.id,
          isWatch: film.isWatch,
          isAddWatchlist: film.isAddWatchlist
        });
    }
  }

  addWatchlist = async movie => {
    await this.setState({
      isWatch: this.state.isWatch,
      isAddWatchlist: !this.state.isAddWatchlist,
      id: movie
    });
    this.props.buttonState({
      isWatch: this.state.isWatch,
      isAddWatchlist: !this.state.isAddWatchlist,
      id: movie
    });
  };

  // alreadySeen = movie => {
  //   this.setState({
  //     isWatch: !this.state.isWatch,
  //     isAddWatchlist: this.state.isAddWatchlist,
  //     id: movie
  //   });
  //   const btnState = {
  //     isWatch: this.state.isWatch,
  //     isAddWatchlist: !this.state.isAddWatchlist,
  //     id: movie
  //   };
  //   this.props.buttonState(btnState);
  // };
  render() {
    const { id } = this.props;
    const { isAddWatchlist } = this.state;

    return (
      <div>
        <div className="row btns-movie-found">
          <div className="col-12">
            <div
              className={!isAddWatchlist ? "already-watch" : "add-to-watchlist"}
              onClick={() => this.addWatchlist(id)}
            >
              {!isAddWatchlist
                ? "Ajouter a la Watchlist"
                : "Supprimer de la Watchlist"}
            </div>
          </div>
          {/* <div className="col-6">
            <div className="already-watch" onClick={alreadySeen}>
              {!isWatch ? "Deja vu " : "Pas Vu"}
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default ButtonMovie;
