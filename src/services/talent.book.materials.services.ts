import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const talentBook = endpoints.talentBook;
const list = endpoints.list;

export function getAllTalentBookMaterialsData() {
	return apiClient(`${materials}${talentBook}`);
}

export function getAllTalentBookMaterialImageIds() {
	return apiClient(`${materials}${talentBook}${list}`);
}
