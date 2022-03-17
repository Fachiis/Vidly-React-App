import React from "react";
import propTypes from "prop-types";

// Interface of this common like component:
// Input: liked => boolean
// Output: onClick

const Like = (props) => {
	const { liked, onLikeToggle } = props;

	let classes = "fa fa-heart";
	classes += !liked ? "-o" : "";

	return <i onClick={onLikeToggle} className={`${classes} + clickable`}></i>;
};

// Type Checking with propTypes is very important especially when using reusable components.
Like.propTypes = {
	liked: propTypes.bool,
	onLikeToggle: propTypes.func.isRequired,
};

export default Like;
