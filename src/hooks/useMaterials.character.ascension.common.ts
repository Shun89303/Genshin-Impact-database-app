import { useCallback, useEffect, useState } from "react";
import { useCommonAscensionMaterialsStore } from "../store/useCommonAscensionStore";

export function useCommonAscensionMaterials() {
	const fetchAllDetails = useCommonAscensionMaterialsStore(
		(s) => s.fetchAllDetails
	);
	const details = useCommonAscensionMaterialsStore((s) => s.details);
	const error = useCommonAscensionMaterialsStore((s) => s.error);

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
