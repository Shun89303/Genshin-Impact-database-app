import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { WeaponExperience } from "../types/weapon.experience.material";

const materials = endpoints.materials;
const weaponExperience = endpoints.weaponExperience;

export function getAllWeaponExperienceMaterialsData(): Promise<WeaponExperience> {
	return apiClient(`${materials}${weaponExperience}`);
}
