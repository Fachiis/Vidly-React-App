import Joi from "joi-browser";
import React from "react";

import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";
class MovieForm extends Form {
	state = {
		data: {
			title: "",
			genreId: "",
			numberInStock: "",
			dailyRentalRate: "",
		},
		genres: [],
		errors: {},
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genreId: Joi.string().required().label("Genre"),
		numberInStock: Joi.number()
			.min(0)
			.max(100)
			.required()
			.label("NumberInStock"),
		dailyRentalRate: Joi.number()
			.min(0)
			.max(10)
			.required()
			.label("DailyRentalRate"),
	};

	async populateGenres() {
		const { data: genres } = await getGenres();
		this.setState({ genres });
	}

	async populateMovie() {
		try {
			const movieId = this.props.match.params.id;
			if (movieId === "new") return;

			const { data: movie } = await getMovie(movieId);
			this.setState({ data: this.mapToModelView(movie) });
		} catch (error) {
			if (error.response && error.response.status === 404)
				this.props.history.replace("/not-found");
		}
	}

	async componentDidMount() {
		this.populateGenres();
		this.populateMovie();
	}

	mapToModelView = (movie) => {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	};

	doSubmit = async () => {
		// Make server call
		await saveMovie(this.state.data);
		this.props.history.push("/movies");
	};

	render() {
		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelect("genreId", "Genre", this.state.genres)}
					{this.renderInput("numberInStock", "Number in Stock", "number")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default MovieForm;
