import { create } from "zustand";
import { getAllWeaponExperienceMaterialsData } from "../services/weapon.experience.materials.services";
import { EnhancementItem } from "../types/weapon.experience.material";

interface WeaponExperienceMaterialsState {
	error: string | null;
	details: EnhancementItem[];
	fetchAllDetails: () => Promise<void>;
}

export const useWeaponExperienceMaterialsStore =
	create<WeaponExperienceMaterialsState>((set, get) => ({
		error: null,
		details: [],
		fetchAllDetails: async () => {
			try {
				let { details } = get();
				if (!details.length) {
					const apiObject = await getAllWeaponExperienceMaterialsData();

					const normalizedArray = apiObject.items.map((item) => ({ ...item }));

					set({ details: normalizedArray });
				}
			} catch (error: any) {
				set({ error: error.message });
			}
		},
	}));
