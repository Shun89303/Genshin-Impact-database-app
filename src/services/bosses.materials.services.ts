import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { RawBossMaterialsApi } from "../types/boss.material";

const materials = endpoints.materials;
const bossMaterials = endpoints.bossMaterials;
const list = endpoints.list;

export function getAllBossMaterialsData(): Promise<RawBossMaterialsApi> {
	return apiClient(`${materials}${bossMaterials}`);
}

export function getAllBossMaterialImageIds() {
	return apiClient(`${materials}${bossMaterials}${list}`);
}
