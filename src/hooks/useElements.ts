import { useCallback, useEffect, useState } from "react";
import { useElementsStore } from "../store/useElementsStore";

export function useElements() {
	const fetchElementsIds = useElementsStore((s) => s.fetchElementsIds);
	const ids = useElementsStore((s) => s.ids);
	const error = useElementsStore((s) => s.error);

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

				await fetchElementsIds();
			} finally {
				setIsLoading(false);
				setIsRefreshing(false);
			}
		},
		[fetchElementsIds]
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
