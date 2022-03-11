import React, { Component } from "react";

// Interface of this common like component:
// Input: liked => boolean
// Output: onClick

class Like extends Component {
	render() {
		return (
			<i
				onClick={this.props.onClick}
				style={{ cursor: "pointer" }}
				className={this.getClasses()}
			></i>
		);
	}

	getClasses() {
		let classes = "fa fa-heart";
		classes += !this.props.liked ? "-o" : "";
		return classes;
	}
}

export default Like;
