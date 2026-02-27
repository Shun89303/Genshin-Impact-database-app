import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/filterCategories";
import {
	getWeaponDetails,
	getWeaponImageTypes,
	getWeaponsIds,
} from "../services/weapons.services";
import { Weapon } from "../types/weapon";

interface WeaponsState {
	error: string | null;
	ids: string[];
	input: string;
	details: Weapon[];
	selectedType: "type" | "rarity" | null;
	setSelectedType: (type: "type" | "rarity" | null, sheetRef: any) => void;
	cache: Record<string, unknown>;
	loadingId: string | null;
	clearCacheForId?: (id: string) => void;
	fetchWeaponsIds: () => Promise<void>;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchWeaponImageTypes: (id: string) => Promise<string[]>;
	fetchWeaponDetails: (id: any) => Promise<void>;
	groupByType: (
		weapons: Weapon[],
		type: "type" | "rarity"
	) => { label: string; data: Weapon[] }[];
}

export const useWeaponsStore = create<WeaponsState>((set, get) => ({
	error: null,
	ids: [],
	input: "",
	details: [],
	selectedType: null,
	setSelectedType: (type, sheetRef) => {
		set({ selectedType: type });
		sheetRef.current.close();
	},
	setInput: (i) => set({ input: i }),
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
	fetchAllDetails: async () => {
		try {
			let { ids, fetchWeaponsIds } = get();
			if (!ids.length) {
				await fetchWeaponsIds();
				ids = get().ids;
			}
			const details = await Promise.all(ids.map((id) => getWeaponDetails(id)));
			set({ details });
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
	groupByType: (weapons, type) => {
		const options = FILTER_CATEGORIES[type];

		return options
			.map((option) => ({
				label: typeof option === "number" ? `${option} stars` : option,
				data: weapons.filter((wea) => wea[type] === option),
			}))
			.filter((group) => group.data.length > 0);
	},
}));
