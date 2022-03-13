import React from "react";

const ListGroup = (props) => {
	// To completely decouple the ListGroup from the movie component, we dynamically call the textProperty and valueProperty whoms default values is set.
	const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
		props;

	return (
		<ul className="list-group">
			{/* <li className="list-group-item active" style={{ cursor: "pointer" }}>
				All Genres
			</li> */}
			{items.map((item) => (
				<li
					key={item[valueProperty]}
					onClick={() => onItemSelect(item)}
					className={
						selectedItem === item ? "list-group-item active" : "list-group-item"
					}
					style={{ cursor: "pointer" }}
				>
					{item[textProperty]}
				</li>
			))}
		</ul>
	);
};

// We set the default values for the the movie(parent)component props here so to have the ListGroup component clean when using in the parent and easily overriden by changing the value of the keys in other component
ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};

export default ListGroup;
