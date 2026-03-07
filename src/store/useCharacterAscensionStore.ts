import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/camCategory/filterCategories";
import { getAllCharacterAscensionMaterialsData } from "../services/character.ascension.materials.services";
import { Normalized } from "../types/character.ascension.material";

interface CharacterAscensionMaterialsState {
	error: string | null;
	input: string;
	details: Normalized[];
	selectedType: "element" | null;
	setSelectedType: (type: "element" | null, sheetRef: any) => void;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	groupByType: (
		cams: Normalized[],
		type: "element"
	) => { label: string; data: Normalized[] }[];
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
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllCharacterAscensionMaterialsData();
					const { id, ...elementsOnly } = apiObject;
					const normalizedData = Object.entries(elementsOnly).flatMap(
						([element, objectValue]) =>
							Object.entries(objectValue).map(([title, itemValue]) => ({
								element,
								title,
								...itemValue,
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
