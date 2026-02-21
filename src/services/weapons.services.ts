import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const weapons = endpoints.weapons;
const list = endpoints.list;

// will return an ARRAY of over 80 weapon id strings
export async function getWeaponsIds() {
	return await apiClient(weapons);
}

// will return a huge OBJECT containing all the details of a weapon
export async function getWeaponDetails(id: string) {
	return await apiClient(`${weapons}/${id}`);
}

// will return a small ARRAY containing the types of images the api offers for the selected weapon
export async function getWeaponImageTypes(id: string) {
	return await apiClient(`${weapons}/${id}${list}`);
}
