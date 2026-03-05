import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/filterCategories";
import {
	getCharacterDetails,
	getCharactersIds,
} from "../services/characters.services";
import { Character, CharacterImageAssets } from "../types/character";

interface CharactersState {
	error: string | null;
	ids: string[];
	details: Character[];
	detailsById: Record<string, Character>;
	input: string;
	fetchCharactersIds: () => Promise<void>;
	fetchAllDetails: () => Promise<void>;
	setInput: (i: string) => void;
	selectedType: "vision" | "weapon" | "nation" | null;
	setSelectedType: (
		type: "vision" | "weapon" | "nation" | null,
		sheetRef: any
	) => void;
	groupByType: (
		characters: Character[],
		type: "vision" | "weapon" | "nation"
	) => { label: string; data: Character[] }[];
	// loadingId: string | null;
	// fetchCharacterDetails: (id: any) => Promise<void>;
	// cache: Record<string, unknown>;
	// clearCacheForId?: (id: string) => void;
}

export const useCharactersStore = create<CharactersState>((set, get) => ({
	error: null,
	ids: [],
	input: "",
	details: [],
	detailsById: {},
	selectedType: null,
	setSelectedType: (type, sheetRef) => {
		set({ selectedType: type });
		sheetRef.current.close();
	},
	setInput: (i) => set({ input: i }),
	fetchCharactersIds: async () => {
		try {
			set({ error: null });
			const ids = await getCharactersIds();
			const lowerCaseIds = ids.map((id) => id.toLowerCase());
			set({ ids: lowerCaseIds });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchAllDetails: async () => {
		try {
			set({ error: null });

			let { ids, fetchCharactersIds, details, detailsById } = get();
			if (!ids.length) {
				await fetchCharactersIds();
				ids = get().ids;
			}
			if (details.length && Object.keys(detailsById).length) {
				return;
			}
			const fetchedDetails = await Promise.all(
				ids.map((id) => getCharacterDetails(id))
			);
			const normalized: Record<string, Character> = {};
			fetchedDetails.forEach((char) => {
				const images: CharacterImageAssets = {
					card: "card",
					constellation: "constellation",
					constellation1: "constellation-1",
					constellation2: "constellation-2",
					constellation3: "constellation-3",
					constellation4: "constellation-4",
					constellation5: "constellation-5",
					constellation6: "constellation-6",
					constellationShape: "constellation-shape",
					gachaCard: "gacha-card",
					gachaSplash: "gacha-splash",
					icon: "icon",
					iconBig: "icon-big",
					iconSide: "icon-side",
					namecardBackground: "namecard-background",
					portrait: "portrait",
					talentBurst: "talent-burst",
					talentNa: "talent-na",
					talentPassive0: "talent-passive-0",
					talentPassive1: "talent-passive-1",
					talentPassive2: "talent-passive-2",
					talentSkill: "talent-skill",
				};

				normalized[char.id] = {
					...char,
					images,
				};
			});
			set({ details: fetchedDetails });
			set({ detailsById: normalized });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
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
