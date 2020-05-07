import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Home extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
	};
	
	render() {
		const { user } = this.props.auth;
		
		return (
      <div>
        <div>
          <div>
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p>
                You are logged into our project!
              </p>
							<p>
								Here is the Home page
              </p>
            </h4>
            <button onClick={this.onLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);