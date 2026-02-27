import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const characterExperience = endpoints.characterExperience;
const list = endpoints.list;

export function getAllCharacterExperienceMaterialsData() {
	return apiClient(`${materials}${characterExperience}`);
}

export function getAllCharacterExperienceMaterialImageIds() {
	return apiClient(`${materials}${characterExperience}${list}`);
}
