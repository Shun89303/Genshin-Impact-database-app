import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/cooking.material";

const materials = endpoints.materials;
const cookingIngredients = endpoints.cookingIngredients;
const list = endpoints.list;

export function getAllCookingMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${cookingIngredients}`);
}

export function getAllCookingMaterialImageIds() {
	return apiClient(`${materials}${cookingIngredients}${list}`);
}
