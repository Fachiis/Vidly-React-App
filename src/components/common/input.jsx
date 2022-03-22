import React from "react";

const Input = ({ name, label, errors, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input id={name} name={name} {...rest} className="form-control" />
			{errors && <div className="alert alert-danger">{errors}</div>}
		</div>
	);
};

export default Input;
