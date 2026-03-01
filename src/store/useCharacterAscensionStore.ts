import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/camCategory/filterCategories";
import {
	getAllCharacterAscensionMaterialImageIds,
	getAllCharacterAscensionMaterialsData,
} from "../services/character.ascension.materials.services";
import {
	CharacterAscensionApi,
	MaterialTier,
} from "../types/character.ascension.material";

interface CharacterAscensionMaterialsState {
	error: string | null;
	input: string;
	details: MaterialTier[];
	selectedType: "element" | null;
	setSelectedType: (type: "element" | null, sheetRef: any) => void;
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
		cams: MaterialTier[],
		type: "element"
	) => { label: string; data: MaterialTier[] }[];
}

export const useCharacterAscensionMaterialsStore =
	create<CharacterAscensionMaterialsState>((set, get) => ({
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
				const allMaterials = await getAllCharacterAscensionMaterialsData();
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
					const materialIds = await getAllCharacterAscensionMaterialImageIds();
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
					const apiObject = await getAllCharacterAscensionMaterialsData();
					const { id: _ignored, ...elementsOnly } =
						apiObject as CharacterAscensionApi;
					const normalizedData: MaterialTier[] = Object.entries(
						elementsOnly
					).flatMap(([element, tiers]) =>
						Object.values(tiers).map((material: any) => ({
							element,
							id: material.id,
							name: material.name,
						}))
					);
					set({ details: normalizedData });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		groupByType: (cams, type) => {
			const options = FILTER_CATEGORIES[type];

			return options
				.map((option) => ({
					label: option,
					data: cams.filter((cam) => {
						const value = cam[type];

						return value === option;
					}),
				}))
				.filter((group) => group.data.length > 0);
		},
	}));
