import { useCallback, useEffect, useState } from "react";
import { useCharacterAscensionMaterialsStore } from "../store/useCharacterAscensionStore";

export function useCharacterAscensionMaterials() {
	const fetchAllDetails = useCharacterAscensionMaterialsStore(
		(s) => s.fetchAllDetails
	);
	const details = useCharacterAscensionMaterialsStore((s) => s.details);
	const error = useCharacterAscensionMaterialsStore((s) => s.error);

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
