import { endpoints } from "@/src/api/endpoints";
import Divider from "@/src/components/common/Divider";
import EmptyState from "@/src/components/common/EmptyState";
import ErrorState from "@/src/components/common/ErrorState";
import FilterCatalog from "@/src/components/common/FilterCatalog";
import ScreenLoader from "@/src/components/common/ScreenLoader";
import SearchFilterBar from "@/src/components/common/SearchFilterBar";
import TouchDetails from "@/src/components/common/TouchDetails";
import { BASE_URL } from "@/src/config/env";
import { useFoodConsumables } from "@/src/hooks/useConsumables.food";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function FoodList() {
	const { food, consumables } = endpoints;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const {
		input,
		setInput,
		selectedType,
		setSelectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch,
	} = useFoodConsumables();

	type option = {
		label: string;
		value: "type" | "rarity" | null;
	};

	const options: option[] = [
		{ label: "Type", value: "type" },
		{ label: "Rarity", value: "rarity" },
		{ label: "None", value: null },
	];

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
			<SearchFilterBar
				value={input}
				onChangeText={setInput}
				onFilterPress={() => sheetRef.current?.expand()}
			/>

			<Divider />

			<TouchDetails />

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
					<FilterCatalog
						options={options}
						selectedValue={selectedType}
						onSelect={(val: "type" | "rarity" | null) =>
							setSelectedType(val, sheetRef)
						}
					/>
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f8f8", // light neutral background
		paddingVertical: 10,
		paddingHorizontal: 16,
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
