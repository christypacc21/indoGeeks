import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Home page</h1>
        <Link to="/register">Register</Link> &nbsp;
        <Link to="/login">Log In</Link>
      </div>
    );
  }
}

export default Landing;
