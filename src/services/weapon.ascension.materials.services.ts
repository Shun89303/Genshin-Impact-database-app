import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const weaponAscension = endpoints.weaponAscension;
const list = endpoints.list;

export async function getAllWeaponAscensionMaterialsData() {
	return apiClient(`${materials}${weaponAscension}`);
}

export async function getAllWeaponAscensionMaterialImageIds() {
	return apiClient(`${materials}${weaponAscension}${list}`);
}
