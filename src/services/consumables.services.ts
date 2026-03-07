import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Food } from "../types/food";
import { Potion } from "../types/potion";

const consumables = endpoints.consumables;
const potions = endpoints.potions;
const food = endpoints.food;

// returns a huge object containing key as id and value as the entire details of the id
export function getAllPotionsData(): Promise<Record<string, Potion>> {
	return apiClient(`${consumables}${potions}`);
}

// returns a huge object containing key as id and value as the entire details of the id
export function getAllFoodData(): Promise<Record<string, Food>> {
	return apiClient(`${consumables}${food}`);
}
