import { create } from "zustand";
import {
	getElementDetails,
	getElementImageTypes,
	getElementsIds,
} from "../services/elements.services";
import { Normalized } from "../types/element";

interface ElementsState {
	ids: string[];
	details: Normalized[];
	error: string | null;
	fetchElementsIds: () => Promise<void>;
	fetchElementImageTypes: (id: string) => Promise<string[]>;
	fetchAllDetails: () => Promise<void>;
}

export const useElementsStore = create<ElementsState>((set, get) => ({
	ids: [],
	details: [],
	error: null,
	fetchElementsIds: async () => {
		const { ids } = get();
		if (ids.length) return;
		try {
			const ids: string[] = await getElementsIds();
			set({ ids });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchElementImageTypes: async (id) => {
		try {
			return await getElementImageTypes(id);
		} catch (error: any) {
			set({ error: error.message });
			return null;
		}
	},
	fetchAllDetails: async () => {
		try {
			let { ids, fetchElementsIds } = get();
			if (!ids.length) {
				await fetchElementsIds();
				ids = get().ids;
			}

			const detailedObject = await Promise.all(
				ids.map((id) => getElementDetails(id))
			);
			set({ details: detailedObject });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
}));
