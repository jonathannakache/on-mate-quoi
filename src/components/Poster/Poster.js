import React from "react";
import { Card, Image } from "semantic-ui-react";
// import { Grid, Container, Segment } from "semantic-ui-react";

const Poster = ({
  title,
  releaseDate,
  note,
  langueOriginal,
  image,
  synopsis
}) => {
  return (
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
  );
};

export default Poster;
