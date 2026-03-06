import { useCharactersStore } from "@/src/store/useCharactersStore";
import { useCallback, useEffect, useState } from "react";

export function useCharacters() {
	const fetchAllDetails = useCharactersStore((s) => s.fetchAllDetails);
	const details = useCharactersStore((s) => s.details);
	const detailsById = useCharactersStore((s) => s.detailsById);
	const error = useCharactersStore((s) => s.error);
	const ids = useCharactersStore((state) => state.ids);
	const input = useCharactersStore((state) => state.input);
	const selectedType = useCharactersStore((state) => state.selectedType);
	const groupByType = useCharactersStore((state) => state.groupByType);

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
		input,
		selectedType,
		groupByType,
		details,
		detailsById,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
