// import React, { Component } from "react";
// import { Card, Image } from "semantic-ui-react";
// import ButtonMovie from "../ButtonMovie/ButtonMovie";
// import { Link } from "react-router-dom";

// class Poster extends Component {
//   render() {
//     const { image, title, releaseDate, id, movies, buttonState } = this.props;
//     return (
//       <>
//         <Link to={`/movie/${id}`}>
//           <Card>
//             <Image
//               src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${image}`}
//               wrapped
//               ui={false}
//             />
//             <Card.Content>
//               <h6>{title}</h6>
//               <Card.Meta>
//                 <span className="date">{releaseDate}</span>
//               </Card.Meta>
//             </Card.Content>
//           </Card>
//         </Link>
//         <ButtonMovie id={id} movies={movies} buttonState={buttonState} />
//       </>
//     );
//   }
// }

// export { Poster };

import React, { Component } from "react";
import { Card, Image, GridColumn } from "semantic-ui-react";
import ButtonMovie from "../ButtonMovie/ButtonMovie";
import { Link } from "react-router-dom";
import "./Poster.css";
class Poster extends Component {
  render() {
    const { image, title, releaseDate, id, movies, buttonState } = this.props;
    return (
      //   <>
      //   <Link to={`/movie/${id}`}>
      //     <Card>
      //       <Image
      //         src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${image}`}
      //         wrapped
      //         ui={false}
      //       />
      //       <Card.Content>
      //         <Card.Header>{title}</Card.Header>
      //         <Card.Meta>
      //           <span className="date">{releaseDate}</span>
      //         </Card.Meta>
      //       </Card.Content>
      //     </Card>
      //   </Link>
      //   <ButtonMovie id={id} movies={movies} buttonState={buttonState} />
      // </>
      <>
        <div className="poster-img">
          <Link to={`/movie/${id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${image}`}
              className="card"
            />
          </Link>
          <div className="children">
            <ButtonMovie id={id} movies={movies} buttonState={buttonState} />
          </div>
        </div>
        <h6>{title}</h6>
      </>
    );
  }
}

export { Poster };
