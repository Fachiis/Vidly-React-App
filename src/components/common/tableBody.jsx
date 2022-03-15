import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
	renderCell = (item, column) => {
		if (column.content) return column.content(item);

		return _.get(item, column.path);
	};

	createKey(column) {
		return column.path || column.key;
	}

	render() {
		const { data, columns, valueProperty } = this.props;

		return (
			<tbody>
				{data.map((item) => (
					<tr key={item[valueProperty]}>
						{columns.map((column) => (
							<td key={this.createKey(column)}>
								{this.renderCell(item, column)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		);
	}
}

TableBody.defaultProps = {
	valueProperty: "_id",
};

export default TableBody;
