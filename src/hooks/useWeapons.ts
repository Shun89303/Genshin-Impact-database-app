import { useCallback, useEffect, useState } from "react";
import { useWeaponsStore } from "../store/useWeaponsStore";

export function useWeapons() {
	const fetchAllDetails = useWeaponsStore((s) => s.fetchAllDetails);
	const details = useWeaponsStore((s) => s.details);
	const error = useWeaponsStore((s) => s.error);
	const ids = useWeaponsStore((state) => state.ids);
	const input = useWeaponsStore((state) => state.input);
	const setInput = useWeaponsStore((state) => state.setInput);
	const selectedType = useWeaponsStore((state) => state.selectedType);
	const setSelectedType = useWeaponsStore((state) => state.setSelectedType);
	const groupByType = useWeaponsStore((state) => state.groupByType);

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
		setInput,
		input,
		setSelectedType,
		selectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
