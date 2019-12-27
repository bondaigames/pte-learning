import React, { Component } from "react";
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <nav className={"navbar navbar-light navbar-expand-md " + classes.NavBar}>
        <div className="container">
          <Link to="/" className={classes.NavBarBrand + " navbar-brand"}>
            PTE Learning
          </Link>
          <button
            data-toggle="collapse"
            data-target="#navcol-1"
            className="navbar-toggler"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={"collapse navbar-collapse " + classes.NavCol}
            id="navcol-1"
          >
            <ul
              className={
                "nav navbar-nav text-uppercase ml-auto " + classes.NavBarNav
              }
            >
              <li role="presentation" className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li role="presentation" className="nav-item">
                <Link to="/service" className="nav-link active">
                  Study Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
