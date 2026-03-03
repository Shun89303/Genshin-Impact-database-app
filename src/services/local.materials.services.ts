import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/local.material";

const materials = endpoints.materials;
const localSpecialties = endpoints.localSpecialties;
const list = endpoints.list;

export function getAllLocalMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${localSpecialties}`);
}

export function getAllLocalMaterialImageIds() {
	return apiClient(`${materials}${localSpecialties}${list}`);
}
