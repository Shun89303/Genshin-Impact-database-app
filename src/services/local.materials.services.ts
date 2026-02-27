import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const localSpecialties = endpoints.localSpecialties;
const list = endpoints.list;

export function getAllLocalMaterialsData() {
	return apiClient(`${materials}${localSpecialties}`);
}

export function getAllLocalMaterialImageIds() {
	return apiClient(`${materials}${localSpecialties}${list}`);
}
