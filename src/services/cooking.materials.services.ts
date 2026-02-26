import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const cookingIngredients = endpoints.cookingIngredients;
const list = endpoints.list;

export async function getAllCookingMaterialsData() {
	return apiClient(`${materials}${cookingIngredients}`);
}

export async function getAllCookingMaterialImageIds() {
	return apiClient(`${materials}${cookingIngredients}${list}`);
}
