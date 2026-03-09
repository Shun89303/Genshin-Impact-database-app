import { useCallback, useEffect, useState } from "react";
import { useFoodStore } from "../store/useFood.consumables.store";

export function useFoodConsumables() {
	const fetchAllDetails = useFoodStore((s) => s.fetchAllDetails);
	const details = useFoodStore((s) => s.details);
	const error = useFoodStore((s) => s.error);
	const input = useFoodStore((s) => s.input);
	const setInput = useFoodStore((s) => s.setInput);
	const selectedType = useFoodStore((s) => s.selectedType);
	const setSelectedType = useFoodStore((s) => s.setSelectedType);
	const groupByType = useFoodStore((s) => s.groupByType);

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
		setInput,
		selectedType,
		setSelectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
