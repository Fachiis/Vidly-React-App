import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Search from "./common/search";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		searchQuery: "",
		selectedGenre: null,
		sortColumn: { path: "title", order: "asc" },
	};

	// Usage of the lifecycle componentDidMount method, to call our imaginary server to get the movies and genres data
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
			searchQuery: "",
			currentPage: 1,
		});
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	handleSearch = (e) => {
		this.setState({
			searchQuery: e.currentTarget.value,
			selectedGenre: null,
		});
	};

	getPageData = () => {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			sortColumn,
			searchQuery,
			selectedGenre,
		} = this.state;

		let filtered = allMovies;

		if (searchQuery)
			filtered = allMovies.filter((movie) =>
				movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter(
				(movie) => movie.genre._id === selectedGenre._id
			);

		const sortedMovies = _.orderBy(
			filtered,
			[sortColumn.path],
			[sortColumn.order]
		);
		const movies = paginate(sortedMovies, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

		if (count === 0) return <p>There are no movies in the database</p>;

		const { totalCount, data: movies } = this.getPageData();

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
					<Link
						to="/movies/new"
						className="btn btn-primary"
						style={{ marginBottom: 20 }}
					>
						New Movie
					</Link>

					<p>Showing {totalCount} movies in the database</p>

					<Search value={searchQuery} onChange={this.handleSearch} />

					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>

					<Pagination
						itemsCount={totalCount}
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
