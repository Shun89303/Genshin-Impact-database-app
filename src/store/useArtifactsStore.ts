import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/filterCategories";
import {
	getArtifactDetails,
	getArtifactIds,
	getArtifactImageTypes,
} from "../services/artifacts.services";
import { Artifact } from "../types/artifact";

interface ArtifactsState {
	error: string | null;
	ids: string[];
	input: string;
	details: Artifact[];
	selectedType: "max_rarity" | null;
	setSelectedType: (type: "max_rarity" | null, sheetRef: any) => void;
	cache: Record<string, unknown>;
	loadingId: string | null;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	failedImageIds: Set<string>;
	markImageFailed: (id: string) => void;
	clearCacheForId?: (id: string) => void;
	fetchArtifactsIds: () => Promise<void>;
	fetchArtifactImageTypes: (id: string) => Promise<string[]>;
	fetchArtifactDetails: (id: string) => Promise<void>;
	groupByType: (
		artifacts: Artifact[],
		type: "max_rarity"
	) => { label: string; data: Artifact[] }[];
}

export const useArtifactsStore = create<ArtifactsState>((set, get) => ({
	error: null,
	ids: [],
	input: "",
	details: [],
	selectedType: null,
	setSelectedType: (type, sheetRef) => {
		set({ selectedType: type });
		sheetRef.current.close();
	},
	setInput: (i) => set({ input: i }),
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
	fetchAllDetails: async () => {
		try {
			let { ids, fetchArtifactsIds } = get();
			if (!ids.length) {
				await fetchArtifactsIds();
				ids = get().ids;
			}
			const details = await Promise.all(
				ids.map((id) => getArtifactDetails(id))
			);
			set({ details });
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
	groupByType: (artifacts, type) => {
		const options = FILTER_CATEGORIES[type];

		return options
			.map((option) => ({
				label: `${option} stars`,
				data: artifacts.filter((art) => art[type] === option),
			}))
			.filter((group) => group.data.length > 0);
	},
}));
