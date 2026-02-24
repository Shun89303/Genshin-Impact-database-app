import { create } from "zustand";
import {
	getNationDetails,
	getNationImageTypes,
	getNationsIds,
} from "../services/nations.services";

interface NationsState {
	ids: string[] | null;
	error: string | null;
	cache: Record<string, unknown>;
	loadingId: string | null;
	clearCacheForId?: (id: string) => void;
	fetchNationsIds: () => Promise<void>;
	fetchNationImageTypes: (id: string) => Promise<string[]>;
	fetchNationDetails: (id: any) => Promise<void>;
}

export const useNationsStore = create<NationsState>((set, get) => ({
	ids: null,
	error: null,
	cache: {},
	loadingId: null,
	fetchNationsIds: async () => {
		try {
			const ids: string[] = await getNationsIds();
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
	fetchNationDetails: async (id) => {
		const { cache } = get();

		if (cache[id]) {
			set({ loadingId: null });
			return;
		}

		try {
			set({ loadingId: id });
			const data = await getNationDetails(id);
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
