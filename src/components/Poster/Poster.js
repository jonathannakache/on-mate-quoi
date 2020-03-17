import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import ButtonMovie from "../ButtonMovie/ButtonMovie";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Poster extends Component {
  state = {
    id: "",
    isWatch: false,
    isAddWatchlist: false
  };

  addWatchlist = movie => {
    this.setState({
      isWatch: this.state.isWatch,
      isAddWatchlist: !this.state.isAddWatchlist,
      id: movie
    });
    const btnState = {
      isWatch: this.state.isWatch,
      isAddWatchlist: !this.state.isAddWatchlist,
      id: movie
    };
    this.props.buttonState(btnState);
  };

  alreadySeen = movie => {
    this.setState({
      isWatch: !this.state.isWatch,
      isAddWatchlist: this.state.isAddWatchlist,
      id: movie
    });
    const btnState = {
      isWatch: this.state.isWatch,
      isAddWatchlist: !this.state.isAddWatchlist,
      id: movie
    };
    this.props.buttonState(btnState);
    console.log('ssss');
    
    // setTimeout(() => {
    //   this.props.buttonState(this.state);
    // }, 1000);
  };

  render() {
    const { image, title, releaseDate, id } = this.props;
    const { isWatch, isAddWatchlist } = this.state;
    return (
      <>
        <Link to={`/movie/${id}`}>
          <Card>
            <Image
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${image}`}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>{title}</Card.Header>
              <Card.Meta>
                <span className="date">{releaseDate}</span>
              </Card.Meta>
            </Card.Content>
          </Card>
        </Link>
        <ButtonMovie
          isWatch={isWatch}
          isAddWatchlist={isAddWatchlist}
          addWatchlist={() => this.addWatchlist(id)}
          alreadySeen={() => this.alreadySeen(id)}
        />
      </>
    );
  }
}

export default Poster;
// const Poster = ({
//   title,
//   releaseDate,
//   note,
//   langueOriginal,
//   image,
//   synopsis
// }) => {
//   return (
//     <>
//       <Card>
//         <Image
//           src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${image}`}
//           wrapped
//           ui={false}
//         />
//         <Card.Content>
//           <Card.Header>{title}</Card.Header>
//           <Card.Meta>
//             <span className="date">{releaseDate}</span>
//           </Card.Meta>
//         </Card.Content>
//       </Card>
//       <ButtonMovie
//         // id={movie.id}
//         // wishList={wishList.map(movie => movie.name)}
//         // addWatchlist={() => addWatchlist(movie.id)}
//         // movies={movies.map(movie => movie.name)}
//         // alreadySeen={() => alreadySeen(movie.id)}
//       />
//     </>
//   );
// };

// export default Poster;
