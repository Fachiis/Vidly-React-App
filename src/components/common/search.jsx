import React from "react";

const Search = ({ value, onChange }) => {
	return (
		<input
			name="query"
			value={value}
			onChange={onChange}
			className="form-control my-3"
			placeholder="Search..."
		/>
	);
};

export default Search;
