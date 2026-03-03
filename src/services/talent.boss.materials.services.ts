import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { Api } from "../types/talent.boss";

const materials = endpoints.materials;
const talentBoss = endpoints.talentBoss;
const list = endpoints.list;

export function getAllTalentBossMaterialsData(): Promise<Api> {
	return apiClient(`${materials}${talentBoss}`);
}

export function getAllTalentBossMaterialImageIds() {
	return apiClient(`${materials}${talentBoss}${list}`);
}
