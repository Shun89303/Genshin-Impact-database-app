import { create } from "zustand";
import { FILTER_CATEGORIES } from "../config/category/filterCategories";
import {
	getArtifactDetails,
	getArtifactIds,
} from "../services/artifacts.services";
import { Artifact } from "../types/artifact";

interface ArtifactsState {
	error: string | null;
	ids: string[];
	input: string;
	details: Artifact[];
	selectedType: "max_rarity" | null;
	setSelectedType: (type: "max_rarity" | null, sheetRef: any) => void;
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
	fetchArtifactsIds: () => Promise<void>;
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
			let { ids, fetchArtifactsIds, details } = get();
			if (!ids.length) {
				await fetchArtifactsIds();
				ids = get().ids;
			}
			if (details.length) {
				return;
			}
			const fetchedDetails = await Promise.all(
				ids.map((id) => getArtifactDetails(id))
			);
			set({ details: fetchedDetails });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	groupByType: (artifacts, type) => {
		const options = FILTER_CATEGORIES[type];

		return options
			.map((option) => ({
				label: `${option}★`,
				data: artifacts.filter((art) => art[type] === option),
			}))
			.filter((group) => group.data.length > 0);
	},
}));
