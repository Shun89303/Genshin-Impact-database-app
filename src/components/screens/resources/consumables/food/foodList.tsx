import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/food/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/food/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useFoodConsumables } from "@/src/hooks/useConsumables.food";
import { useFoodStore } from "@/src/store/useFood.consumables.store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function FoodList() {
	const input = useFoodStore((state) => state.input);
	const selectedType = useFoodStore((state) => state.selectedType);
	const groupByType = useFoodStore((state) => state.groupByType);
	const foodIds = useFoodStore((state) => state.foodIds);

	const food = endpoints.food;
	const consumables = endpoints.consumables;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%", "80%"], []);

	const { details, error, isLoading, isRefreshing, refetch } =
		useFoodConsumables();

	useEffect(() => {
		if (!foodIds.length) return;

		const remainingIds = foodIds.slice(12);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${consumables}${food}/${id}`);
		});
	}, [foodIds, consumables, food]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((food) =>
				(food.name ?? "").toLowerCase().includes(lower)
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
		return <EmptyState message={"No foods found"} onRetry={refetch} />;

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
