import { useCallback, useEffect, useState } from "react";
import { useBossMaterialsStore } from "../store/useBossMaterialsStore";

export function useBossMaterials() {
	const fetchAllDetails = useBossMaterialsStore((s) => s.fetchAllDetails);
	const details = useBossMaterialsStore((s) => s.details);
	const error = useBossMaterialsStore((s) => s.error);

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
