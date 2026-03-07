import { create } from "zustand";
import { getAllCookingMaterialsData } from "../services/cooking.materials.services";
import { Normalized } from "../types/cooking.material";

interface CookingMaterialsState {
	error: string | null;
	input: string;
	details: Normalized[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
}

export const useCookingMaterialsStore = create<CookingMaterialsState>(
	(set, get) => ({
		error: null,
		input: "",
		details: [],
		setInput: (i) => set({ input: i }),
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllCookingMaterialsData();
					const { id, ...ingredientsOnly } = apiObject;
					const normalizedIngredients = Object.entries(ingredientsOnly).map(
						([key, value]) => ({
							id: key,
							...value,
						})
					);
					set({ details: normalizedIngredients });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
	})
);
