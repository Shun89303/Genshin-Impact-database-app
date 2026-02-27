import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const characterAscension = endpoints.characterAscension;
const list = endpoints.list;

export function getAllCharacterAscensionMaterialsData() {
	return apiClient(`${materials}${characterAscension}`);
}

export function getAllCharacterAscensionMaterialImageIds() {
	return apiClient(`${materials}${characterAscension}${list}`);
}
