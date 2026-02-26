import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const weaponExperience = endpoints.weaponExperience;
const list = endpoints.list;

export async function getAllWeaponExperienceMaterialsData() {
	return apiClient(`${materials}${weaponExperience}`);
}

export async function getAllWeaponExperienceMaterialImageIds() {
	return apiClient(`${materials}${weaponExperience}${list}`);
}
