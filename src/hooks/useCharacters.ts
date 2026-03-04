import { useCharactersStore } from "@/src/store/useCharactersStore";
import { useCallback, useEffect, useState } from "react";

export function useCharacters() {
	const fetchAllDetails = useCharactersStore((s) => s.fetchAllDetails);
	const details = useCharactersStore((s) => s.details);
	const detailsById = useCharactersStore((s) => s.detailsById);
	const error = useCharactersStore((s) => s.error);

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
		detailsById,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
