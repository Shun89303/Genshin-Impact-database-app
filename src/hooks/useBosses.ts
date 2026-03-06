import { useCallback, useEffect, useState } from "react";
import { useBossesStore } from "../store/useBossesStore";

export function useBosses() {
	const fetchAllDetails = useBossesStore((s) => s.fetchAllDetails);
	const ids = useBossesStore((s) => s.ids);
	const details = useBossesStore((s) => s.details);
	const error = useBossesStore((s) => s.error);
	const input = useBossesStore((s) => s.input);

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
				setTimeout(() => {
					setIsLoading(false);
					setIsRefreshing(false);
				}, 1500);
			}
		},
		[fetchAllDetails]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		ids,
		details,
		input,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
