import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import FilterCatalog from "@/src/components/utils/filter/lsm/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/lsm/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useLocalMaterialsStore } from "@/src/store/useLocalMaterialsStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const fetchAllDetails = useLocalMaterialsStore(
		(state) => state.fetchAllDetails
	);
	const details = useLocalMaterialsStore((state) => state.details);
	const input = useLocalMaterialsStore((state) => state.input);
	const selectedType = useLocalMaterialsStore((state) => state.selectedType);
	const groupByType = useLocalMaterialsStore((state) => state.groupByType);
	const materialIds = useLocalMaterialsStore((state) => state.materialIds);
	const error = useLocalMaterialsStore((state) => state.error);

	const materials = endpoints.materials;
	const localSpecialties = endpoints.localSpecialties;

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

		const remainingIds = materialIds.slice(12);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${localSpecialties}/${id}`);
		});
	}, [materialIds, materials, localSpecialties]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadMaterials();
		setRefreshing(false);
	}, [loadMaterials]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter(
				(mat) =>
					mat.name.toLowerCase().includes(lower) ||
					mat.id.toLowerCase().includes(lower)
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
