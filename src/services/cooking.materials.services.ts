import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/cooking.material";

const materials = endpoints.materials;
const cookingIngredients = endpoints.cookingIngredients;

export function getAllCookingMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${cookingIngredients}`);
}
