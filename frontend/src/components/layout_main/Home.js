import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <h1>Home</h1>
        <h4>
          <b>Hey there,</b> {user.name.split(" ")[0]}
          {this.props.auth.isAuthenticated}
          <p>You are logged into our project!</p>
        </h4>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
