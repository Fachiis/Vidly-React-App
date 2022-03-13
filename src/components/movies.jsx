import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		selectedGenre: [],
		pageSize: 4,
		currentPage: 1,
	};

	componentDidMount() {
		this.setState({
			movies: getMovies(),
			genres: getGenres(),
			selectedGenre: getGenres(),
		});
	}

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

	handleGenreSelect = (genre) => {
		this.setState({
			selectedGenre: genre,
		});
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre,
		} = this.state;

		if (count === 0) return <p>There are no movies in the database</p>;
		// Create the movies copy locally to be used by the render method if the length is greater than 0 using the paginate function.
		// We will filtered the movies and bases on the result, we will render the movies
		const filteredMovies = selectedGenre
			? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
			: allMovies;
		const movies = paginate(filteredMovies, currentPage, pageSize);

		return (
			<div className="row">
				<div className="col-2">
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<p>Showing {filteredMovies.length} movies in the database</p>

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
											liked={movie.liked}
											onLikeToggle={() => this.handleLike(movie)}
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
						itemsCount={filteredMovies.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
