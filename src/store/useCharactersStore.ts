import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/filterCategories";
import {
	getCharacterDetails,
	getCharacterImageTypes,
	getCharactersIds,
} from "../services/characters.services";
import { Character } from "../types/character";

interface CharactersState {
	error: string | null;
	ids: string[];
	input: string;
	details: Character[];
	selectedType: "vision" | "weapon" | "nation" | null;
	setSelectedType: (
		type: "vision" | "weapon" | "nation" | null,
		sheetRef: any
	) => void;
	cache: Record<string, unknown>;
	loadingId: string | null;
	clearCacheForId?: (id: string) => void;
	fetchCharactersIds: () => Promise<void>;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchCharacterImageTypes: (id: string) => Promise<string[]>;
	fetchCharacterDetails: (id: any) => Promise<void>;
	groupByType: (
		characters: Character[],
		type: "vision" | "weapon" | "nation"
	) => { label: string; data: Character[] }[];
}

export const useCharactersStore = create<CharactersState>((set, get) => ({
	error: null,
	ids: [],
	input: "",
	details: [],
	selectedType: null,
	setSelectedType: (type, sheetRef) => {
		set({ selectedType: type });
		sheetRef.current.close();
	},
	setInput: (i) => set({ input: i }),
	cache: {},
	loadingId: null,
	fetchCharactersIds: async () => {
		try {
			const ids = await getCharactersIds();
			set({ ids });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchAllDetails: async () => {
		try {
			let { ids, fetchCharactersIds } = get();
			if (!ids.length) {
				await fetchCharactersIds();
				ids = get().ids;
			}
			const details = await Promise.all(
				ids.map((id) => getCharacterDetails(id))
			);
			set({ details });
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
	groupByType: (characters, type) => {
		const options = FILTER_CATEGORIES[type];

		return options
			.map((option) => ({
				label: option,
				data: characters.filter((char) => char[type] === option),
			}))
			.filter((group) => group.data.length > 0);
	},
}));
