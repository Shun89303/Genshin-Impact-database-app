import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/potion/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/potion/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { usePotionConsumables } from "@/src/hooks/useConsumables.potion";
import { usePotionStore } from "@/src/store/usePotion.consumables.store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function PotionsList() {
	const input = usePotionStore((state) => state.input);
	const selectedType = usePotionStore((state) => state.selectedType);
	const groupByType = usePotionStore((state) => state.groupByType);
	const potionsIds = usePotionStore((state) => state.potionsIds);

	const consumables = endpoints.consumables;
	const potions = endpoints.potions;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const { details, error, isLoading, isRefreshing, refetch } =
		usePotionConsumables();

	useEffect(() => {
		if (!potionsIds.length) return;

		potionsIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${consumables}${potions}/${id}`);
		});
	}, [potionsIds, consumables, potions]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((pot) =>
				(pot.name ?? "").toLowerCase().includes(lower)
			);
		}

		if (selectedType) {
			return groupByType(result, selectedType);
		}

		return result;
	}, [details, groupByType, input, selectedType]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No potions found"} onRetry={refetch} />;

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<>
			<SearchFilterBar sheetRef={sheetRef} />
			<ListComponent
				finalData={finalData}
				refreshing={isRefreshing}
				onRefresh={refetch}
			/>
			<BottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				index={-1}
				enablePanDownToClose
			>
				<BottomSheetView>
					<FilterCatalog sheetRef={sheetRef} />
				</BottomSheetView>
			</BottomSheet>
		</>
	);
}
