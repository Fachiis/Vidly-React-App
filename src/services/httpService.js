import axios from "axios";
import logger from "../services/logService";
import { toast } from "react-toastify";
import auth from "./authService";

// Pass the jwt token to the axios header on each request to the server
axios.defaults.headers.common["x-auth-token"] = auth.getCurrentJwt();

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		// Unexpected errors are errors we can not predict like the server down, network down, db down, bug
		logger.log(error);
		toast.error("An unexpected error occurred.");
	}

	return Promise.reject(error);
});

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};