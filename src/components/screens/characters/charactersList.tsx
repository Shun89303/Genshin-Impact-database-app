import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharacters } from "@/src/hooks/useCharacters";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { View } from "react-native";

import EmptyState from "../../ui/EmptyState";
import ErrorState from "../../ui/ErrorState";
import LoadingScreen from "../../ui/LoadingScreen";
import FilterCatalog from "../../utils/filter/character/filterCatalog";
import SearchFilterBar from "../../utils/filter/character/searchFilterBar";
import FilterList from "./filterList";
import SearchList from "./searchList";
import styles from "./styles/charactersList.styles";

export default function CharactersList() {
	const characters = endpoints.characters;
	const card = endpoints.card;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const {
		ids,
		input,
		selectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch,
		retry,
	} = useCharacters();

	useEffect(() => {
		if (!ids.length) return;

		const remainingIds = ids.slice(9);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${characters}/${id}${card}`);
		});
	}, [ids, card, characters]);

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

	if (isLoading) return <LoadingScreen />;
	if (error) {
		return <ErrorState message={error} onRetry={retry} />;
	}
	if (!details.length) {
		return <EmptyState message="No characters found" onRetry={retry} />;
	}

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<View style={styles.safeArea}>
			<View style={styles.container}>
				<View>
					<SearchFilterBar sheetRef={sheetRef} />
				</View>

				<View
					style={{ height: 1, backgroundColor: "#E0E0E0", marginVertical: 12 }}
				/>

				<View style={styles.list}>
					<ListComponent
						finalData={finalData}
						refreshing={isRefreshing}
						onRefresh={refetch}
					/>
				</View>
			</View>

			<BottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				index={-1}
				enablePanDownToClose
				backgroundStyle={styles.sheetBackground}
				handleIndicatorStyle={styles.sheetIndicator}
			>
				<BottomSheetView style={styles.sheetContent}>
					<FilterCatalog sheetRef={sheetRef} />
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}
