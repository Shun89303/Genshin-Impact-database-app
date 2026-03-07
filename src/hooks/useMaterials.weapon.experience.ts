import { useCallback, useEffect, useState } from "react";
import { useWeaponExperienceMaterialsStore } from "../store/useWeaponExperienceStore";

export function useExperienceWeaponMaterials() {
	const fetchAllDetails = useWeaponExperienceMaterialsStore(
		(s) => s.fetchAllDetails
	);
	const error = useWeaponExperienceMaterialsStore((s) => s.error);
	const details = useWeaponExperienceMaterialsStore((s) => s.details);

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
