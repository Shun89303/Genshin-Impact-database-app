import { useCallback, useEffect, useState } from "react";
import { useWeaponAscensionMaterialsStore } from "../store/useWeaponAscensionStore";

export function useAscensionWeaponMaterials() {
	const fetchAllDetails = useWeaponAscensionMaterialsStore(
		(s) => s.fetchAllDetails
	);
	const details = useWeaponAscensionMaterialsStore((s) => s.details);
	const error = useWeaponAscensionMaterialsStore((s) => s.error);

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
