import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import FilterCatalog from "@/src/components/utils/talentBook/filterCatalog";
import SearchFilterBar from "@/src/components/utils/talentBook/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useTalentBookMaterialsStore } from "@/src/store/useTalentBookStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const fetchAllDetails = useTalentBookMaterialsStore(
		(state) => state.fetchAllDetails
	);
	const details = useTalentBookMaterialsStore((state) => state.details);
	const input = useTalentBookMaterialsStore((state) => state.input);
	const selectedType = useTalentBookMaterialsStore(
		(state) => state.selectedType
	);
	const groupByType = useTalentBookMaterialsStore((state) => state.groupByType);

	const materialIds = useTalentBookMaterialsStore((state) => state.materialIds);
	const error = useTalentBookMaterialsStore((state) => state.error);

	const materials = endpoints.materials;
	const talentBook = endpoints.talentBook;

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
			Image.prefetch(`${BASE_URL}${materials}${talentBook}/${id}`);
		});
	}, [materialIds, materials, talentBook]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadMaterials();
		setRefreshing(false);
	}, [loadMaterials]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((talentBook) =>
				talentBook.items.some((book) => book.name.toLowerCase().includes(lower))
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
