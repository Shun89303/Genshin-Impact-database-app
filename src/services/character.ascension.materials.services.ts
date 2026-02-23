import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const characterAscension = endpoints.characterAscension;
const list = endpoints.list;

export async function getAllCharacterAscensionMaterialsData() {
	return await apiClient(`${materials}${characterAscension}`);
}

export async function getAllCharacterAscensionMaterialImageIds() {
	return await apiClient(`${materials}${characterAscension}${list}`);
}
