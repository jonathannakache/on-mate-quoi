import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Redirect } from "react-router-dom";
import "./UserSettings.css";
import React, { Component } from "react";

toast.configure();

class UserSettings extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      isReady: false,
      newUser: {},
      redirect: false,
    };
  }
  async componentDidMount() {
    await fetch("/api/getData")
      .then((res) => res.text())
      .then((res) => {
        if (res === "Unauthorized") {
          this.props.logout();
          this.setState({ redirect: true });
        } else {
          this.setState({
            userData: JSON.parse(res),
            newUser: JSON.parse(res),
            isReady: true,
          });
        }
      });
  }

  deleteAccount = async () => {
    const email = { email: this.state.newUser.email };
    await fetch("/api/delete-account", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        this.userDeleted();
        this.props.logout();
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  userDeleted = () => {
    toast.success(`Le compte a bien été supprimé`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  userIsReplaced = () => {
    toast.success(`Les informations on étaient mise a jour 😉`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const userData = this.state.newUser;

    await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ userData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.error(err, "CATCH");
      });
    this.userIsReplaced();
    window.location.reload(false);
  };
  handleChange = (event) => {
    event.persist();
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        [event.target.name]: event.target.value,
      },
    }));
  };
  render() {
    const { userData, redirect, newUser } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return this.state.isReady ? (
      <div>
        <div className="back-btn">
          <Link
            to="/account"
            style={{
              color: "inherit",
              listStyle: "none",
              textDecoration: "none",
            }}
          >
            Retour
          </Link>
        </div>
        <div className="container user-settings">
          <span>Hello </span>{" "}
          <span className="color">{`${userData.firstname} ${userData.lastname}`}</span>
          <h4>MES INFORMATIONS</h4>
          <form onSubmit={this.handleSubmit} className="user-settings-form">
            <div className="p-3 row">
              <label className="col-2">Prénom : </label>
              <input
                className="col-10"
                type="text"
                name="firstname"
                id="firstname"
                onChange={this.handleChange}
                value={newUser.firstname}
                autoComplete="off"
              />
            </div>
            <div className="p-3 row">
              <label className="col-2">Nom :</label>
              <input
                className="col-10"
                type="text"
                name="lastname"
                id="lastname"
                onChange={this.handleChange}
                value={newUser.lastname}
                autoComplete="off"
              />
            </div>
            <div className="p-3 row">
              <label className="col-2">Email :</label>
              <input
                className="col-10"
                type="text"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={newUser.email}
                autoComplete="off"
              />
            </div>
            <div className="user-settings-btns">
              <button type="submit">METTRE A JOUR LES INFORMATIONS</button>
              <div className="btn-delete" onClick={this.deleteAccount}>
                SUPPRIMER MON COMPTE
              </div>
            </div>
          </form>
        </div>
      </div>
    ) : (
      <div>
        <div className="back-btn">
          <Link
            to="/account"
            style={{
              color: "inherit",
              listStyle: "none",
              textDecoration: "none",
            }}
          >
            Retour
          </Link>
        </div>
        <p className="loading">CHARGEMENT</p>
        <div className="loader"></div>
      </div>
    );
  }
}

export { UserSettings };
