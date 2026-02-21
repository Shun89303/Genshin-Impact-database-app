import { BASE_URL } from "../config/env";

export default async function apiClient(path: string) {
	const res = await fetch(`${BASE_URL}${path}`);
	if (!res.ok) {
		throw new Error(`API error: ${res.status}`);
	}
	return res.json();
}
