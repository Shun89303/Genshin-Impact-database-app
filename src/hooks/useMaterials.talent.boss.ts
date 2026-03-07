import { useCallback, useEffect, useState } from "react";
import { useTalentBossMaterialsStore } from "../store/useTalentBossStore";

export function useBossTalentMaterials() {
	const fetchAllDetails = useTalentBossMaterialsStore((s) => s.fetchAllDetails);
	const details = useTalentBossMaterialsStore((s) => s.details);
	const error = useTalentBossMaterialsStore((s) => s.error);
	const input = useTalentBossMaterialsStore((state) => state.input);

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
		details,
		error,
		isLoading,
		isRefreshing,
		refetch: () => fetchData(true),
	};
}
