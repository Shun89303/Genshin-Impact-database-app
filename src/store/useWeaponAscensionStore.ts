import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/wamCategory/filterCategories";
import {
	getAllWeaponAscensionMaterialImageIds,
	getAllWeaponAscensionMaterialsData,
} from "../services/weapon.ascension.materials.services";
import { Normalized } from "../types/weapon.ascension.material";

interface WeaponAscensionMaterialsState {
	error: string | null;
	input: string;
	details: Normalized[];
	selectedType: "availability" | null;
	setSelectedType: (type: "availability" | null, sheetRef: any) => void;
	cache: Record<string, unknown>;
	loadingId: string | null;
	materialIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
	groupByType: (
		materials: Normalized[],
		type: "availability"
	) => { label: string; data: Normalized[] }[];
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
		materialIds: [],
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
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllWeaponAscensionMaterialsData();
					const apiArray = Object.entries(apiObject);
					const apiArrayWithoutLastItem = apiArray.slice(0, -1);
					const normalizedArray = apiArrayWithoutLastItem.map(
						([key, value]) => ({
							id: key,
							...value,
						})
					);
					set({ details: normalizedArray });
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
