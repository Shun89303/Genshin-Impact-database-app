import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const artifacts = endpoints.artifacts;
const list = endpoints.list;

export function getArtifactIds() {
	return apiClient(artifacts);
}

export function getArtifactDetails(id: string) {
	return apiClient(`${artifacts}/${id}`);
}

export function getArtifactImageTypes(id: string) {
	return apiClient(`${artifacts}/${id}${list}`);
}
