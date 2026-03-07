import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/commonCategory/filterCategories";
import { getAllCommonAscensionMaterialsData } from "../services/common.ascension.materials.services";
import { Normalized } from "../types/common.ascension.material";

interface CommonAscensionMaterialsState {
	error: string | null;
	input: string;
	details: Normalized[];
	selectedType: "rarity" | null;
	setSelectedType: (type: "rarity" | null, sheetRef: any) => void;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	groupByType: (
		LSMs: Normalized[],
		type: "rarity"
	) => { label: string; data: Normalized[] }[];
}

export const useCommonAscensionMaterialsStore =
	create<CommonAscensionMaterialsState>((set, get) => ({
		error: null,
		input: "",
		details: [],
		selectedType: null,
		setSelectedType: (type, sheetRef) => {
			set({ selectedType: type });
			sheetRef.current.close();
		},
		setInput: (i) => set({ input: i }),
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllCommonAscensionMaterialsData();
					const { id, ...materialsOnly } = apiObject;
					const normalized = Object.entries(materialsOnly).map(
						([material, value]) => ({
							material,
							...value,
						})
					);
					set({ details: normalized });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		groupByType: (commons, type) => {
			const options = FILTER_CATEGORIES[type];

			return options
				.map((option) => {
					const filtered = commons
						.map((mat) => {
							const items = mat.items.filter((item) => item.rarity === option);

							if (!items.length) return null;

							return {
								...mat,
								items,
							};
						})
						.filter(Boolean) as Normalized[];

					return {
						label: `${option}★`,
						data: filtered,
					};
				})
				.filter((group) => group.data.length > 0);
		},
	}));
