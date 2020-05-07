import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div id="nav_1">(navbar before login) [icon]</div>

        <div id="nav_2">
          (navbar after login) [icon] &nbsp;
					<Link to="/">Landing Page</Link> &nbsp;
          <Link to="/home">Home</Link> &nbsp;
          <Link to="/">Favourite Users</Link> &nbsp;
          <Link to="/">Chatroom</Link> &nbsp;
          <Link to="/">My Profile</Link> &nbsp;
          <Link to="/">Logout</Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
