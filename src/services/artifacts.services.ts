import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { ApiIds, Artifact } from "../types/artifact";

const artifacts = endpoints.artifacts;

export function getArtifactIds(): Promise<ApiIds> {
	return apiClient(artifacts);
}

export function getArtifactDetails(id: string): Promise<Artifact> {
	return apiClient(`${artifacts}/${id}`);
}
