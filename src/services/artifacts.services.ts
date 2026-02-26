import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const artifacts = endpoints.artifacts;
const list = endpoints.list;

export async function getArtifactIds() {
	return apiClient(artifacts);
}

export async function getArtifactDetails(id: string) {
	return apiClient(`${artifacts}/${id}`);
}

export async function getArtifactImageTypes(id: string) {
	return apiClient(`${artifacts}/${id}${list}`);
}
