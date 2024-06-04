import API from "../lib/AxiosProjects";
import { isAxiosError } from "axios";

export async function newClient(formData: Object) {
	try {
		const url = "/new-client";
		const { data } = await API.post(url, formData);
		console.log(data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function getClients() {
	try {
		const url = "/list-clients";
		const { data } = await API.get(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function createProject(formData: object) {
	try {
		const url = "/new-project";
		const { data } = await API.post(url, formData);
		console.log(data);
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function getProjects(clientID: number) {
	try {
		const url = `/list-projects/${clientID}`;
		const { data } = await API.get(url);

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function listCost(project_id: number) {
	try {
		const url = `/list-costs/${project_id}`;
		const { data } = await API.get(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function createCost(formData: object) {
	try {
		const url = "/new-cost";
		const { data } = await API.post(url, formData);
		console.log(data);
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function listIncome(project_id: number) {
	try {
		const url = `/list-incomes/${project_id}`;
		const { data } = await API.get(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function createIncome(formData: Object) {
	try {
		const url = "/new-income";
		const { data } = await API.post(url, formData);
		console.log(data);
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}
