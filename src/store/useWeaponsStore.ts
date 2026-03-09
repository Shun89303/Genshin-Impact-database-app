import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/weaponCategory/filterCategories";
import { getWeaponDetails, getWeaponsIds } from "../services/weapons.services";
import { Weapon } from "../types/weapon";

interface WeaponsState {
	error: string | null;
	ids: string[];
	input: string;
	details: Weapon[];
	selectedType: "type" | "rarity" | null;
	setSelectedType: (type: "type" | "rarity" | null, sheetRef: any) => void;
	fetchWeaponsIds: () => Promise<void>;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
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
	fetchWeaponsIds: async () => {
		try {
			const ids: string[] = await getWeaponsIds();
			set({ ids });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchAllDetails: async () => {
		set({ error: null });
		let { ids, fetchWeaponsIds, details } = get();
		if (!ids.length) {
			await fetchWeaponsIds();
			ids = get().ids;
		}
		if (details.length) {
			return;
		}
		const fetchedDetails = await Promise.all(
			ids.map((id) => getWeaponDetails(id))
		);
		set({ details: fetchedDetails });
	},
	groupByType: (weapons, type) => {
		const options = FILTER_CATEGORIES[type];

		return options
			.map((option) => ({
				label: typeof option === "number" ? `${option}★` : option,
				data: weapons.filter((wea) => wea[type] === option),
			}))
			.filter((group) => group.data.length > 0);
	},
}));
