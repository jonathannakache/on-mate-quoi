import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class AuthService extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
    };
  }

  componentDidMount() {
    fetch("/checkToken").then((res) => {
      if (res.status === 200) {
        this.setState({ loading: false });
      } else {
        this.props.logout();
        this.setState({ loading: false, redirect: true });
      }
    });
  }

  render() {
    const { loading, redirect } = this.state;

    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return <this.props.child {...this.props} />;
  }
}

export default AuthService;
