import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import FilterCatalog from "@/src/components/utils/food/filterCatalog";
import SearchFilterBar from "@/src/components/utils/food/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useFoodStore } from "@/src/store/useFood.consumables.store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function FoodList() {
	const fetchAllDetails = useFoodStore((state) => state.fetchAllDetails);
	const details = useFoodStore((state) => state.details);
	const input = useFoodStore((state) => state.input);
	const selectedType = useFoodStore((state) => state.selectedType);
	const groupByType = useFoodStore((state) => state.groupByType);
	const foodIds = useFoodStore((state) => state.foodIds);
	const { error } = useFoodStore();

	const food = endpoints.food;
	const consumables = endpoints.consumables;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				await fetchAllDetails();
			} finally {
				setLoading(false);
			}
		};

		if (!details.length) {
			load();
		} else {
			// PREFETCH IMAGES
			foodIds.forEach((id) => {
				Image.prefetch(`${BASE_URL}${consumables}${food}/${id}`);
			});
			setLoading(false);
		}
	}, [fetchAllDetails, consumables, details, food, foodIds]);

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

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!selectedType) {
		return (
			<>
				{loading && (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" />
					</View>
				)}
				<SearchFilterBar sheetRef={sheetRef} />
				<SearchList finalData={finalData} />
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

	return (
		<>
			{loading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>
			)}
			<SearchFilterBar sheetRef={sheetRef} />
			<FilterList finalData={finalData} />
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
