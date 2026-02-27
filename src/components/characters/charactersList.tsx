import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharactersStore } from "@/src/store/useCharactersStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import {} from "react-native-safe-area-context";
import styles from "../styles.modules";
import FilterCatalog from "../utils/character/filterCatalog";
import SearchFilterBar from "../utils/character/searchFilterBar";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function CharactersList() {
	const fetchAllDetails = useCharactersStore((state) => state.fetchAllDetails);
	const ids = useCharactersStore((state) => state.ids);
	const { error } = useCharactersStore();
	const details = useCharactersStore((state) => state.details);
	const input = useCharactersStore((state) => state.input);
	const selectedType = useCharactersStore((state) => state.selectedType);
	const groupByType = useCharactersStore((state) => state.groupByType);

	const characters = endpoints.characters;

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
				Image.prefetch(`${BASE_URL}${characters}/${id}/card`);
			});
			setLoading(false);
		}
	}, [fetchAllDetails, ids, characters, details]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((char) => char.name.toLowerCase().includes(lower));
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
