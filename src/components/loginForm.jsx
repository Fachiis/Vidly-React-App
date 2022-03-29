import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
	state = {
		data: {
			username: "",
			password: "",
		},
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	// Usage of refs to work directly with DOM element but should be done at a minimum
	// Example, focus on username input field
	// username = React.createRef();

	// Management of focus, Note: this can be achieved with autoFocus directly in the input field. Use the lifecycle hook componentDidMount method, so the focus is brought immediately the LoginForm is rendered
	// componentDidMount() {
	// 	this.username.current.focus();
	// }

	doSubmit = async () => {
		// Make the call to the server to login a user
		try {
			const { data } = this.state;
			await auth.login(data.username, data.password);
			// Redirect to the home page
			const { state } = this.props.location;
			window.location = state ? state.from.pathname : "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderButton("Login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;
