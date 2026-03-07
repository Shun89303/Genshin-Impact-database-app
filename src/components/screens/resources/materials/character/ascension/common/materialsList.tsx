import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/commonMaterial/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/commonMaterial/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useCommonAscensionMaterials } from "@/src/hooks/useMaterials.character.ascension.common";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const { materials, commonAscension } = endpoints;

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
	} = useCommonAscensionMaterials();

	useEffect(() => {
		if (!details.length) return;

		details.forEach((mat) => {
			mat.items.forEach((item) => {
				Image.prefetch(`${BASE_URL}${materials}${commonAscension}/${item.id}`);
			});
		});
	}, [details, materials, commonAscension]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result
				.map((group) => {
					const filteredItems = group.items.filter((item) =>
						item.name.toLowerCase().includes(lower)
					);

					if (filteredItems.length === 0) return null;

					return {
						...group,
						items: filteredItems,
					};
				})
				.filter((group) => group !== null);
		}

		if (selectedType) {
			return groupByType(result, selectedType);
		}

		return result;
	}, [details, input, groupByType, selectedType]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No materials found"} onRetry={refetch} />;

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<SearchFilterBar sheetRef={sheetRef} />
			</View>

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
				backgroundStyle={styles.sheetBackground}
				handleIndicatorStyle={styles.sheetHandle}
			>
				<BottomSheetView style={styles.sheetContent}>
					<FilterCatalog sheetRef={sheetRef} />
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},

	topBar: {
		backgroundColor: "#ffffff",
		paddingHorizontal: 10,
		paddingVertical: 8,
	},

	sheetBackground: {
		backgroundColor: "#ffffff",
		borderTopLeftRadius: 18,
		borderTopRightRadius: 18,
		borderWidth: 1,
		borderColor: "#e5e5e5",
	},

	sheetHandle: {
		backgroundColor: "#d4d4d4",
	},

	sheetContent: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
});
