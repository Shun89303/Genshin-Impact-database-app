import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { ApiIds, Boss } from "../types/boss";

const boss = endpoints.boss;
const weeklyBoss = endpoints.weeklyBoss;

// will return an ARRAY of over 80 Boss id strings
export function getBossesIds(): Promise<ApiIds> {
	return apiClient(`${boss}${weeklyBoss}`);
}

// will return a huge OBJECT containing all the details of a Boss
export function getBossDetails(id: string): Promise<Boss> {
	return apiClient(`${boss}${weeklyBoss}/${id}`);
}
