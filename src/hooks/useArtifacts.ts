import { useCallback, useEffect, useState } from "react";
import { useArtifactsStore } from "../store/useArtifactsStore";

export function useArtifacts() {
	const fetchAllDetails = useArtifactsStore((s) => s.fetchAllDetails);
	const details = useArtifactsStore((s) => s.details);
	const error = useArtifactsStore((s) => s.error);
	const ids = useArtifactsStore((state) => state.ids);
	const input = useArtifactsStore((state) => state.input);
	const selectedType = useArtifactsStore((state) => state.selectedType);
	const groupByType = useArtifactsStore((state) => state.groupByType);

	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const fetchData = useCallback(
		async (refresh = false) => {
			try {
				if (refresh) {
					setIsRefreshing(true);
				} else {
					setIsLoading(true);
				}

				await fetchAllDetails();
			} finally {
				setTimeout(() => {
					setIsLoading(false);
					setIsRefreshing(false);
				}, 1500);
			}
		},
		[fetchAllDetails]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		ids,
		input,
		selectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
