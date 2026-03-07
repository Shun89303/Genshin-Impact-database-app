import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/lsm/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/lsm/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useLocalMaterials } from "@/src/hooks/useMaterials.local";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const { materials, localSpecialties } = endpoints;

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
	} = useLocalMaterials();

	useEffect(() => {
		if (!details.length) return;

		details.forEach((mat) => {
			mat.items.forEach((item) => {
				Image.prefetch(`${BASE_URL}${materials}${localSpecialties}/${item.id}`);
			});
		});
	}, [details, materials, localSpecialties]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((mat) =>
				mat.items.some(
					(item) =>
						item.id.toLowerCase().includes(lower) ||
						item.name.toLowerCase().includes(lower)
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
		return <EmptyState message={"No materials found"} onRetry={refetch} />;

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<View style={styles.container}>
			<SearchFilterBar sheetRef={sheetRef} />
			<View style={styles.listWrapper}>
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
				backgroundStyle={styles.bottomSheet}
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
		backgroundColor: "#F5F5F5", // neutral light background
	},
	listWrapper: {
		flex: 1,
		borderTopWidth: 1,
		borderTopColor: "#D0D0D0", // subtle top border
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: "#FFFFFF", // white background for list
	},
	bottomSheet: {
		backgroundColor: "#F9F9F9", // neutral sheet background
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	bottomSheetView: {
		padding: 16,
	},
});
