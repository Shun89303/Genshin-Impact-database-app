import { useCallback, useEffect, useState } from "react";
import { useArtifactsStore } from "../store/useArtifactsStore";

export function useArtifacts() {
	const fetchAllDetails = useArtifactsStore((s) => s.fetchAllDetails);
	const details = useArtifactsStore((s) => s.details);
	const error = useArtifactsStore((s) => s.error);

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
				setIsLoading(false);
				setIsRefreshing(false);
			}
		},
		[fetchAllDetails]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		details,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
