import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import FilterCatalog from "@/src/components/utils/talentBook/filterCatalog";
import SearchFilterBar from "@/src/components/utils/talentBook/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useTalentBookMaterialsStore } from "@/src/store/useTalentBookStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef, useState } from "react";
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
			details.forEach((talBook) =>
				talBook.items.forEach((book) => {
					Image.prefetch(`${BASE_URL}${materials}${talentBook}/${book.id}`);
				})
			);
			setLoading(false);
		}
	}, [fetchAllDetails, materials, details, materialIds, talentBook]);

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
