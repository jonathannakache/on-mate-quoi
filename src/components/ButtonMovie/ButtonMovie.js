import React, { Component } from "react";
import "./ButtonMovie.css";

class ButtonMovie extends Component {
  render() {
    const { alreadySeen, addWatchlist, isAddWatchlist, isWatch } = this.props;

    return (
      <div>
        <div className="row btns-movie-found">
          <div className="col-6">
            <div className="add-to-watchlist" onClick={addWatchlist}>
              {!isAddWatchlist ? "Ajouter" : "Supprimer"}
            </div>
          </div>
          <div className="col-6">
            <div className="already-watch" onClick={alreadySeen}>
              {!isWatch ? "Deja vu " : "Pas Vu"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ButtonMovie;
