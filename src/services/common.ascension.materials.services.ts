import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/common.ascension.material";

const materials = endpoints.materials;
const commonAscension = endpoints.commonAscension;
const list = endpoints.list;

export function getAllCommonAscensionMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${commonAscension}`);
}

export function getAllCommonAscensionMaterialImageIds() {
	return apiClient(`${materials}${commonAscension}${list}`);
}
