import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useArtifacts } from "@/src/hooks/useArtifacts";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";

import Divider from "../../common/Divider";
import EmptyState from "../../common/EmptyState";
import ErrorState from "../../common/ErrorState";
import FilterCatalog from "../../common/FilterCatalog";
import ScreenLoader from "../../common/ScreenLoader";
import SearchFilterBar from "../../common/SearchFilterBar";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function ArtifactsList() {
	const { artifacts, circletOfLogos } = endpoints;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const {
		ids,
		input,
		setInput,
		selectedType,
		setSelectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch,
	} = useArtifacts();

	type ArtifactFilterType = "max_rarity" | null;

	const options: { label: string; value: ArtifactFilterType }[] = [
		{ label: "Max Rarity", value: "max_rarity" },
		{ label: "None", value: null },
	];

	useEffect(() => {
		if (!ids.length) return;

		ids.forEach((id) => {
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
				<SearchFilterBar
					value={input}
					onChangeText={setInput}
					onFilterPress={() => sheetRef.current?.expand()}
				/>
			</View>

			<Divider />

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
					{/* <FilterCatalog sheetRef={sheetRef} /> */}
					<FilterCatalog
						options={options}
						selectedValue={selectedType}
						onSelect={(val: "max_rarity" | null) =>
							setSelectedType(val, sheetRef)
						}
					/>
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8FAFC",
	},

	searchContainer: {
		paddingHorizontal: 16,
		paddingTop: 10,
	},

	sheetBackground: {
		backgroundColor: "#F8FAFC",
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
