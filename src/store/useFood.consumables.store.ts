import { create } from "zustand";
import {
	getAllFoodData,
	getAllFoodImageIds,
} from "../services/consumables.services";

interface Food {
	name: string | null;
	rarity: number | null;
	type: string | null;
	effect: string | null;
}

interface FoodState {
	error: string | null;
	cache: Record<string, Food>;
	loadingId: string | null;
	foodObject: Record<string, Food>;
	foodIds: string[] | null;
	fetchFoodObject: () => Promise<void>;
	fetchFoodImageIds: () => Promise<void>;
	storeFoodDetails: (id: any) => void;
}

export const useFoodStore = create<FoodState>((set, get) => ({
	error: null,
	cache: {},
	loadingId: null,
	foodObject: {},
	foodIds: [],
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
