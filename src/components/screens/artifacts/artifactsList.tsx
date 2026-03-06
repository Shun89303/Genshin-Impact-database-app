import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useArtifacts } from "@/src/hooks/useArtifacts";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";

import EmptyState from "../../ui/EmptyState";
import ErrorState from "../../ui/ErrorState";
import ScreenLoader from "../../ui/ScreenLoader";
import FilterCatalog from "../../utils/filter/artifact/filterCatalog";
import SearchFilterBar from "../../utils/filter/artifact/searchFilterBar";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function ArtifactsList() {
	const { artifacts, circletOfLogos } = endpoints;

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
	} = useArtifacts();

	useEffect(() => {
		if (!ids.length) return;

		const remainingIds = ids.slice(15);

		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${artifacts}/${id}${circletOfLogos}`);
		});
	}, [ids, artifacts, circletOfLogos]);

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

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No artifacts found"} onRetry={refetch} />;

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<SearchFilterBar sheetRef={sheetRef} />
			</View>

			<View style={{ height: 1, backgroundColor: "#334155", marginTop: 12 }} />

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
				handleIndicatorStyle={styles.sheetIndicator}
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
		backgroundColor: "#0F172A",
	},

	searchContainer: {
		paddingHorizontal: 16,
		paddingTop: 10,
	},

	sheetBackground: {
		backgroundColor: "#1E293B",
	},

	sheetIndicator: {
		backgroundColor: "#6B7280",
		width: 40,
	},

	sheetContent: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
});
