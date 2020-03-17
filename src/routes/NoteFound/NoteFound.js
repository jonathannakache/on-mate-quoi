import React from "react";
import "./NotFound.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const NotFound = () => {
  return (
    <body className="bg-purple">
      <div className="stars">
        <div className="central-body">
          <img className="image-404" src={require("../../img/404-error.png")} />
          <Link to="/" className="btn-go-home">
            Acceuil
          </Link>
        </div>
        <div className="objects">
          <img
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
          />
          <div className="earth-moon">
            <img
              className="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
            />
            <img
              className="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
            />
          </div>
          <div className="box_astronaut">
            <img
              className="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </body>
  );
};

export { NotFound };