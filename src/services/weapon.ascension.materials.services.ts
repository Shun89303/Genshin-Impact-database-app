import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/weapon.ascension.material";

const materials = endpoints.materials;
const weaponAscension = endpoints.weaponAscension;
const list = endpoints.list;

export function getAllWeaponAscensionMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${weaponAscension}`);
}

export function getAllWeaponAscensionMaterialImageIds() {
	return apiClient(`${materials}${weaponAscension}${list}`);
}
