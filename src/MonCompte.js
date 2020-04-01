import React, { Component } from "react";
import { Header, HeaderImg, Footer } from "./components";

export default class MonCompte extends Component {
  constructor() {
    super();
    this.state = {
      dataUser: {},
      isReady: false
    };
  }

  async componentDidMount() {
    await fetch("/api/getData")
      .then(res => res.text())
      .then(res => {
        this.setState({
          isReady: true,
          dataUser: JSON.parse(res)
        });
      });
  }

  render() {
    return this.state.isReady ? (
      <div className="app">
        <h1>Secret</h1>
        <h1>Secret</h1>
        <h1>Secret</h1>
        <p>{this.state.dataUser.firstname}</p>
        <p>{this.state.dataUser.lastname}</p>
        <p>{this.state.dataUser.email}</p>
      </div>
    ) : (
      <div className="app">
        <h1>Secret</h1>
        <h1>Secret</h1>
        <h1 style={{ textAlign: "center" }}>LOADING</h1>
      </div>
    );
  }
}
