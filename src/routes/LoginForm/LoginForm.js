import React, { Component } from "react";
import { Header as Head } from "../../components/index";
import { Redirect, Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import "./LoginForm.css";
// import Cookies from "js-cookie";
// import { auth } from "../../App";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    connected: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.text())
      .then(res => {
        const data = JSON.parse(res);
        if (data.status === 200) {
          this.props.userData(data.user, true);
          this.setState({
            connected: true
          });
          // this.props.history.push("/");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err, "catch");
        alert("Email ou mot de passe incorrect");
      });
    this.setState({
      email: "",
      password: ""
    });
  };

  render() {
    return this.props.isAuth ? (
      <Redirect to="/" />
    ) : (
      <div className="app">
        {/* <Head badge={5} /> */}
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" className="colorr">
              {this.state.connected
                ? "Connected"
                : " Connectes toi a ton compte"}
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
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

                <Button className="bgColor" type="submit" fluid size="large">
                  Se connecter
                </Button>
              </Segment>
            </Form>
            <Message>
              Pas encore inscrit ? <Link to="/register">Inscris toi</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// const LoginForm = () => (
//   <div className="app">
//     <Head badge={5} />
//     <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
//       <Grid.Column style={{ maxWidth: 450 }}>
//         <Header as="h2" className="colorr">
//           Connectes toi a ton compte
//         </Header>
//         <Form size="large">
//           <Segment stacked>
//             <Form.Input
//               fluid
//               icon="user"
//               iconPosition="left"
//               placeholder="E-mail address"
//             />
//             <Form.Input
//               fluid
//               icon="lock"
//               iconPosition="left"
//               placeholder="Password"
//               type="password"
//             />

//             <Button className="bgColor" fluid size="large">
//               Se connecter
//             </Button>
//           </Segment>
//         </Form>
//         <Message>
//           Pas encore inscrit ? <a href="#">Inscris toi</a>
//         </Message>
//       </Grid.Column>
//     </Grid>
//   </div>
// );

export { LoginForm };

// import React, { Component } from "react";
// import { Header as Head } from "../../components/index";
// import { Redirect, Link } from "react-router-dom";
// import {
//   Button,
//   Form,
//   Grid,
//   Header,
//   Message,
//   Segment
// } from "semantic-ui-react";
// import "./LoginForm.css";
// // import Cookies from "js-cookie";
// import { auth } from "../../App";

// class LoginForm extends Component {
//   state = {
//     email: "",
//     password: "",
//     connected: false
//   };

//   handleChange = event => {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   };
//   // disconnect = event => {
//   //   console.log(Cookies.get("token"), "token");
//   //   this.props.userData({});
//   //   auth.isAuth = false;
//   //   Cookies.remove("token");
//   //   console.log(Cookies.get("token"), "token");
//   // };

//   handleSubmit = event => {
//     event.preventDefault();
//     fetch("/api/authenticate", {
//       method: "POST",
//       body: JSON.stringify(this.state),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//       .then(res => res.text())
//       .then(res => {
//         const data = JSON.parse(res);
//         console.log(data.status);
//         if (data.status === 200) {
//           this.props.userData(data.user, true);
//           this.setState({
//             connected: true
//           });
//           // this.props.history.push("/");
//         } else {
//           // auth.isAuth = false;
//           const error = new Error(res.error);
//           throw error;
//         }
//       })
//       .catch(err => {
//         console.error(err, "catch");
//         alert("Email ou mot de passe incorrect");
//       });
//     this.setState({
//       email: "",
//       password: ""
//     });
//   };

//   render() {
//     console.log(auth.isAuth, "Auth");

//     return auth.isAuth ? (
//       <Redirect to="/" />
//     ) : (
//       <div className="app">
//         <Head badge={5} />
//         <Grid
//           textAlign="center"
//           style={{ height: "100vh" }}
//           verticalAlign="middle"
//         >
//           <Grid.Column style={{ maxWidth: 450 }}>
//             <Header as="h2" className="colorr">
//               {this.state.connected
//                 ? "Connected"
//                 : " Connectes toi a ton compte"}
//             </Header>
//             <Form size="large" onSubmit={this.handleSubmit}>
//               <Segment stacked>
//                 <Form.Input
//                   fluid
//                   icon="user"
//                   iconPosition="left"
//                   placeholder="E-mail address"
//                   name="email"
//                   id="email"
//                   value={this.state.email}
//                   onChange={this.handleChange}
//                 />
//                 <Form.Input
//                   fluid
//                   icon="lock"
//                   iconPosition="left"
//                   placeholder="Password"
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={this.state.password}
//                   onChange={this.handleChange}
//                 />

//                 <Button className="bgColor" type="submit" fluid size="large">
//                   Se connecter
//                 </Button>
//               </Segment>
//             </Form>
//             <Message>
//               Pas encore inscrit ? <Link to="/register">Inscris toi</Link>
//             </Message>
//           </Grid.Column>
//         </Grid>
//       </div>
//     );
//   }
// }

// // const LoginForm = () => (
// //   <div className="app">
// //     <Head badge={5} />
// //     <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
// //       <Grid.Column style={{ maxWidth: 450 }}>
// //         <Header as="h2" className="colorr">
// //           Connectes toi a ton compte
// //         </Header>
// //         <Form size="large">
// //           <Segment stacked>
// //             <Form.Input
// //               fluid
// //               icon="user"
// //               iconPosition="left"
// //               placeholder="E-mail address"
// //             />
// //             <Form.Input
// //               fluid
// //               icon="lock"
// //               iconPosition="left"
// //               placeholder="Password"
// //               type="password"
// //             />

// //             <Button className="bgColor" fluid size="large">
// //               Se connecter
// //             </Button>
// //           </Segment>
// //         </Form>
// //         <Message>
// //           Pas encore inscrit ? <a href="#">Inscris toi</a>
// //         </Message>
// //       </Grid.Column>
// //     </Grid>
// //   </div>
// // );

// export { LoginForm };
