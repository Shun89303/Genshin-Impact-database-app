import { create } from "zustand";
import {
	getAllCommonAscensionMaterialImageIds,
	getAllCommonAscensionMaterialsData,
} from "../services/common.ascension.materials.services";
import { Normalized } from "../types/common.ascension.material";

interface CommonAscensionMaterialsState {
	error: string | null;
	input: string;
	details: Normalized[];
	loadingId: string | null;
	materialIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
}

export const useCommonAscensionMaterialsStore =
	create<CommonAscensionMaterialsState>((set, get) => ({
		error: null,
		input: "",
		details: [],
		setInput: (i) => set({ input: i }),
		loadingId: null,
		materialIds: [],
		fetchMaterialIds: async () => {
			try {
				const { materialIds } = get();

				if (!materialIds?.length) {
					const materialIds = await getAllCommonAscensionMaterialImageIds();
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
	}));
