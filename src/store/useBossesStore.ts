import { create } from "zustand";
import {
	getBossDetails,
	getBossesIds,
	getBossImageTypes,
} from "../services/bosses.services";

interface BossesState {
	error: string | null;
	ids: string[];
	cache: Record<string, unknown>;
	loadingId: string | null;
	clearCacheForId?: (id: string) => void;
	fetchBossesIds: () => Promise<void>;
	fetchBossImageTypes: (id: string) => Promise<string[]>;
	fetchBossDetails: (id: any) => Promise<void>;
}

export const useBossesStore = create<BossesState>((set, get) => ({
	ids: [],
	error: null,
	cache: {},
	loadingId: null,
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
	fetchBossImageTypes: async (id) => {
		try {
			return await getBossImageTypes(id);
		} catch (error: any) {
			set({ error: error.message });
			return null;
		}
	},
	fetchBossDetails: async (id) => {
		const { cache } = get();

		if (cache[id]) {
			set({ loadingId: null });
			return;
		}

		try {
			set({ loadingId: id });
			const data = await getBossDetails(id);
			set((state) => ({
				cache: { ...state.cache, [id]: data },
				loadingId: null,
			}));
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	clearCacheForId: (id: string) =>
		set((state) => {
			const newCache = { ...state.cache };
			delete newCache[id];
			return { cache: newCache };
		}),
}));
