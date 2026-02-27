import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/potionCategory/filterCategories";
import {
	getAllPotionImageIds,
	getAllPotionsData,
} from "../services/consumables.services";
import { potion } from "../types/potion";

interface Potion {
	name: string | null;
	effect: string | null;
	rarity: number | null;
}

interface PotionState {
	error: string | null;
	input: string;
	details: potion[];
	selectedType: "rarity" | null;
	setSelectedType: (type: "rarity" | null, sheetRef: any) => void;
	cache: Record<string, Potion>;
	loadingId: string | null;
	potionsObject: Record<string, Potion>;
	potionsIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchPotionsObject: () => Promise<void>;
	fetchPotionImageIds: () => Promise<void>;
	storePotionDetails: (id: any) => void;
	groupByType: (
		foods: potion[],
		type: "rarity"
	) => { label: string; data: potion[] }[];
}

export const usePotionStore = create<PotionState>((set, get) => ({
	error: null,
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
	potionsObject: {},
	potionsIds: [],
	fetchPotionsObject: async () => {
		const { potionsObject } = get();
		if (Object.keys(potionsObject).length > 0) return;
		try {
			const allPotions = await getAllPotionsData();
			const allPotionsArray = Object.entries(allPotions);
			const allPotionsArrayWithoutLastItem = allPotionsArray.slice(0, -1);
			const potionsObject: any = Object.fromEntries(
				allPotionsArrayWithoutLastItem
			);
			set({ potionsObject });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchPotionImageIds: async () => {
		const { potionsIds } = get();
		if (potionsIds?.length) {
			return;
		}

		const ids = await getAllPotionImageIds();
		set({ potionsIds: ids });
	},
	storePotionDetails: (id) => {
		const { potionsObject, cache } = get();

		if (cache[id]) {
			set({ loadingId: null });
			return;
		}

		set({ loadingId: id });
		const details: Potion = potionsObject[id];
		set((state) => ({
			cache: { ...state.cache, [id]: details },
			loadingId: null,
		}));
	},
	fetchAllDetails: async () => {
		try {
			let { potionsIds, details, fetchPotionImageIds } = get();
			if (!potionsIds?.length) {
				await fetchPotionImageIds();
			}
			if (!details.length) {
				const apiObject = await getAllPotionsData();
				const normalizedFoodArray = Object.entries(apiObject).map(
					([id, value]) => ({
						id,
						...value,
					})
				);
				set({ details: normalizedFoodArray });
			}
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	groupByType: (potions, type) => {
		const options = FILTER_CATEGORIES[type];

		return options
			.map((option) => ({
				label: `${option} stars`,
				data: potions.filter((pot) => pot[type] === option),
			}))
			.filter((group) => group.data.length > 0);
	},
}));
