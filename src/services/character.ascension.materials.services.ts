import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/character.ascension.material";

const materials = endpoints.materials;
const characterAscension = endpoints.characterAscension;

export function getAllCharacterAscensionMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${characterAscension}`);
}
