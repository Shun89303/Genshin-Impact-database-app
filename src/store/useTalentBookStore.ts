import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/talentBookCategory/filterCategories";
import {
	getAllTalentBookMaterialImageIds,
	getAllTalentBookMaterialsData,
} from "../services/talent.book.materials.services";
import { Normalized } from "../types/talent.book";

interface TalentBookMaterialsState {
	error: string | null;
	input: string;
	details: Normalized[];
	selectedType: "availability" | "rarity" | null;
	setSelectedType: (
		type: "availability" | "rarity" | null,
		sheetRef: any
	) => void;
	cache: Record<string, unknown>;
	loadingId: string | null;
	materialIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
	groupByType: (
		books: Normalized[],
		type: "availability" | "rarity"
	) => { label: string; data: Normalized[] }[];
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
		materialIds: [],
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
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllTalentBookMaterialsData();
					const { id, ...booksOnly } = apiObject;
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
								return book.availability?.includes(option) ? book : null;
							} else {
								const filteredItems = book.items?.filter(
									(item) => item.rarity === option
								);
								if (filteredItems?.length === 0) return null;

								return {
									...book,
									items: filteredItems,
								};
							}
						})
						.filter((book) => book !== null);

					return {
						label: typeof option === "number" ? `${option} stars` : option,
						data: filteredBooks as Normalized[],
					};
				})
				.filter((group) => group.data.length > 0);
		},
	})
);
