import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "../styles.modules";
import FilterCatalog from "../utils/weapon/filterCatalog";
import SearchFilterBar from "../utils/weapon/searchFilterBar";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function WeaponsList() {
	const fetchAllDetails = useWeaponsStore((state) => state.fetchAllDetails);
	const ids = useWeaponsStore((state) => state.ids);
	const { error } = useWeaponsStore();
	const details = useWeaponsStore((state) => state.details);
	const input = useWeaponsStore((state) => state.input);
	const selectedType = useWeaponsStore((state) => state.selectedType);
	const groupByType = useWeaponsStore((state) => state.groupByType);

	const weapons = endpoints.weapons;
	const icon = endpoints.icon;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const loadWeapons = useCallback(async () => {
		setLoading(true);

		try {
			await fetchAllDetails();
		} finally {
			setLoading(false);
		}
	}, [fetchAllDetails]);

	useEffect(() => {
		loadWeapons();
	}, [loadWeapons]);

	useEffect(() => {
		if (!ids.length) return;

		const remainingIds = ids.slice(15);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${weapons}/${id}${icon}`);
		});
	}, [ids, weapons, icon]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadWeapons();
		setRefreshing(false);
	}, [loadWeapons]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((wea) => wea.name.toLowerCase().includes(lower));
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
