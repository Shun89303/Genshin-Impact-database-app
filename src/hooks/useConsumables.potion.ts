import { useCallback, useEffect, useState } from "react";
import { usePotionStore } from "../store/usePotion.consumables.store";

export function usePotionConsumables() {
	const fetchAllDetails = usePotionStore((s) => s.fetchAllDetails);
	const details = usePotionStore((s) => s.details);
	const error = usePotionStore((s) => s.error);
	const input = usePotionStore((state) => state.input);

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
		details,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
