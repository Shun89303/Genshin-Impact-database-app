import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const weaponExperience = endpoints.weaponExperience;
const list = endpoints.list;

export async function getAllWeaponExperienceMaterialsData() {
	return await apiClient(`${materials}${weaponExperience}`);
}

export async function getAllWeaponExperienceMaterialImageIds() {
	return await apiClient(`${materials}${weaponExperience}${list}`);
}
