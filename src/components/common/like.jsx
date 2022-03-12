import React from "react";

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

export default Like;
