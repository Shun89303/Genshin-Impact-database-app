import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/cam/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/cam/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useCharacterAscensionMaterials } from "@/src/hooks/useMaterials.character.ascension.character";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const materials = endpoints.materials;
	const characterAscension = endpoints.characterAscension;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const {
		input,
		selectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch,
	} = useCharacterAscensionMaterials();

	useEffect(() => {
		if (!details.length) return;
		details.forEach((mat) => {
			Image.prefetch(`${BASE_URL}${materials}${characterAscension}/${mat.id}`);
		});
	}, [details, materials, characterAscension]);

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

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message="No potions found" onRetry={refetch} />;

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<View style={styles.container}>
			<SearchFilterBar sheetRef={sheetRef} />
			<View style={styles.listContainer}>
				<ListComponent
					finalData={finalData}
					refreshing={isRefreshing}
					onRefresh={refetch}
				/>
			</View>
			<BottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				index={-1}
				enablePanDownToClose
				style={styles.bottomSheet}
			>
				<BottomSheetView style={styles.bottomSheetView}>
					<FilterCatalog sheetRef={sheetRef} />
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f9f9f9", // light background
	},
	listContainer: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	bottomSheet: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -3 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 5,
	},
	bottomSheetView: {
		padding: 16,
		backgroundColor: "#fff",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
});
