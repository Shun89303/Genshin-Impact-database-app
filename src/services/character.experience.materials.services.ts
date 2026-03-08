import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { CharacterExperience } from "../types/character.experience.material";

const materials = endpoints.materials;
const characterExperience = endpoints.characterExperience;

export function getAllCharacterExperienceMaterialsData(): Promise<CharacterExperience> {
	return apiClient(`${materials}${characterExperience}`);
}
