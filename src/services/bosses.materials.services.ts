import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { BASE_URL } from "../config/env";

const materials = endpoints.materials;
const bossMaterials = endpoints.bossMaterials;
const list = endpoints.list;

export async function getAllBossMaterialsData() {
	return await apiClient(`${BASE_URL}${materials}${bossMaterials}`);
}

export async function getAllBossMaterialImageIds() {
	return await apiClient(`${BASE_URL}${materials}${bossMaterials}${list}`);
}
