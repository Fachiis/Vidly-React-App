import React, { Component } from "react";

import Like from "./common/like";

class MoviesTable extends Component {
	raiseSort = (column) => {
		const sortColumn = { ...this.props.sortColumn };

		if (sortColumn.column === column) {
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
		} else {
			sortColumn.column = column;
			sortColumn.order = "asc";
		}
		this.props.onSort(sortColumn);
	};

	render() {
		const { movies, onLike, onDelete } = this.props;

		return (
			<table className="table">
				<thead>
					<tr>
						<th scope="col" onClick={() => this.raiseSort("title")}>
							Title
						</th>
						<th scope="col" onClick={() => this.raiseSort("genre.name")}>
							Genre
						</th>
						<th scope="col" onClick={() => this.raiseSort("numberInStock")}>
							Stock
						</th>
						<th scope="col" onClick={() => this.raiseSort("dailyRentalRate")}>
							Rate
						</th>
						<th scope="col"></th>
						<th scope="col"></th>
					</tr>
				</thead>

				<tbody>
					{movies.map((movie) => (
						<tr key={movie._id}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like liked={movie.liked} onLikeToggle={() => onLike(movie)} />
							</td>
							<td>
								<button
									onClick={() => onDelete(movie._id)}
									className="btn btn-danger
                    btn-sm m-2"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default MoviesTable;
