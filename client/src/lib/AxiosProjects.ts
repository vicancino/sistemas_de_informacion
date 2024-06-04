import axios from "axios";

const API_AUTH = axios.create({
	baseURL: "http://localhost:4000/projects",
});

export default API_AUTH;
