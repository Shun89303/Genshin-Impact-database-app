import { useCallback, useEffect, useState } from "react";
import { useWeaponAscensionMaterialsStore } from "../store/useWeaponAscensionStore";

export function useAscensionWeaponMaterials() {
	const fetchAllDetails = useWeaponAscensionMaterialsStore(
		(s) => s.fetchAllDetails
	);
	const details = useWeaponAscensionMaterialsStore((s) => s.details);
	const error = useWeaponAscensionMaterialsStore((s) => s.error);
	const input = useWeaponAscensionMaterialsStore((state) => state.input);
	const setInput = useWeaponAscensionMaterialsStore((state) => state.setInput);
	const selectedType = useWeaponAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const setSelectedType = useWeaponAscensionMaterialsStore(
		(state) => state.setSelectedType
	);
	const groupByType = useWeaponAscensionMaterialsStore(
		(state) => state.groupByType
	);

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
