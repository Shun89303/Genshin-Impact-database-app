import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const artifacts = endpoints.artifacts;
const list = endpoints.list;

export async function getArtifactIds() {
	return await apiClient(artifacts);
}

export async function getArtifactDetails(id: string) {
	return await apiClient(`${artifacts}/${id}`);
}

export async function getArtifactImageTypes(id: string) {
	return await apiClient(`${artifacts}/${id}${list}`);
}

export async function getArtifactsWithImages() {
	const ids = await getArtifactIds();

	const validIds = await Promise.all(
		ids.map(async (id: any) => {
			try {
				await getArtifactImageTypes(id);
				return id;
			} catch {
				return undefined;
			}
		})
	);

	return validIds.filter(Boolean);
}
