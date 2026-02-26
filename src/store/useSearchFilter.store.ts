import { create } from "zustand";

import { FILTER_CATEGORIES } from "../config/filterCategories";
import {
	getCharacterDetails,
	getCharactersIds,
} from "../services/characters.services";
import { Character } from "../types/character";

interface SearchState {
	error: string | null;
	ids: string[];
	input: string;
	details: Character[];
	selectedType: "vision" | "weapon" | "nation" | null;
	setSelectedType: (
		type: "vision" | "weapon" | "nation" | null,
		sheetRef: any
	) => void;
	fetchIds: () => Promise<void>;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	groupByType: (
		characters: Character[],
		type: "vision" | "weapon" | "nation"
	) => { label: string; data: Character[] }[];
}

export const useSearchFilter = create<SearchState>((set, get) => ({
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
	fetchIds: async () => {
		try {
			const ids = await getCharactersIds();
			set({ ids });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchAllDetails: async () => {
		try {
			let { ids, fetchIds } = get();
			if (!ids.length) {
				await fetchIds();
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
	groupByType: (characters, type) => {
		const options = FILTER_CATEGORIES[type];

		return options.map((option) => ({
			label: option,
			data: characters.filter((char) => char[type] === option),
		}));
	},
}));
