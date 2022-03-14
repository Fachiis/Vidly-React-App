import React, { Component } from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		sortColumn: { column: "title", order: "asc" },
		pageSize: 4,
		currentPage: 1,
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

		this.setState({
			movies: getMovies(),
			genres,
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
			currentPage: 1,
		});
	};

	handleSort = (column) => {
		const sortColumn = { ...this.state.sortColumn };

		if (sortColumn.column === column) {
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
		} else {
			sortColumn.column = column;
			sortColumn.order = "asc";
		}
		this.setState({ sortColumn });
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			sortColumn,
			selectedGenre,
		} = this.state;

		if (count === 0) return <p>There are no movies in the database</p>;
		// Create the movies copy locally to be used by the render method if the length is greater than 0 using the paginate function.
		// We will filtered the movies and bases on the result, we will render the movies
		const filteredMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
				: allMovies;

		const sortedMovies = _.orderBy(
			filteredMovies,
			[sortColumn.column],
			[sortColumn.order]
		);
		const movies = paginate(sortedMovies, currentPage, pageSize);

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

					<MoviesTable
						movies={movies}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>

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
