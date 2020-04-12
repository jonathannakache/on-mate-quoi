import React, { Component } from "react";
import { Header as Head } from "../../components/index";
import { Redirect, Link } from "react-router-dom";
import { isAuth as Auth } from "../../utils/isAuth";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import "./LoginForm.css";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    connected: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => {
        const data = JSON.parse(res);
        if (data.status === 200) {
          this.props.userData(data.user, true);
          this.setState({
            connected: true,
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err, "catch");
        alert("Email ou mot de passe incorrect");
      });
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return Auth.authentificated ? (
      <Redirect to="/" />
    ) : (
      <div style={{ height: "100%" }}>
        <Grid textAlign="center" className="login-form">
          <Grid.Column>
            <h4>
              {this.state.connected
                ? "Connected"
                : " Connectes toi a ton compte"}
            </h4>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Adresse Email"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Mot de passe"
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Button className="login-btn" type="submit" fluid size="large">
                  Se connecter
                </Button>
              </Segment>
            </Form>
            <Message>
              Pas encore inscrit ?{" "}
              <Link
                style={{
                  color: "#c55958",
                  listStyle: "none",
                  fontWeight: "bold",
                }}
                to="/register"
              >
                Inscris toi
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export { LoginForm };
