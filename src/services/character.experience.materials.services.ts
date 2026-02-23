import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const characterExperience = endpoints.characterExperience;
const list = endpoints.list;

export async function getAllCharacterExperienceMaterialsData() {
	return await apiClient(`${materials}${characterExperience}`);
}

export async function getAllCharacterExperienceMaterialImageIds() {
	return await apiClient(`${materials}${characterExperience}${list}`);
}
