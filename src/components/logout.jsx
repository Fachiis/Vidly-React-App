import { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
	// Call componentDidMount and remove the user token from the localStorage and redirect to the home page
	componentDidMount() {
		auth.logout();
		window.location = "/";
	}

	render() {
		return null;
	}
}

export default Logout;
