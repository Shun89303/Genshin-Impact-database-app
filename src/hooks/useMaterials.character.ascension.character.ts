import { useCallback, useEffect, useState } from "react";
import { useCharacterAscensionMaterialsStore } from "../store/useCharacterAscensionStore";

export function useCharacterAscensionMaterials() {
	const fetchAllDetails = useCharacterAscensionMaterialsStore(
		(s) => s.fetchAllDetails
	);
	const details = useCharacterAscensionMaterialsStore((s) => s.details);
	const error = useCharacterAscensionMaterialsStore((s) => s.error);
	const input = useCharacterAscensionMaterialsStore((state) => state.input);
	const selectedType = useCharacterAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const groupByType = useCharacterAscensionMaterialsStore(
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
