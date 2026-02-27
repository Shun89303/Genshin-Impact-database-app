import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const talentBoss = endpoints.talentBoss;
const list = endpoints.list;

export function getAllTalentBossMaterialsData() {
	return apiClient(`${materials}${talentBoss}`);
}

export function getAllTalentBossMaterialImageIds() {
	return apiClient(`${materials}${talentBoss}${list}`);
}
