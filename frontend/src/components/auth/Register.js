import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
	}

	componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

	componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
	}
	
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
	};
	
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
		};
		console.log(newUser);
		this.props.registerUser(newUser, this.props.history); 
	};
	
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Link to="/">Back to Landing Page</Link>

        <div>
          <h4>
            <b>Register</b> below
          </h4>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>

        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
							type="email"
            />
            <label htmlFor="email">Email</label>
						<span className="red-text">{errors.email}</span>
          </div>

          <div>
            <input
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
							type="text"
            />
            <label htmlFor="name">Display Name</label>
						<span className="red-text">{errors.name}</span>
          </div>

          <div>
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
							type="password"
            />
            <label htmlFor="password">Password (6-30 character)</label>
						<span className="red-text">{errors.password}</span>
          </div>

          <div>
            <input
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
							type="password"
            />
            <label htmlFor="password2">Confirm Password</label>
						<span className="red-text">{errors.password2}</span>
          </div>

          <div>
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
