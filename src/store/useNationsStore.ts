import { create } from "zustand";
import {
	getNationDetails,
	getNationImageTypes,
	getNationsIds,
} from "../services/nations.services";
import { Normalized } from "../types/nation";

interface NationsState {
	ids: string[];
	details: Normalized[];
	error: string | null;
	fetchNationsIds: () => Promise<void>;
	fetchNationImageTypes: (id: string) => Promise<string[]>;
	fetchAllDetails: () => Promise<void>;
}

export const useNationsStore = create<NationsState>((set, get) => ({
	ids: [],
	details: [],
	error: null,
	fetchNationsIds: async () => {
		const { ids } = get();
		if (ids.length) return;
		try {
			const ids = await getNationsIds();
			set({ ids });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchNationImageTypes: async (id) => {
		try {
			return await getNationImageTypes(id);
		} catch (error: any) {
			set({ error: error.message });
			return null;
		}
	},
	fetchAllDetails: async () => {
		try {
			let { ids, fetchNationsIds } = get();
			if (!ids.length) {
				await fetchNationsIds();
				ids = get().ids;
			}

			const detailedObject = await Promise.all(
				ids.map((id) => getNationDetails(id))
			);
			set({ details: detailedObject });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
}));
