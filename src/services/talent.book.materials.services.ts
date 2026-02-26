import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const talentBook = endpoints.talentBook;
const list = endpoints.list;

export async function getAllTalentBookMaterialsData() {
	return apiClient(`${materials}${talentBook}`);
}

export async function getAllTalentBookMaterialImageIds() {
	return apiClient(`${materials}${talentBook}${list}`);
}
