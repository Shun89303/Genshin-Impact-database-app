import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/weapon.ascension.material";

const materials = endpoints.materials;
const weaponAscension = endpoints.weaponAscension;

export function getAllWeaponAscensionMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${weaponAscension}`);
}
