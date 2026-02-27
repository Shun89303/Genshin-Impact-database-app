import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const consumables = endpoints.consumables;
const potions = endpoints.potions;
const food = endpoints.food;
const list = endpoints.list;

// returns a huge object containing key as id and value as the entire details of the id
export function getAllPotionsData() {
	return apiClient(`${consumables}${potions}`);
}

// returns an array containing all the ids of image endpoints
export function getAllPotionImageIds() {
	return apiClient(`${consumables}${potions}${list}`);
}

// returns a huge object containing key as id and value as the entire details of the id
export function getAllFoodData() {
	return apiClient(`${consumables}${food}`);
}

// returns an array containing all the ids of image endpoints
export function getAllFoodImageIds() {
	return apiClient(`${consumables}${food}${list}`);
}
