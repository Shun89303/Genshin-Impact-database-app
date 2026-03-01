import { create } from "zustand";
import {
	getAllCookingMaterialImageIds,
	getAllCookingMaterialsData,
} from "../services/cooking.materials.services";
import { cookingIngredients } from "../types/cooking.material";

interface CookingMaterialsState {
	error: string | null;
	input: string;
	details: cookingIngredients[];
	cache: Record<string, unknown>;
	loadingId: string | null;
	materialsObject: Record<string, unknown>;
	materialIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchMaterialsObject: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
	storeMaterialDetails: (id: string) => void;
}

export const useCookingMaterialsStore = create<CookingMaterialsState>(
	(set, get) => ({
		error: null,
		input: "",
		details: [],
		setInput: (i) => set({ input: i }),
		cache: {},
		loadingId: null,
		materialsObject: {},
		materialIds: [],
		fetchMaterialsObject: async () => {
			const { materialsObject } = get();
			if (Object.keys(materialsObject).length > 0) return;
			try {
				const allMaterials = await getAllCookingMaterialsData();
				const allMaterialsArray = Object.entries(allMaterials);
				const withoutListItem = allMaterialsArray.slice(0, -1);
				const materialsObject = Object.fromEntries(withoutListItem);
				set({ materialsObject });
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		fetchMaterialIds: async () => {
			try {
				const { materialIds } = get();

				if (!materialIds?.length) {
					const materialIds = await getAllCookingMaterialImageIds();
					set({ materialIds });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		storeMaterialDetails: (id) => {
			const { materialsObject, cache } = get();
			if (cache[id]) {
				set({ loadingId: null });
				return;
			}

			set({ loadingId: id });
			const details = materialsObject[id];
			set((state) => ({
				cache: { ...state.cache, [id]: details },
				loadingId: null,
			}));
		},
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllCookingMaterialsData();
					const { id: _ignored, ...ingredientsOnly } = apiObject;
					const normalizedIngredients: cookingIngredients[] = Object.entries(
						ingredientsOnly
					).map(([key, value]) => ({
						id: key,
						...value,
					}));
					set({ details: normalizedIngredients });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
	})
);
