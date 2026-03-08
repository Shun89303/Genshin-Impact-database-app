import { create } from "zustand";

import { getAllCharacterExperienceMaterialsData } from "../services/character.experience.materials.services";
import { CharacterExperienceItem } from "../types/character.experience.material";

interface CharacterExperienceMaterialsState {
	error: string | null;
	details: CharacterExperienceItem[];
	fetchAllDetails: () => Promise<void>;
}

export const useCharacterExperienceMaterialsStore =
	create<CharacterExperienceMaterialsState>((set, get) => ({
		error: null,
		details: [],
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllCharacterExperienceMaterialsData();
					const normalizedArray = apiObject.items.map((item) => ({ ...item }));

					set({ details: normalizedArray });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
	}));
