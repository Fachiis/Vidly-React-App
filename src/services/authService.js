import jwtDecode from "jwt-decode";

import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint, { email, password });
	localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		const user = jwtDecode(jwt);
		return user;
	} catch (ex) {
		return null;
	}
}

export function getCurrentJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
    getCurrentJwt,
};
