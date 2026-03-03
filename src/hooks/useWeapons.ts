import { useCallback, useEffect, useState } from "react";
import { useWeaponsStore } from "../store/useWeaponsStore";

export function useWeapons() {
	const fetchAllDetails = useWeaponsStore((s) => s.fetchAllDetails);
	const details = useWeaponsStore((s) => s.details);
	const error = useWeaponsStore((s) => s.error);

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
