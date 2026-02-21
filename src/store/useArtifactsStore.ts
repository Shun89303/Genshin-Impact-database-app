import { create } from "zustand";
import {
	getArtifactDetails,
	getArtifactImageTypes,
	getArtifactsWithImages,
} from "../services/artifacts.services";

interface ArtifactsState {
	ids: string[] | null;
	error: string | null;
	fetchArtifactIds: () => Promise<void>;
	fetchArtifactImageTypes: (id: string) => Promise<string[]>;
	fetchArtifactDetails: (id: string) => Promise<Record<string, unknown>>;
}

export const useArtifactsStore = create<ArtifactsState>((set) => ({
	ids: null,
	error: null,
	fetchArtifactIds: async () => {
		try {
			const ids: string[] = await getArtifactsWithImages();
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
		try {
			return await getArtifactDetails(id);
		} catch (error: any) {
			set({ error: error.message });
			return null;
		}
	},
}));
