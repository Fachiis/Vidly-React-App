import React from "react";
import propTypes from "prop-types";

// Interface of this common like component:
// Input: liked => boolean
// Output: onClick

const Like = (props) => {
	let classes = "fa fa-heart";
	classes += !props.liked ? "-o" : "";
	return (
		<i
			onClick={props.onLikeToggle}
			style={{ cursor: "pointer" }}
			className={classes}
		></i>
	);
};

// Type Checking with propTypes is very important especially when using reusable components.
Like.propTypes = {
	liked: propTypes.bool,
	onLikeToggle: propTypes.func.isRequired,
};

export default Like;
