import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Food } from "../types/food";
import { PotionApi } from "../types/potion";

const consumables = endpoints.consumables;
const potions = endpoints.potions;
const food = endpoints.food;
const list = endpoints.list;

// returns a huge object containing key as id and value as the entire details of the id
export function getAllPotionsData(): Promise<Record<string, PotionApi>> {
	return apiClient(`${consumables}${potions}`);
}

// returns an array containing all the ids of image endpoints
export function getAllPotionImageIds() {
	return apiClient(`${consumables}${potions}${list}`);
}

// returns a huge object containing key as id and value as the entire details of the id
export function getAllFoodData(): Promise<Record<string, Food>> {
	return apiClient(`${consumables}${food}`);
}
