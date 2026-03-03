import { useCallback, useEffect, useState } from "react";
import { useNationsStore } from "../store/useNationsStore";

export function useNations() {
	const fetchNationsIds = useNationsStore((s) => s.fetchNationsIds);
	const ids = useNationsStore((s) => s.ids);
	const error = useNationsStore((s) => s.error);

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

				await fetchNationsIds();
			} finally {
				setIsLoading(false);
				setIsRefreshing(false);
			}
		},
		[fetchNationsIds]
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
