import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/food/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/food/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useFoodConsumables } from "@/src/hooks/useConsumables.food";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function FoodList() {
	const food = endpoints.food;
	const consumables = endpoints.consumables;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const {
		input,
		selectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch,
	} = useFoodConsumables();

	// Prefetch images for smooth scrolling
	useEffect(() => {
		if (!details.length) return;
		details.forEach((f) => {
			Image.prefetch(`${BASE_URL}${consumables}${food}/${f.id}`);
		});
	}, [details, consumables, food]);

	// Filter and group data
	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((food) =>
				(food.name ?? "").toLowerCase().includes(lower)
			);
		}

		return selectedType ? groupByType(result, selectedType) : result;
	}, [details, groupByType, input, selectedType]);

	// Loading and error states
	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message="No foods found" onRetry={refetch} />;

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<View style={styles.container}>
			<SearchFilterBar sheetRef={sheetRef} />
			<Text
				style={{
					textAlign: "center",
					color: "black",
					padding: 6,
					fontWeight: "300",
				}}
			>
				Touch an image to see details
			</Text>
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
				handleIndicatorStyle={styles.handleIndicator}
			>
				<BottomSheetView style={styles.bottomSheet}>
					<FilterCatalog sheetRef={sheetRef} />
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f8f8", // light neutral background
	},
	bottomSheet: {
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	handleIndicator: {
		backgroundColor: "#ccc",
		width: 40,
		height: 4,
	},
});
