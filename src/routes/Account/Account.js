import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";
import "./Account.css";
toast.configure();

const Account = ({ logout }) => {
  let history = useHistory();

  function disconnect() {
    Cookies.remove("token");
    logout("logout");
    history.push("/");
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="account-btn">
            <Link
              to="watchlist"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
                padding: "3rem",
              }}
            >
              Ma Watch List
            </Link>
          </div>
        </div>
        <div className="col-md-6 ">
          <div className="account-btn">
            <Link
              to="settings"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
                padding: "3rem",
              }}
            >
              Modifier mes informations
            </Link>
          </div>
        </div>
        <div className="col-md-6 ">
          <div className="account-btn">
            <Link
              to="search"
              style={{
                color: "inherit",
                listStyle: "none",
                textDecoration: "none",
                padding: "3rem",
              }}
            >
              Chercher un film
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="account-btn" style={{ cursor: "pointer" }}>
            <span onClick={disconnect}>Se déconnecter</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Account };
