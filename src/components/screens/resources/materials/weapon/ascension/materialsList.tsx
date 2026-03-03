import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import FilterCatalog from "@/src/components/utils/filter/wam/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/wam/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useWeaponAscensionMaterialsStore } from "@/src/store/useWeaponAscensionStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const fetchAllDetails = useWeaponAscensionMaterialsStore(
		(state) => state.fetchAllDetails
	);
	const details = useWeaponAscensionMaterialsStore((state) => state.details);
	const input = useWeaponAscensionMaterialsStore((state) => state.input);
	const selectedType = useWeaponAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const groupByType = useWeaponAscensionMaterialsStore(
		(state) => state.groupByType
	);
	const materialIds = useWeaponAscensionMaterialsStore(
		(state) => state.materialIds
	);
	const error = useWeaponAscensionMaterialsStore((state) => state.error);

	const materials = endpoints.materials;
	const weaponAscension = endpoints.weaponAscension;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const loadMaterials = useCallback(async () => {
		setLoading(true);

		try {
			await fetchAllDetails();
		} finally {
			setLoading(false);
		}
	}, [fetchAllDetails]);

	useEffect(() => {
		loadMaterials();
	}, [loadMaterials]);

	useEffect(() => {
		if (!materialIds.length) return;

		const remainingIds = materialIds.slice(20);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${weaponAscension}/${id}`);
		});
	}, [materialIds, materials, weaponAscension]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadMaterials();
		setRefreshing(false);
	}, [loadMaterials]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((wam) =>
				wam.items.some((item) => item.name.toLowerCase().includes(lower))
			);
		}

		if (selectedType) {
			return groupByType(result, selectedType);
		}

		return result;
	}, [details, groupByType, input, selectedType]);

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);
	}

	if (loading) {
		return (
			<View>
				<ActivityIndicator
					size="large"
					style={{
						position: "absolute",
						top: 30,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				/>
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
