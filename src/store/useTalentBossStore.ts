import { create } from "zustand";
import { getAllTalentBossMaterialsData } from "../services/talent.boss.materials.services";
import { ApiObject } from "../types/talent.boss";

interface TalentBossMaterialsState {
	error: string | null;
	input: string;
	details: ApiObject[];
	setInput: (i: string) => void;
	fetchAllDetails: () => Promise<void>;
}

export const useTalentBossMaterialsStore = create<TalentBossMaterialsState>(
	(set, get) => ({
		error: null,
		input: "",
		details: [],
		setInput: (i) => set({ input: i }),
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllTalentBossMaterialsData();
					const { id, ...cleanedObject } = apiObject;
					const cleanedArray = Object.entries(cleanedObject);
					const normalizedArray = cleanedArray.map(([key, value]) => ({
						...value,
					}));
					set({ details: normalizedArray });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
	})
);
