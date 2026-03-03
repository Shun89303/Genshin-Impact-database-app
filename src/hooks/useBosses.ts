import { useCallback, useEffect, useState } from "react";
import { useBossesStore } from "../store/useBossesStore";

export function useBosses() {
	const fetchBossesIds = useBossesStore((s) => s.fetchBossesIds);
	const ids = useBossesStore((s) => s.ids);
	const error = useBossesStore((s) => s.error);

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

				await fetchBossesIds();
			} finally {
				setIsLoading(false);
				setIsRefreshing(false);
			}
		},
		[fetchBossesIds]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		ids,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
