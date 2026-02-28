import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/talentBookCategory/filterCategories";
import {
	getAllTalentBookMaterialImageIds,
	getAllTalentBookMaterialsData,
} from "../services/talent.book.materials.services";
import { TalentBook } from "../types/talent.book";

interface TalentBookMaterialsState {
	error: string | null;
	input: string;
	details: TalentBook[];
	selectedType: "availability" | "rarity" | null;
	setSelectedType: (
		type: "availability" | "rarity" | null,
		sheetRef: any
	) => void;
	cache: Record<string, unknown>;
	loadingId: string | null;
	materialsObject: Record<string, unknown>;
	materialIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchMaterialsObject: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
	storeMaterialDetails: (id: string) => void;
	groupByType: (
		books: TalentBook[],
		type: "availability" | "rarity"
	) => { label: string; data: TalentBook[] }[];
}

export const useTalentBookMaterialsStore = create<TalentBookMaterialsState>(
	(set, get) => ({
		error: null,
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
		materialsObject: {},
		materialIds: [],
		fetchMaterialsObject: async () => {
			const { materialsObject } = get();
			if (Object.keys(materialsObject).length > 0) return;
			try {
				const allMaterials = await getAllTalentBookMaterialsData();
				const allMaterialsArray = Object.entries(allMaterials);
				const withoutListItem = allMaterialsArray.slice(0, -1);
				const materialsObject = Object.fromEntries(withoutListItem);
				set({ materialsObject });
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		fetchMaterialIds: async () => {
			try {
				const { materialIds } = get();

				if (!materialIds?.length) {
					const materialIds = await getAllTalentBookMaterialImageIds();
					set({ materialIds });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		storeMaterialDetails: (id) => {
			const { materialsObject, cache } = get();
			if (cache[id]) {
				set({ loadingId: null });
				return;
			}

			set({ loadingId: id });
			const details = materialsObject[id];
			set((state) => ({
				cache: { ...state.cache, [id]: details },
				loadingId: null,
			}));
		},
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllTalentBookMaterialsData();
					const { id: _ignored, ...booksOnly } = apiObject;
					const normalizedBooks = Object.entries(booksOnly).map(
						([key, value]) => ({
							id: key,
							...value,
						})
					);
					set({ details: normalizedBooks });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		groupByType: (books, type) => {
			const options = FILTER_CATEGORIES[type];

			return options
				.map((option) => {
					const filteredBooks = books
						.map((book) => {
							if (type === "availability" && typeof option === "string") {
								return book.availability.includes(option) ? book : null;
							} else {
								const filteredItems = book.items.filter(
									(item) => item.rarity === option
								);
								if (filteredItems.length === 0) return null;

								return {
									...book,
									items: filteredItems,
								};
							}
						})
						.filter((book) => book !== null);

					return {
						label: typeof option === "number" ? `${option} stars` : option,
						data: filteredBooks as TalentBook[],
					};
				})
				.filter((group) => group.data.length > 0);
		},
	})
);
