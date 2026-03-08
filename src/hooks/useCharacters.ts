import { useCharactersStore } from "@/src/store/useCharactersStore";
import { useCallback, useEffect, useState } from "react";

export function useCharacters() {
	const fetchAllDetails = useCharactersStore((s) => s.fetchAllDetails);
	const details = useCharactersStore((s) => s.details);
	const detailsById = useCharactersStore((s) => s.detailsById);
	const error = useCharactersStore((s) => s.error);
	const setError = useCharactersStore((s) => s.setError);
	const ids = useCharactersStore((state) => state.ids);
	const input = useCharactersStore((state) => state.input);
	const setInput = useCharactersStore((state) => state.setInput);
	const selectedType = useCharactersStore((state) => state.selectedType);
	const setSelectedType = useCharactersStore((state) => state.setSelectedType);
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
			} catch (err: any) {
				setError(err.message);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
					setIsRefreshing(false);
				}, 1500);
			}
		},
		[fetchAllDetails, setError]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		ids,
		input,
		setInput,
		selectedType,
		setSelectedType,
		groupByType,
		details,
		detailsById,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
