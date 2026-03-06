import { create } from "zustand";
import { getBossDetails, getBossesIds } from "../services/bosses.services";
import { Boss } from "../types/boss";

interface BossesState {
	error: string | null;
	ids: string[];
	details: Boss[];
	input: string;
	fetchBossesIds: () => Promise<void>;
	fetchAllDetails: () => Promise<void>;
	setInput: (i: string) => void;
}

export const useBossesStore = create<BossesState>((set, get) => ({
	error: null,
	ids: [],
	details: [],
	input: "",
	fetchBossesIds: async () => {
		const { ids } = get();
		if (ids.length) {
			return;
		}
		try {
			const ids = await getBossesIds();
			set({ ids });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchAllDetails: async () => {
		try {
			set({ error: null });
			let { ids, fetchBossesIds, details } = get();
			if (!ids.length) {
				await fetchBossesIds();
				ids = get().ids;
			}
			if (details.length) {
				return;
			}
			const fetchedDetails = await Promise.all(
				ids.map((id) => getBossDetails(id))
			);
			set({ details: fetchedDetails });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	setInput: (i) => set({ input: i }),
}));
