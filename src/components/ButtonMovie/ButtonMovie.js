import "./ButtonMovie.css";
import React, { Component } from "react";

class ButtonMovie extends Component {
    


  render() {
    const { alreadySeen, movies,wishList, id, addWatchlist } = this.props;

    return (
      <div>
        <div className="row btns-movie-found">
          <div className="col-6">
            {!wishList.includes(id) ? (
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
            {!movies.includes(id) ? (
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

// export default ButtonMovie;
// const ButtonMovie = ({ id, alreadySeen, movies }) => {
//   console.log("alreadySeen", alreadySeen);

//   return (
//     <div>
//       <div className="row btns-movie-found">
//         <div className="col-6 ">
//           <a href="#">
//             <div className="add-to-watchlist">Ajouter</div>
//           </a>
//         </div>
//         <div className="col-6">
//           {!movies.movieSeen ? (
//             <div className="already-watch" onClick={alreadySeen}>
//               Deja Vu
//             </div>
//           ) : (
//             <div className="already-watch" onClick={alreadySeen}>
//               Pas Vu
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

export default ButtonMovie;
