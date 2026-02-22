import { create } from "zustand";
import {
	getCharacterDetails,
	getCharacterImageTypes,
	getCharactersIds,
} from "../services/characters.services";

interface CharactersState {
	ids: string[] | null;
	error: string | null;
	cache: Record<string, unknown>;
	loadingId: string | null;
	clearCacheForId?: (id: string) => void;
	fetchCharactersIds: () => Promise<void>;
	fetchCharacterImageTypes: (id: string) => Promise<string[]>;
	fetchCharacterDetails: (id: any) => Promise<void>;
}

export const useCharactersStore = create<CharactersState>((set, get) => ({
	ids: null,
	error: null,
	cache: {},
	loadingId: null,
	fetchCharactersIds: async () => {
		try {
			const ids: string[] = await getCharactersIds();
			set({ ids });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchCharacterImageTypes: async (id) => {
		try {
			return await getCharacterImageTypes(id);
		} catch (error: any) {
			set({ error: error.message });
			return null;
		}
	},
	fetchCharacterDetails: async (id) => {
		const { cache } = get();

		if (cache[id]) {
			set({ loadingId: null });
			return;
		}

		try {
			set({ loadingId: id });
			const data = await getCharacterDetails(id);
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
