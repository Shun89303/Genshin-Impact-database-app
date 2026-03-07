import { useCallback, useEffect, useState } from "react";
import { useCommonAscensionMaterialsStore } from "../store/useCommonAscensionStore";

export function useCommonAscensionMaterials() {
	const fetchAllDetails = useCommonAscensionMaterialsStore(
		(s) => s.fetchAllDetails
	);
	const details = useCommonAscensionMaterialsStore((s) => s.details);
	const error = useCommonAscensionMaterialsStore((s) => s.error);
	const input = useCommonAscensionMaterialsStore((state) => state.input);
	const selectedType = useCommonAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const groupByType = useCommonAscensionMaterialsStore(
		(state) => state.groupByType
	);

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
