import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const weapons = endpoints.weapons;
const list = endpoints.list;

export async function getWeaponsIds() {
	return await apiClient(weapons);
}

export async function getWeaponDetails(id: string) {
	return await apiClient(`${weapons}/${id}`);
}

export async function getWeaponImageTypes(id: string) {
	return await apiClient(`${weapons}/${id}${list}`);
}

export async function getWeaponsWithImages() {
	const ids = await getWeaponsIds();

	const validIds = await Promise.all(
		ids.map(async (id: any) => {
			try {
				await getWeaponImageTypes(id);
				return id;
			} catch {
				return undefined;
			}
		})
	);

	return validIds.filter(Boolean);
}
