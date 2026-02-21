import { create } from "zustand";
import {
	getArtifactDetails,
	getArtifactIds,
	getArtifactImageTypes,
} from "../services/artifacts.services";

interface ArtifactsState {
	ids: string[] | null;
	error: string | null;
	cache: Record<string, unknown>;
	loadingId: string | null;
	failedImageIds: Set<string>;
	markImageFailed: (id: string) => void;
	clearCacheForId?: (id: string) => void;
	fetchArtifactsIds: () => Promise<void>;
	fetchArtifactImageTypes: (id: string) => Promise<string[]>;
	fetchArtifactDetails: (id: string) => Promise<void>;
}

export const useArtifactsStore = create<ArtifactsState>((set, get) => ({
	ids: null,
	error: null,
	cache: {},
	loadingId: null,
	failedImageIds: new Set(),
	fetchArtifactsIds: async () => {
		try {
			const ids: string[] = await getArtifactIds();
			set({ ids });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	fetchArtifactImageTypes: async (id) => {
		try {
			return await getArtifactImageTypes(id);
		} catch (error: any) {
			set({ error: error.message });
			return null;
		}
	},
	fetchArtifactDetails: async (id) => {
		const { cache } = get();

		if (cache[id]) {
			set({ loadingId: null });
			return;
		}

		try {
			set({ loadingId: id });
			const data = await getArtifactDetails(id);
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
	markImageFailed: (id) =>
		set((state) => {
			const updated = new Set(state.failedImageIds);
			updated.add(id);
			return { failedImageIds: updated };
		}),
}));
