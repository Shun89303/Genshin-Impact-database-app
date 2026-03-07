import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/wam/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/wam/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useAscensionWeaponMaterials } from "@/src/hooks/useMaterials.weapon.ascension";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const materials = endpoints.materials;
	const weaponAscension = endpoints.weaponAscension;

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
	} = useAscensionWeaponMaterials();

	// Prefetch images for smoother loading
	useEffect(() => {
		if (!details.length) return;

		details.forEach((mat) => {
			mat.items.forEach((item) => {
				Image.prefetch(`${BASE_URL}${materials}${weaponAscension}/${item.id}`);
			});
		});
	}, [details, materials, weaponAscension]);

	// Filter and group data
	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((wam) =>
				wam.items?.some((item) => item.name.toLowerCase().includes(lower))
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
				handleIndicatorStyle={styles.sheetHandle}
				backgroundStyle={styles.sheetBackground}
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
		backgroundColor: "#f9fafb", // soft light background
		paddingHorizontal: 16,
		paddingTop: 8,
	},

	sheetHandle: {
		backgroundColor: "#cbd5e1", // subtle gray handle
		width: 40,
		height: 4,
		borderRadius: 2,
		marginVertical: 8,
		alignSelf: "center",
	},

	sheetBackground: {
		backgroundColor: "#fff", // clean white sheet
		borderRadius: 12,
	},

	sheetContent: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
});
