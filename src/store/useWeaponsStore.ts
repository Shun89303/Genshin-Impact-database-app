import { create } from "zustand";
import {
	getWeaponDetails,
	getWeaponImageTypes,
	getWeaponsIds,
} from "../services/weapons.services";

interface WeaponsState {
	ids: string[] | null;
	error: string | null;
	cache: Record<string, unknown>;
	loadingId: string | null;
	clearCacheForId?: (id: string) => void;
	fetchWeaponsIds: () => Promise<void>;
	fetchWeaponImageTypes: (id: string) => Promise<string[]>;
	fetchWeaponDetails: (id: any) => Promise<void>;
}

export const useWeaponsStore = create<WeaponsState>((set, get) => ({
	ids: null,
	error: null,
	cache: {},
	loadingId: null,
	fetchWeaponsIds: async () => {
		try {
			const ids: string[] = await getWeaponsIds();
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
		const { cache } = get();

		if (cache[id]) {
			set({ loadingId: null });
			return;
		}

		try {
			set({ loadingId: id });
			const data = await getWeaponDetails(id);
			set((state) => ({
				cache: { ...state.cache, [id]: data },
				loadingId: null,
			}));
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	clearCacheForId: (id: string) =>
		set((state) => {
			const newCache = { ...state.cache };
			delete newCache[id];
			return { cache: newCache };
		}),
}));
