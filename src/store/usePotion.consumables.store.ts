import { create } from "zustand";
import {
	getAllPotionImageIds,
	getAllPotionsData,
} from "../services/consumables.services";

interface Potion {
	name: string | null;
	effect: string | null;
	rarity: number | null;
}

interface PotionState {
	error: string | null;
	cache: Record<string, Potion>;
	loadingId: string | null;
	potionsObject: Record<string, Potion>;
	potionsIds: string[] | null;
	fetchPotionsObject: () => Promise<void>;
	fetchPotionImageIds: () => Promise<void>;
	storePotionDetails: (id: any) => void;
}

export const usePotionStore = create<PotionState>((set, get) => ({
	error: null,
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
}));
