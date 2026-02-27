import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "../styles.modules";
import FilterCatalog from "../utils/artifact/filterCatalog";
import SearchFilterBar from "../utils/artifact/searchFilterBar";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function ArtifactsList() {
	const fetchAllDetails = useArtifactsStore((state) => state.fetchAllDetails);
	const ids = useArtifactsStore((state) => state.ids);
	const error = useArtifactsStore((state) => state.error);
	const details = useArtifactsStore((state) => state.details);
	const input = useArtifactsStore((state) => state.input);
	const selectedType = useArtifactsStore((state) => state.selectedType);
	const groupByType = useArtifactsStore((state) => state.groupByType);

	const artifacts = endpoints.artifacts;
	const circletOfLogos = endpoints.circletOfLogos;

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
				Image.prefetch(`${BASE_URL}${artifacts}/${id}${circletOfLogos}`);
			});
			setLoading(false);
		}
	}, [fetchAllDetails, ids, artifacts, details, circletOfLogos]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((art) => art.name.toLowerCase().includes(lower));
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
