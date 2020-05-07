import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <nav>
        {!this.props.auth.isAuthenticated ? (
          <div id="nav_1">
            (navbar before login) [icon] &nbsp;
            <Link to="/">Landing Page</Link> &nbsp;
          </div>
        ) : (
          <div id="nav_2">
            (navbar after login) [icon] &nbsp;
            <Link to="/home">Home</Link> &nbsp;
            <Link to="/favusers">Favourite Users</Link> &nbsp;
            <Link to="/chatroom">Chatroom</Link> &nbsp;
            <Link to="/myprofile">My Profile({user.name.split(" ")[0]})</Link>&nbsp;
            <Link to="/">
              <span onClick={this.onLogoutClick}>Logout</span>
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
