import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import FilterCatalog from "@/src/components/utils/cam/filterCatalog";
import SearchFilterBar from "@/src/components/utils/cam/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useCharacterAscensionMaterialsStore } from "@/src/store/useCharacterAscensionStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const fetchAllDetails = useCharacterAscensionMaterialsStore(
		(state) => state.fetchAllDetails
	);
	const details = useCharacterAscensionMaterialsStore((state) => state.details);
	const input = useCharacterAscensionMaterialsStore((state) => state.input);
	const selectedType = useCharacterAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const groupByType = useCharacterAscensionMaterialsStore(
		(state) => state.groupByType
	);
	const materialIds = useCharacterAscensionMaterialsStore(
		(state) => state.materialIds
	);
	const error = useCharacterAscensionMaterialsStore((state) => state.error);

	const materials = endpoints.materials;
	const characterAscension = endpoints.characterAscension;

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
			materialIds.forEach((id) => {
				Image.prefetch(`${BASE_URL}${materials}${characterAscension}/${id}`);
			});
			setLoading(false);
		}
	}, [characterAscension, details, fetchAllDetails, materialIds, materials]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((cam) => cam.name.toLowerCase().includes(lower));
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
