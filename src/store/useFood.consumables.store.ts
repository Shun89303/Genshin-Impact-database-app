import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/foodCategory/filterCategories";
import { getAllFoodData } from "../services/consumables.services";
import { NormalizedFood } from "../types/food";

interface FoodState {
	error: string | null;
	input: string;
	details: NormalizedFood[];
	selectedType: "type" | "rarity" | null;
	setSelectedType: (type: "type" | "rarity" | null, sheetRef: any) => void;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	groupByType: (
		foods: NormalizedFood[],
		type: "type" | "rarity"
	) => { label: string; data: NormalizedFood[] }[];
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
	fetchAllDetails: async () => {
		try {
			let { details } = get();
			if (!details.length) {
				const apiObject = await getAllFoodData();
				const { id, ...foodOnly } = apiObject;
				const apiArray = Object.entries(foodOnly);
				const normalizedFoodArray = apiArray.map(([id, value]) => ({
					id,
					...value,
				}));
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
				label: typeof option === "number" ? `${option}★` : option,
				data: foods.filter((food) => food[type] === option),
			}))
			.filter((group) => group.data.length > 0);
	},
}));
