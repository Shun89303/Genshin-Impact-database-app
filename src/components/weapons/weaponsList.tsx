import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef, useState } from "react";
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
			ids.forEach((id) => {
				Image.prefetch(`${BASE_URL}${weapons}/${id}${icon}`);
			});
			setLoading(false);
		}
	}, [fetchAllDetails, ids, weapons, details, icon]);

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

	if (!selectedType) {
		return (
			<>
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
