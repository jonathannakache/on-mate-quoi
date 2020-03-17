import "./ButtonMovie.css";
import React, { Component } from "react";

class ButtonMovie extends Component {
  render() {
    const { alreadySeen, addWatchlist, isAddWatchlist, isWatch } = this.props;

    return (
      <div>
        <div className="row btns-movie-found">
          <div className="col-6">
            {!isAddWatchlist ? (
              <div className="add-to-watchlist" onClick={addWatchlist}>
                Ajouter
              </div>
            ) : (
              <div className="add-to-watchlist" onClick={addWatchlist}>
                Supprimer
              </div>
            )}
          </div>
          <div className="col-6">
            {!isWatch ? (
              <div className="already-watch" onClick={alreadySeen}>
                Deja Vu
              </div>
            ) : (
              <div className="already-watch" onClick={alreadySeen}>
                pas encore
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ButtonMovie;
