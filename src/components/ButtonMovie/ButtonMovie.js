// import React, { Component } from "react";
// import "./ButtonMovie.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// toast.configure();

// class ButtonMovie extends Component {
//   state = {
//     id: "",
//     isWatch: false,
//     isAddWatchlist: false,
//   };
//   componentDidMount() {
//     const movies = this.props.movies;
//     for (const movie of movies) {
//       if (movie.id === this.props.id) {
//         this.setState({
//           id: movie.id,
//           isWatch: movie.isWatch,
//           isAddWatchlist: movie.isAddWatchlist,
//         });
//       }
//     }
//   }
//   AddMovie = () => {
//     toast.success(`Le film est ajouté à ta Watch List`, {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//   };

//   removeMovie = () => {
//     toast.error("Le film a bien été retiré", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//   };

//   addWatchlist = async (movie) => {
//     await this.setState({
//       isWatch: this.state.isWatch,
//       isAddWatchlist: !this.state.isAddWatchlist,
//       id: movie,
//     });
//     this.props.buttonState({
//       isWatch: this.state.isWatch,
//       isAddWatchlist: this.state.isAddWatchlist,
//       id: movie,
//     });
//     if (this.state.isAddWatchlist) {
//       this.AddMovie();
//     } else {
//       this.removeMovie();
//     }
//   };

//   // alreadySeen = movie => {
//   //   this.setState({
//   //     isWatch: !this.state.isWatch,
//   //     isAddWatchlist: this.state.isAddWatchlist,
//   //     id: movie
//   //   });
//   //   const btnState = {
//   //     isWatch: this.state.isWatch,
//   //     isAddWatchlist: !this.state.isAddWatchlist,
//   //     id: movie
//   //   };
//   //   this.props.buttonState(btnState);
//   // };
//   render() {
//     const { id } = this.props;
//     const { isAddWatchlist } = this.state;

//     return (
//       <div>
//         <div className="row btns-movie-found">
//           <div className="col-12">
//             <div
//               className={!isAddWatchlist ? "add-to-watchlist" : "already-watch"}
//               onClick={() => this.addWatchlist(id)}
//             >
//               {!isAddWatchlist
//                 ? "Ajouter à la Watch List"
//                 : "Supprimer de la Watch List"}
//             </div>
//           </div>
//           {/* <div className="col-6">
//             <div className="already-watch" onClick={alreadySeen}>
//               {!isWatch ? "Deja vu " : "Pas Vu"}
//             </div>
//           </div> */}
//         </div>
//       </div>
//     );
//   }
// }

// export default ButtonMovie;

import React, { Component } from "react";
import "./ButtonMovie.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FontAwesome from "react-fontawesome";

toast.configure();

class ButtonMovie extends Component {
  state = {
    id: "",
    isWatch: false,
    isAddWatchlist: false,
  };
  componentDidMount() {
    const movies = this.props.movies;
    for (const movie of movies) {
      if (movie.id === this.props.id) {
        this.setState({
          id: movie.id,
          isWatch: movie.isWatch,
          isAddWatchlist: movie.isAddWatchlist,
        });
      }
    }
  }
  AddMovie = () => {
    toast.success(`Le film est ajouté à ta Watch List`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  removeMovie = () => {
    toast.error("Le film a bien été retiré", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  addWatchlist = async (movie) => {
    await this.setState({
      isWatch: this.state.isWatch,
      isAddWatchlist: !this.state.isAddWatchlist,
      id: movie,
    });
    this.props.buttonState({
      isWatch: this.state.isWatch,
      isAddWatchlist: this.state.isAddWatchlist,
      id: movie,
    });
    if (this.state.isAddWatchlist) {
      this.AddMovie();
    } else {
      this.removeMovie();
    }
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
      <div
        className={
          !isAddWatchlist ? " far fa-heart" : " fas fa-heart"
        }
        onClick={() => this.addWatchlist(id)}
        // className="children"
      >
        {/* {!isAddWatchlist ? "Y" : "X"} */}
        {/* </div> */}
        {/* <div> */}

        {/* <div className="col-6">
            <div className="already-watch" onClick={alreadySeen}>
              {!isWatch ? "Deja vu " : "Pas Vu"}
            </div>
          </div> */}
        {/* <FontAwesome
              className="already-watch fas fa-heart"
              onClick={() => this.addWatchlist(id)}
            /> */}
      </div>
    );
  }
}

export default ButtonMovie;
