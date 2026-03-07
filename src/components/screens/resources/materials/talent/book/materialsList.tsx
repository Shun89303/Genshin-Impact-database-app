import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/talentBook/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/talentBook/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useBookTalentMaterials } from "@/src/hooks/useMaterials.talent.book";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const { materials, talentBook } = endpoints;

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
	} = useBookTalentMaterials();

	useEffect(() => {
		if (!details.length) return;

		details.forEach((book) => {
			Image.prefetch(`${BASE_URL}${materials}${talentBook}/${book.id}`);
		});
	}, [details, materials, talentBook]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((talentBook) =>
				talentBook.items?.some((book) =>
					book.name.toLowerCase().includes(lower)
				)
			);
		}

		if (selectedType) {
			return groupByType(result, selectedType);
		}

		return result;
	}, [details, groupByType, input, selectedType]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message="No materials found" onRetry={refetch} />;

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<View style={styles.container}>
			<SearchFilterBar sheetRef={sheetRef} />
			<Text
				style={{
					textAlign: "center",
					color: "black",
					padding: 6,
					fontWeight: "300",
				}}
			>
				Touch an image to see details
			</Text>
			<ListComponent
				finalData={finalData}
				refreshing={isRefreshing}
				onRefresh={refetch}
			/>
			<BottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				index={-1}
				enablePanDownToClose
				handleIndicatorStyle={styles.bottomSheetHandle}
				backgroundStyle={styles.bottomSheetBackground}
			>
				<BottomSheetView style={styles.bottomSheetContent}>
					<FilterCatalog sheetRef={sheetRef} />
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8FAFC", // light neutral background
		paddingHorizontal: 8,
		paddingTop: 8,
	},
	bottomSheetHandle: {
		backgroundColor: "#CBD5E1", // subtle gray for handle
		width: 40,
		height: 4,
		borderRadius: 2,
	},
	bottomSheetBackground: {
		backgroundColor: "#FFFFFF", // clean white sheet
	},
	bottomSheetContent: {
		padding: 16,
	},
});
