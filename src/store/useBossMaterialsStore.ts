import { create } from "zustand";
import {
	getAllBossMaterialImageIds,
	getAllBossMaterialsData,
} from "../services/bosses.materials.services";

interface BossMaterialsState {
	error: string | null;
	cache: Record<string, unknown>;
	loadingId: string | null;
	materialsObject: Record<string, unknown>;
	materialIds: string[] | null;
	fetchMaterialsObject: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
	storeMaterialDetails: (id: string) => void;
}

export const useBossMaterialsStore = create<BossMaterialsState>((set, get) => ({
	error: null,
	cache: {},
	loadingId: null,
	materialsObject: {},
	materialIds: [],
	fetchMaterialsObject: async () => {
		const { materialsObject } = get();
		if (Object.keys(materialsObject).length > 0) return;
		try {
			const allMaterials = await getAllBossMaterialsData();
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
}));
