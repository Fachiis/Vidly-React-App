import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
	state = {
		movies: getMovies(),
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movie };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handleDelete = (id) => {
		const movies = this.state.movies.filter((movie) => movie._id !== id);
		return this.setState({
			movies,
		});
	};

	render() {
		if (this.moviesCount() === 0)
			return <p>There are no movies in the database</p>;

		return (
			<div>
				<p>Showing {this.moviesCount()} movies in the database</p>
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
						{this.state.movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										onClick={() => this.handleLike(movie)}
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
			</div>
		);
	}
	moviesCount = () => {
		return this.state.movies.length;
	};
}

export default Movies;
