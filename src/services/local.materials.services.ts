import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const localSpecialties = endpoints.localSpecialties;
const list = endpoints.list;

export async function getAllLocalMaterialsData() {
	return apiClient(`${materials}${localSpecialties}`);
}

export async function getAllLocalMaterialImageIds() {
	return apiClient(`${materials}${localSpecialties}${list}`);
}
