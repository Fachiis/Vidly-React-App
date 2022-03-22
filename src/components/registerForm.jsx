import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";

class RegisterForm extends Form {
	state = {
		data: {
			username: "",
			password: "",
			name: "",
		},
		errors: {},
	};

	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Password"),
		name: Joi.string().required().label("Name"),
	};

    doSubmit = () => {
        // Make the call to the server to register a user
        console.log("submitted")
    }

	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
			</div>
		);
	}
}

export default RegisterForm;
