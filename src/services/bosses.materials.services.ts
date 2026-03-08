import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/boss.material";

const materials = endpoints.materials;
const bossMaterials = endpoints.bossMaterials;

export function getAllBossMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${bossMaterials}`);
}
