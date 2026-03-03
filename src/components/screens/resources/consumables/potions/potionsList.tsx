import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import FilterCatalog from "@/src/components/utils/filter/potion/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/potion/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { usePotionStore } from "@/src/store/usePotion.consumables.store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
	const [refreshing, setRefreshing] = useState(false);

	const loadPotions = useCallback(async () => {
		setLoading(true);

		try {
			await fetchAllDetails();
		} finally {
			setLoading(false);
		}
	}, [fetchAllDetails]);

	useEffect(() => {
		loadPotions();
	}, [loadPotions]);

	useEffect(() => {
		if (!potionsIds.length) return;

		potionsIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${consumables}${potions}/${id}`);
		});
	}, [potionsIds, consumables, potions]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadPotions();
		setRefreshing(false);
	}, [loadPotions]);

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

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<>
			<SearchFilterBar sheetRef={sheetRef} />
			<ListComponent
				finalData={finalData}
				refreshing={refreshing}
				onRefresh={onRefresh}
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
