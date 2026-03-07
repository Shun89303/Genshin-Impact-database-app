import { useCallback, useEffect, useState } from "react";
import { useTalentBookMaterialsStore } from "../store/useTalentBookStore";

export function useBookTalentMaterials() {
	const fetchAllDetails = useTalentBookMaterialsStore((s) => s.fetchAllDetails);
	const details = useTalentBookMaterialsStore((s) => s.details);
	const error = useTalentBookMaterialsStore((s) => s.error);
	const input = useTalentBookMaterialsStore((state) => state.input);
	const selectedType = useTalentBookMaterialsStore(
		(state) => state.selectedType
	);
	const groupByType = useTalentBookMaterialsStore((state) => state.groupByType);

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
		selectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
