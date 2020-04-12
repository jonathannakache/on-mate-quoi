import React, { Component } from "react";
import { Header as Head } from "../../components/index";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import "../LoginForm/LoginForm.css";

class Register extends Component {
  state = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    redirect: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            redirect: true,
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
      });
    this.setState({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="app">
        <Head badge={5} />
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" className="colorr">
              Cree toi un compte
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Prénom"
                  name="firstname"
                  id="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Nom"
                  name="lastname"
                  id="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Téléphone"
                  name="phone"
                  id="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />

                <Button className="bgColor" type="submit" fluid size="large">
                  Creer un compte
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export { Register };
