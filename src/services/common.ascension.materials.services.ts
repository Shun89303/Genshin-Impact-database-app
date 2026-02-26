import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const commonAscension = endpoints.commonAscension;
const list = endpoints.list;

export async function getAllCommonAscensionMaterialsData() {
	return apiClient(`${materials}${commonAscension}`);
}

export async function getAllCommonAscensionMaterialImageIds() {
	return apiClient(`${materials}${commonAscension}${list}`);
}
