import { create } from "zustand";
import {
	getElementDetails,
	getElementImageTypes,
	getElementsIds,
} from "../services/elements.services";

interface ElementsState {
	ids: string[] | null;
	error: string | null;
	cache: Record<string, unknown>;
	loadingId: string | null;
	clearCacheForId?: (id: string) => void;
	fetchElementsIds: () => Promise<void>;
	fetchElementImageTypes: (id: string) => Promise<string[]>;
	fetchElementDetails: (id: any) => Promise<void>;
}

export const useElementsStore = create<ElementsState>((set, get) => ({
	ids: null,
	error: null,
	cache: {},
	loadingId: null,
	fetchElementsIds: async () => {
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
	fetchElementDetails: async (id) => {
		const { cache } = get();

		if (cache[id]) {
			set({ loadingId: null });
			return;
		}

		try {
			set({ loadingId: id });
			const data = await getElementDetails(id);
			set((state) => ({
				cache: { ...state.cache, [id]: data },
				loadingId: null,
			}));
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	clearCacheForId: (id: string) =>
		set((state) => {
			const newCache = { ...state.cache };
			delete newCache[id];
			return { cache: newCache };
		}),
}));
