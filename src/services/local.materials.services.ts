import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/local.material";

const materials = endpoints.materials;
const localSpecialties = endpoints.localSpecialties;

export function getAllLocalMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${localSpecialties}`);
}
