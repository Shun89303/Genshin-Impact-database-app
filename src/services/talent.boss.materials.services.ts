import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const materials = endpoints.materials;
const talentBoss = endpoints.talentBoss;
const list = endpoints.list;

export async function getAllTalentBossMaterialsData() {
	return apiClient(`${materials}${talentBoss}`);
}

export async function getAllTalentBossMaterialImageIds() {
	return apiClient(`${materials}${talentBoss}${list}`);
}
