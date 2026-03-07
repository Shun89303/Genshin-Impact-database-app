import { create } from "zustand";
import { getAllPotionsData } from "../services/consumables.services";
import { NormalizedPotion } from "../types/potion";

interface PotionState {
	error: string | null;
	input: string;
	details: NormalizedPotion[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
}

export const usePotionStore = create<PotionState>((set, get) => ({
	error: null,
	input: "",
	details: [],
	setInput: (i) => set({ input: i }),
	fetchAllDetails: async () => {
		try {
			let { details } = get();
			if (!details.length) {
				const apiObject = await getAllPotionsData();
				const { id, ...potionOnly } = apiObject;
				const apiArray = Object.entries(potionOnly);
				const normalizedPotionArray = apiArray.map(([id, value]) => ({
					id,
					...value,
				}));
				set({ details: normalizedPotionArray });
			}
		} catch (error: any) {
			set({ error: error.message });
		}
	},
}));
