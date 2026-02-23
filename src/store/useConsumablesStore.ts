import { create } from "zustand";
import {
	getAllFoodData,
	getAllFoodImageIds,
	getAllPotionImageIds,
	getAllPotionsData,
} from "../services/consumables.services";

interface Potion {
	name: string | null;
	effect: string | null;
	rarity: number | null;
}

interface Food {
	name: string | null;
	rarity: number | null;
	type: string | null;
	effect: string | null;
}

interface ConsumablesState {
	error: string | null;
	cache: Record<string, Potion> | Record<string, Food>;
	loadingId: string | null;
	potionsObject: Record<string, Potion>;
	potionsIds: string[] | null;
	foodObject: Record<string, Food>;
	foodIds: string[] | null;
	fetchPotionsObject: () => Promise<void>;
	fetchPotionImageIds: () => Promise<void>;
	storePotionDetails: (id: any) => void;
	fetchFoodObject: () => Promise<void>;
	fetchFoodImageIds: () => Promise<void>;
	storeFoodDetails: (id: any) => void;
}

export const useConsumablesStore = create<ConsumablesState>((set, get) => ({
	error: null,
	cache: {},
	loadingId: null,
	potionsObject: {},
	potionsIds: [],
	foodObject: {},
	foodIds: [],
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
	fetchFoodObject: async () => {
		const { foodObject } = get();
		if (Object.keys(foodObject).length > 0) return;
		try {
			const allFood = await getAllFoodData();
			const allFoodArray = Object.entries(allFood);
			const allFoodArrayWithoutLastItem = allFoodArray.slice(0, -1);
			const foodObject: any = Object.fromEntries(allFoodArrayWithoutLastItem);
			set({ foodObject });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchFoodImageIds: async () => {
		const { foodIds } = get();
		if (foodIds?.length) {
			return;
		}

		const ids = await getAllFoodImageIds();
		set({ foodIds: ids });
	},
	storeFoodDetails: (id) => {
		const { foodObject, cache } = get();

		if (cache[id]) {
			set({ loadingId: null });
			return;
		}

		set({ loadingId: id });
		const details: Food = foodObject[id];
		set((state) => ({
			cache: { ...state.cache, [id]: details },
			loadingId: null,
		}));
	},
}));
