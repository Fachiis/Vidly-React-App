import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
	state = {
		movies: getMovies(),
		pageSize: 4,
		currentPage: 1,
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handleDelete = (id) => {
		const movies = this.state.movies.filter((movie) => movie._id !== id);
		return this.setState({
			movies,
		});
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage } = this.state;

		if (count === 0) return <p>There are no movies in the database</p>;
		// Create the movies copy locally to be used by the render method if the length is greater than 0 using the paginate function
		const movies = paginate(this.state.movies, currentPage, pageSize);

		return (
			<React.Fragment>
				<p>Showing {count} movies in the database</p>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Genre</th>
							<th scope="col">Stock</th>
							<th scope="col">Rate</th>
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
									<Like
										onLikeToggle={() => this.handleLike(movie)}
										liked={movie.liked}
									/>
								</td>
								<td>
									<button
										onClick={() => this.handleDelete(movie._id)}
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
				<Pagination
					itemsCount={count}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={this.handlePageChange}
				/>
			</React.Fragment>
		);
	}
}

export default Movies;
