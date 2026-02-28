import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { wamApi } from "../types/weapon.ascension.material";

const materials = endpoints.materials;
const weaponAscension = endpoints.weaponAscension;
const list = endpoints.list;

export function getAllWeaponAscensionMaterialsData(): Promise<
	Record<string, wamApi>
> {
	return apiClient(`${materials}${weaponAscension}`);
}

export function getAllWeaponAscensionMaterialImageIds() {
	return apiClient(`${materials}${weaponAscension}${list}`);
}
