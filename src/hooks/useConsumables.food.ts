import { useCallback, useEffect, useState } from "react";
import { useFoodStore } from "../store/useFood.consumables.store";

export function useFoodConsumables() {
	const fetchAllDetails = useFoodStore((s) => s.fetchAllDetails);
	const details = useFoodStore((s) => s.details);
	const error = useFoodStore((s) => s.error);

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
