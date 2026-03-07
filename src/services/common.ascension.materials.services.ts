import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/common.ascension.material";

const materials = endpoints.materials;
const commonAscension = endpoints.commonAscension;

export function getAllCommonAscensionMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${commonAscension}`);
}
