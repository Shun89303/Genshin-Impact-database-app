import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/wamCategory/filterCategories";
import {
	getAllWeaponAscensionMaterialImageIds,
	getAllWeaponAscensionMaterialsData,
} from "../services/weapon.ascension.materials.services";
import { wam } from "../types/weapon.ascension.material";

interface WeaponAscensionMaterialsState {
	error: string | null;
	input: string;
	details: wam[];
	selectedType: "availability" | null;
	setSelectedType: (type: "availability" | null, sheetRef: any) => void;
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
		wams: wam[],
		type: "availability"
	) => { label: string; data: wam[] }[];
}

export const useWeaponAscensionMaterialsStore =
	create<WeaponAscensionMaterialsState>((set, get) => ({
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
				const allMaterials = await getAllWeaponAscensionMaterialsData();
				const allMaterialsArray = Object.entries(allMaterials);
				const withoutLastItem = allMaterialsArray.slice(0, -1);
				const materialsObject = Object.fromEntries(withoutLastItem);
				set({ materialsObject });
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		fetchMaterialIds: async () => {
			try {
				const { materialIds } = get();

				if (!materialIds?.length) {
					const materialIds = await getAllWeaponAscensionMaterialImageIds();
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
					const apiObject = await getAllWeaponAscensionMaterialsData();
					const apiArray = Object.entries(apiObject);
					const apiArrayWithoutLastItem = apiArray.slice(0, -1);
					const normalizedWAMArray = apiArrayWithoutLastItem.map(
						([key, value]) => ({
							id: key,
							availability: value.availability,
							items: value.items,
						})
					);
					set({ details: normalizedWAMArray });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
		groupByType: (wams, type) => {
			const options = FILTER_CATEGORIES[type];

			return options
				.map((option) => ({
					label: option,
					data: wams.filter((wam) => {
						const value = wam[type];

						if (Array.isArray(value)) {
							return value.includes(option);
						}

						return value === option;
					}),
				}))
				.filter((group) => group.data.length > 0);
		},
	}));
