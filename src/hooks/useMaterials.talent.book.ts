import { useCallback, useEffect, useState } from "react";
import { useTalentBookMaterialsStore } from "../store/useTalentBookStore";

export function useBookTalentMaterials() {
	const fetchAllDetails = useTalentBookMaterialsStore((s) => s.fetchAllDetails);
	const details = useTalentBookMaterialsStore((s) => s.details);
	const error = useTalentBookMaterialsStore((s) => s.error);

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
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
