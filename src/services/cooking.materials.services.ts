import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const cookingIngredients = endpoints.cookingIngredients;
const list = endpoints.list;

export function getAllCookingMaterialsData(): Promise<Record<string, any>> {
	return apiClient(`${materials}${cookingIngredients}`);
}

export function getAllCookingMaterialImageIds() {
	return apiClient(`${materials}${cookingIngredients}${list}`);
}
