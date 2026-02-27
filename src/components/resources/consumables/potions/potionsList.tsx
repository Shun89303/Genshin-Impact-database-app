import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import FilterCatalog from "@/src/components/utils/potion/filterCatalog";
import SearchFilterBar from "@/src/components/utils/potion/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { usePotionStore } from "@/src/store/usePotion.consumables.store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function PotionsList() {
	const fetchAllDetails = usePotionStore((state) => state.fetchAllDetails);
	const details = usePotionStore((state) => state.details);
	const input = usePotionStore((state) => state.input);
	const selectedType = usePotionStore((state) => state.selectedType);
	const groupByType = usePotionStore((state) => state.groupByType);
	const potionsIds = usePotionStore((state) => state.potionsIds);
	const { error } = usePotionStore();

	const consumables = endpoints.consumables;
	const potions = endpoints.potions;

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
			potionsIds.forEach((id) => {
				Image.prefetch(`${BASE_URL}${consumables}${potions}/${id}`);
			});
			setLoading(false);
		}
	}, [fetchAllDetails, consumables, details, potionsIds, potions]);

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
