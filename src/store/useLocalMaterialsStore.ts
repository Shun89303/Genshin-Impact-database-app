import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/lsmCategory/filterCategories";
import {
	getAllLocalMaterialImageIds,
	getAllLocalMaterialsData,
} from "../services/local.materials.services";
import { LocalSpecialties } from "../types/local.material";

interface LocalMaterialsState {
	error: string | null;
	input: string;
	details: LocalSpecialties[];
	selectedType: "nation" | null;
	setSelectedType: (type: "nation" | null, sheetRef: any) => void;
	cache: Record<string, unknown>;
	loadingId: string | null;
	materialsObject: Record<string, unknown>;
	materialIds: string[] | null;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchMaterialsObject: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
	storeMaterialDetails: (id: string) => void;
	groupByType: (
		LSMs: LocalSpecialties[],
		type: "nation"
	) => { label: string; data: LocalSpecialties[] }[];
}

export const useLocalMaterialsStore = create<LocalMaterialsState>(
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
				const allMaterials = await getAllLocalMaterialsData();
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
					const materialIds = await getAllLocalMaterialImageIds();
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
					const apiObject = await getAllLocalMaterialsData();
					const normalizedMaterials: LocalSpecialties[] = Object.entries(
						apiObject
					)
						.filter(([key]) => key !== "id")
						.flatMap(([nation, materials]) =>
							(materials as Omit<LocalSpecialties, "nation">[]).map((mat) => ({
								...mat,
								nation,
							}))
						);

					set({ details: normalizedMaterials });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		groupByType: (lsms, type) => {
			const options = FILTER_CATEGORIES[type];

			return options
				.map((option) => {
					const filteredByNation = lsms.filter((mat) => mat.nation === option);
					return {
						label: option,
						data: filteredByNation as LocalSpecialties[],
					};
				})
				.filter((group) => group.data.length > 0);
		},
	})
);
