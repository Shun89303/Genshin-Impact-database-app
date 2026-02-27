import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const bossMaterials = endpoints.bossMaterials;
const list = endpoints.list;

export function getAllBossMaterialsData() {
	return apiClient(`${materials}${bossMaterials}`);
}

export function getAllBossMaterialImageIds() {
	return apiClient(`${materials}${bossMaterials}${list}`);
}
