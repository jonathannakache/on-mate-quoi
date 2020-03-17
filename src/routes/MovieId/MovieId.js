import React, { Component } from "react";
import "./MovieId.css";
import { Footer } from "../../components";

class MovieId extends Component {
  a = () => {
    return (
      <div className=" container">
        <div class="search-movie movie-id row">
          <div class="col-3">
            <figure>
              <img
                src="http://lorempixel.com/210/360/"
                className="movie-id-img"
                alt=""
              />
            </figure>
          </div>
          <div class="col-9">
            <h3>Titre du fim</h3>
            <p>Realisateur</p>
            <p>Duree</p>
            <p>Acteurs</p>
            <p>Categories</p>
            <p>
              SYNOPSIS : Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Eligendi, minima. Quia animi fugit eveniet optio dolorum
              temporibus quos possimus, neque dolorem cum quaerat numquam
              pariatur cupiditate distinctio architecto recusandae quod.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-3"></div>
          <div class="add-to-watchlist col-6">
            <a href="#">Ajouter a ma Watchlist</a>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="bg">
        {this.a()}

        <Footer />
      </div>

      // <div className="container">
      //     <h3 className="text-center mb-5">COMMENTAIRES</h3>
      //     <form action="POST" className="row d-flex justify-content-around">
      //             <div class="col-3">Poster</div>
      //             <textarea className="col-7" name="avis" id="avis" cols="30" rows="4" placeholder="Donne ton avis sur ce film"></textarea>
      //             <input className="col-3" type="submit" name="avis" id="avis" placeholder="Poster" />
      //         </form>
      // </div>
    );
  }
}

export { MovieId };
