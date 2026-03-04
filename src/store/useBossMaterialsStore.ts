import { create } from "zustand";
import {
	getAllBossMaterialImageIds,
	getAllBossMaterialsData,
} from "../services/bosses.materials.services";
import { Normalized } from "../types/boss.material";

interface BossMaterialsState {
	error: string | null;
	input: string;
	details: Normalized[];
	loadingId: string | null;
	materialIds: string[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchMaterialIds: () => Promise<void>;
}

export const useBossMaterialsStore = create<BossMaterialsState>((set, get) => ({
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
				const materialIds = await getAllBossMaterialImageIds();
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
				const apiObject = await getAllBossMaterialsData();
				const { id, ...bossMaterialsOnly } = apiObject;
				const normalized = Object.entries(bossMaterialsOnly).map(
					([id, value]) => ({
						id,
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
