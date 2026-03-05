import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { ApiIds, Weapon } from "../types/weapon";

const weapons = endpoints.weapons;

// will return an ARRAY of over 80 weapon id strings
export function getWeaponsIds(): Promise<ApiIds> {
	return apiClient(weapons);
}

// will return a huge OBJECT containing all the details of a weapon
export function getWeaponDetails(id: string): Promise<Weapon> {
	return apiClient(`${weapons}/${id}`);
}
