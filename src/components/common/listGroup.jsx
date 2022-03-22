import React from "react";

const ListGroup = (props) => {
	// To completely decouple the ListGroup from the movie component, we dynamically call the textProperty and valueProperty whom default values is set.
	const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
		props;

	return (
		<ul className="list-group">
			{items.map((item) => (
				<li
					key={item[valueProperty]}
					onClick={() => onItemSelect(item)}
					className={
						selectedItem === item
							? "list-group-item clickable active"
							: "list-group-item clickable"
					}
				>
					{item[textProperty]}
				</li>
			))}
		</ul>
	);
};

// We set the default values for the the movie(parent)component props here so to have the ListGroup component clean when using in the parent and easily overriden by changing the value of the keys in other component
ListGroup.defaultProps = {
	valueProperty: "_id",
	textProperty: "name",
};

export default ListGroup;
