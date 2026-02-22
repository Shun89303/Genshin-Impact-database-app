import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const boss = endpoints.boss;
const weeklyBoss = endpoints.weeklyBoss;
const list = endpoints.list;

// will return an ARRAY of over 80 Boss id strings
export async function getBossesIds() {
	return await apiClient(boss);
}

// will return a huge OBJECT containing all the details of a Boss
export async function getBossDetails(id: string) {
	return await apiClient(`${boss}${weeklyBoss}/${id}`);
}

// will return a small ARRAY containing the types of images the api offers for the selected Boss
export async function getBossImageTypes(id: string) {
	return await apiClient(`${boss}${weeklyBoss}/${id}${list}`);
}
