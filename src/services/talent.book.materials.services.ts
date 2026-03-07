import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/talent.book";

const materials = endpoints.materials;
const talentBook = endpoints.talentBook;

export function getAllTalentBookMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${talentBook}`);
}
