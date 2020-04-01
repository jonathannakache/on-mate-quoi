import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class WithAuth extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false
    };
  }

  componentDidMount() {
    fetch("/checkToken")
      .then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
        this.props.userData({}, false);
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

export default WithAuth;

// export default function withAuth(ComponentToProtect) {
// return class extends Component {

// }
