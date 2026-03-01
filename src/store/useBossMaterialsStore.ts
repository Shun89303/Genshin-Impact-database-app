import { create } from "zustand";
import {
	getAllBossMaterialImageIds,
	getAllBossMaterialsData,
} from "../services/bosses.materials.services";
import {
	BossMaterialItem,
	NormalizedBossMaterialGroup,
} from "../types/boss.material";

interface BossMaterialsState {
	error: string | null;
	input: string;
	details: NormalizedBossMaterialGroup[];
	cache: Record<string, unknown>;
	loadingId: string | null;
	materialsObject: Record<string, unknown>;
	materialIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchMaterialsObject: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
	storeMaterialDetails: (id: string) => void;
}

export const useBossMaterialsStore = create<BossMaterialsState>((set, get) => ({
	error: null,
	input: "",
	details: [],
	setInput: (i) => set({ input: i }),
	cache: {},
	loadingId: null,
	materialsObject: {},
	materialIds: [],
	fetchMaterialsObject: async () => {
		const { materialsObject } = get();
		if (Object.keys(materialsObject).length > 0) return;
		try {
			const allMaterials = await getAllBossMaterialsData();
			console.log(JSON.stringify(allMaterials, null, 2));
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
				const materialIds = await getAllBossMaterialImageIds();
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
				const apiObject = await getAllBossMaterialsData();
				const normalized = Object.entries(apiObject)
					.filter(([key, value]) => key !== "id")
					.map(([id, item]) => ({
						id,
						...(item as BossMaterialItem),
					}));
				set({ details: normalized });
			}
		} catch (error: any) {
			set({ error: error.message });
		}
	},
}));
