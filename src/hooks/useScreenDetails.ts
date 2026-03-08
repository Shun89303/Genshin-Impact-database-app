import { useCallback, useEffect, useState } from "react";

type GenericStore<T, G, S> = {
	fetchAllDetails: () => Promise<void>;
	details: T[];
	detailsById: Record<string, T>;
	error: any;
	setError: (e: string) => void;
	ids: string[];
	input: string;
	selectedType: S;
	groupByType: G;
};

export function useScreenDetails<T, G, S>(
	storeSelector: () => GenericStore<T, G, S>
) {
	const {
		fetchAllDetails,
		details,
		detailsById,
		error,
		setError,
		ids,
		input,
		selectedType,
		groupByType,
	} = storeSelector();

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
				}, 2000);
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
		selectedType,
		groupByType,
		details,
		detailsById,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
		retry: () => fetchData(false),
	};
}
