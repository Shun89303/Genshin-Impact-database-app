import { useCallback, useEffect, useState } from "react";
import { useLocalMaterialsStore } from "../store/useLocalMaterialsStore";

export function useLocalMaterials() {
	const fetchAllDetails = useLocalMaterialsStore((s) => s.fetchAllDetails);
	const details = useLocalMaterialsStore((s) => s.details);
	const error = useLocalMaterialsStore((s) => s.error);

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
