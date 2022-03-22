import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./input";
import Select from "./select";

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	// Validation implementation using Joi Library on the whole form when submit
	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	// Validation on change using Joi on the user input element when typing
	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };

		const { error } = Joi.validate(obj, schema);
		if (!error) return null;
		return error.details[0].message;
	};

	// Method to handle the event of submission of a form
	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	//  Method to handle the event of writing to a form
	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };

		const errorMessage = this.validateProperty(input);
		if (errors) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
	};

	// Helper render method for Input component
	renderInput = (name, label, type = "text") => {
		const { data, errors } = this.state;

		return (
			<Input
				type={type}
				name={name}
				label={label}
				value={data[name]}
				onChange={this.handleChange}
				errors={errors[name]}
			/>
		);
	};

	// Helper render method for select
	renderSelect = (name, label, options) => {
		const { data, errors } = this.state;
		return (
			<Select
				name={name}
				label={label}
				value={data[name]}
				options={options}
				onChange={this.handleChange}
				errors={errors[name]}
			/>
		);
	};

	// Helper render method for button
	renderButton = (label) => {
		// {
		// 	/* Disable the login button unless the validate method passes */
		// }
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	};
}

export default Form;
