import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/lsmCategory/filterCategories";
import {
	getAllLocalMaterialImageIds,
	getAllLocalMaterialsData,
} from "../services/local.materials.services";
import { ApiObject, Normalized } from "../types/local.material";

interface LocalMaterialsState {
	error: string | null;
	input: string;
	details: Normalized[];
	selectedType: "nation" | null;
	setSelectedType: (type: "nation" | null, sheetRef: any) => void;
	cache: Record<string, unknown>;
	loadingId: string | null;
	materialIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
	groupByType: (
		LSMs: Normalized[],
		type: "nation"
	) => { label: string; data: Normalized[] }[];
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
		materialIds: [],
		fetchMaterialIds: async () => {
			try {
				const { materialIds } = get();

				if (!materialIds.length) {
					const materialIds = await getAllLocalMaterialImageIds();
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
					const apiObject = await getAllLocalMaterialsData();
					const { id, ...cleanedObject } = apiObject;
					const normalizedMaterials = Object.entries(cleanedObject).map(
						([nation, items]) => ({
							nation,
							items: items as ApiObject[],
						})
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
						data: filteredByNation as Normalized[],
					};
				})
				.filter((group) => group.data.length > 0);
		},
	})
);
