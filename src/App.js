import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import "./App.css";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<main className="container">
					<Switch>
						<Route path="/movies/:id" component={MovieForm} /> 
						<Route path="/customers" component={Customers} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/movies" component={Movies} />
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" exact to="/movies" />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
