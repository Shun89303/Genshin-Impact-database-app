import { create } from "zustand";
import {
	getWeaponDetails,
	getWeaponImageTypes,
	getWeaponsWithImages,
} from "../services/weapons.services";

interface WeaponsState {
	ids: string[] | null;
	error: string | null;
	fetchWeaponsIds: () => Promise<void>;
	fetchWeaponImageTypes: (id: string) => Promise<string[]>;
	fetchWeaponDetails: (id: string) => Promise<Record<string, unknown>>;
}

export const useWeaponsStore = create<WeaponsState>((set) => ({
	ids: null,
	error: null,
	fetchWeaponsIds: async () => {
		try {
			const ids: string[] = await getWeaponsWithImages();
			set({ ids });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchWeaponImageTypes: async (id) => {
		try {
			return await getWeaponImageTypes(id);
		} catch (error: any) {
			set({ error: error.message });
			return null;
		}
	},
	fetchWeaponDetails: async (id) => {
		try {
			return await getWeaponDetails(id);
		} catch (error: any) {
			set({ error: error.message });
			return null;
		}
	},
}));
