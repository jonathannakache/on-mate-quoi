import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import ButtonMovie from "../ButtonMovie/ButtonMovie";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Poster extends Component {
  render() {
    const { image, title, releaseDate, id, movies, buttonState } = this.props;
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
        <ButtonMovie id={id} movies={movies} buttonState={buttonState} />
      </>
    );
  }
}

export { Poster };
