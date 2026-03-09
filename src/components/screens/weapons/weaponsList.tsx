import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useWeapons } from "@/src/hooks/useWeapons";
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
import TouchDetails from "../../common/TouchDetails";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function WeaponsList() {
	const weapons = endpoints.weapons;
	const icon = endpoints.icon;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const {
		ids,
		setInput,
		input,
		setSelectedType,
		selectedType,
		groupByType,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch,
	} = useWeapons();

	type WeaponFilterType = "type" | "rarity" | null;

	const options: { label: string; value: WeaponFilterType }[] = [
		{ label: "Type", value: "type" },
		{ label: "Rarity", value: "rarity" },
		{ label: "None", value: null },
	];

	useEffect(() => {
		if (!ids.length) return;

		const remainingIds = ids.slice(15);

		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${weapons}/${id}${icon}`);
		});
	}, [ids, weapons, icon]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((wea) => wea.name.toLowerCase().includes(lower));
		}

		if (selectedType) {
			return groupByType(result, selectedType);
		}

		return result;
	}, [details, groupByType, input, selectedType]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (!details.length)
		return <EmptyState message={"No weapons found"} onRetry={refetch} />;

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

			<TouchDetails />

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
					<FilterCatalog
						options={options}
						selectedValue={selectedType}
						onSelect={(val: "type" | "rarity" | null) =>
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
		paddingHorizontal: 16,
	},

	searchContainer: {
		paddingTop: 10,
	},

	sheetBackground: {
		backgroundColor: "#FFFFFF",
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
