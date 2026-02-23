import { create } from "zustand";
import {
	getAllBossMaterialImageIds,
	getAllBossMaterialsData,
} from "../services/bosses.materials.services";

interface BossMaterialsState {
	error: string | null;
	cache: Record<string, unknown>;
	materialsObject: Record<string, unknown>;
	materialIds: [];
	fetchMaterialsObject: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
}

export const useBossMaterialsStore = create<BossMaterialsState>((set) => ({
	error: null,
	cache: {},
	materialsObject: {},
	materialIds: [],
	fetchMaterialsObject: async () => {
		try {
			const materialsObject = await getAllBossMaterialsData();
			set({ materialsObject });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchMaterialIds: async () => {
		try {
			const materialIds = await getAllBossMaterialImageIds();
			set({ materialIds });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
}));
