import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import "./LoginForm.css";

const LoginForm = () => (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" className="colorr">
        Connectes toi a ton compte
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />

          <Button className="bgColor" fluid size="large">
            Se connecter
          </Button>
        </Segment>
      </Form>
      <Message>
        Pas encore inscrit ? <a href="#">Inscris toi</a>
      </Message>
    </Grid.Column>
  </Grid>
);

export { LoginForm };
