import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";

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

	doSubmit = () => {
		// Make the call to the server to login a user
		console.log("submitted");
	};

	render() {
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
