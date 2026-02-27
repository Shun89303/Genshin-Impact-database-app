import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const commonAscension = endpoints.commonAscension;
const list = endpoints.list;

export function getAllCommonAscensionMaterialsData() {
	return apiClient(`${materials}${commonAscension}`);
}

export function getAllCommonAscensionMaterialImageIds() {
	return apiClient(`${materials}${commonAscension}${list}`);
}
