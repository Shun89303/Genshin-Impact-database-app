import { useCallback, useEffect, useState } from "react";
import { useCharacterExperienceMaterialsStore } from "../store/useCharacterExperienceStore";

export function useExperienceMaterials() {
	const fetchMaterialIds = useCharacterExperienceMaterialsStore(
		(s) => s.fetchMaterialIds
	);
	const materialIds = useCharacterExperienceMaterialsStore(
		(s) => s.materialIds
	);
	const error = useCharacterExperienceMaterialsStore((s) => s.error);

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

				await fetchMaterialIds();
			} finally {
				setIsLoading(false);
				setIsRefreshing(false);
			}
		},
		[fetchMaterialIds]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		materialIds,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
