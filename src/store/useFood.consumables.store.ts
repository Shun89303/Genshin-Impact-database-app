import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/foodCategory/filterCategories";
import {
	getAllFoodData,
	getAllFoodImageIds,
} from "../services/consumables.services";
import { food } from "../types/food";

interface Food {
	name: string | null;
	rarity: number | null;
	type: string | null;
	effect: string | null;
}

interface FoodState {
	error: string | null;
	input: string;
	details: food[];
	selectedType: "type" | "rarity" | null;
	setSelectedType: (type: "type" | "rarity" | null, sheetRef: any) => void;
	cache: Record<string, Food>;
	loadingId: string | null;
	foodObject: Record<string, Food>;
	foodIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchFoodObject: () => Promise<void>;
	fetchFoodImageIds: () => Promise<void>;
	storeFoodDetails: (id: any) => void;
	groupByType: (
		foods: food[],
		type: "type" | "rarity"
	) => { label: string; data: food[] }[];
}

export const useFoodStore = create<FoodState>((set, get) => ({
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
	fetchAllDetails: async () => {
		try {
			let { foodIds, details, fetchFoodImageIds } = get();
			if (!foodIds?.length) {
				await fetchFoodImageIds();
			}
			if (!details.length) {
				const apiObject = await getAllFoodData();
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
	groupByType: (foods, type) => {
		const options = FILTER_CATEGORIES[type];

		return options
			.map((option) => ({
				label: typeof option === "number" ? `${option} stars` : option,
				data: foods.filter((food) => food[type] === option),
			}))
			.filter((group) => group.data.length > 0);
	},
}));
