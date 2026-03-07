import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/wamCategory/filterCategories";
import { getAllWeaponAscensionMaterialsData } from "../services/weapon.ascension.materials.services";
import { Normalized } from "../types/weapon.ascension.material";

interface WeaponAscensionMaterialsState {
	error: string | null;
	input: string;
	details: Normalized[];
	selectedType: "availability" | null;
	setSelectedType: (type: "availability" | null, sheetRef: any) => void;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
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
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllWeaponAscensionMaterialsData();
					const { id, ...materialsOnly } = apiObject;
					const apiArray = Object.entries(materialsOnly);
					const normalizedArray = apiArray.map(([key, value]) => ({
						id: key,
						...value,
					}));
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
