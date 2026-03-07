import { useCallback, useEffect, useState } from "react";
import { useCookingMaterialsStore } from "../store/useCookingMaterialsStore";

export function useCookingMaterials() {
	const fetchAllDetails = useCookingMaterialsStore((s) => s.fetchAllDetails);
	const details = useCookingMaterialsStore((s) => s.details);
	const error = useCookingMaterialsStore((s) => s.error);
	const input = useCookingMaterialsStore((state) => state.input);

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
		details,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
