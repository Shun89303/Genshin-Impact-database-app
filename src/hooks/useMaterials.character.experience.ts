import { useCallback, useEffect, useState } from "react";
import { useCharacterExperienceMaterialsStore } from "../store/useCharacterExperienceStore";

export function useExperienceMaterials() {
	const fetchAllDetails = useCharacterExperienceMaterialsStore(
		(s) => s.fetchAllDetails
	);
	const error = useCharacterExperienceMaterialsStore((s) => s.error);
	const details = useCharacterExperienceMaterialsStore((s) => s.details);

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
