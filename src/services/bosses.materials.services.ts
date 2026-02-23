import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const bossMaterials = endpoints.bossMaterials;
const list = endpoints.list;

export async function getAllBossMaterialsData() {
	return await apiClient(`${materials}${bossMaterials}`);
}

export async function getAllBossMaterialImageIds() {
	return await apiClient(`${materials}${bossMaterials}${list}`);
}
