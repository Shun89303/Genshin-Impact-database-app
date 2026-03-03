import { useCallback, useEffect, useState } from "react";
import { useWeaponExperienceMaterialsStore } from "../store/useWeaponExperienceStore";

export function useExperienceWeaponMaterials() {
	const fetchMaterialIds = useWeaponExperienceMaterialsStore(
		(s) => s.fetchMaterialIds
	);
	const materialIds = useWeaponExperienceMaterialsStore((s) => s.materialIds);
	const error = useWeaponExperienceMaterialsStore((s) => s.error);

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
