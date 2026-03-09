import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharacters } from "@/src/hooks/useCharacters";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import { View } from "react-native";

import Divider from "../../common/Divider";
import EmptyState from "../../common/EmptyState";
import ErrorState from "../../common/ErrorState";
import FilterCatalog from "../../common/FilterCatalog";
import ScreenLoader from "../../common/ScreenLoader";
import SearchFilterBar from "../../common/SearchFilterBar";
import TouchDetails from "../../common/TouchDetails";
import FilterList from "./filterList";
import SearchList from "./searchList";
import styles from "./styles/charactersList.styles";

export default function CharactersList() {
	const { characters, card } = endpoints;

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
	} = useCharacters();

	type option = {
		label: string;
		value: "vision" | "weapon" | "nation" | null;
	};

	const options: option[] = [
		{ label: "Vision", value: "vision" },
		{ label: "Weapon", value: "weapon" },
		{ label: "Nation", value: "nation" },
		{ label: "None", value: null },
	];

	useEffect(() => {
		if (!ids.length) return;

		ids.forEach((id) => {
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

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (!details.length)
		return <EmptyState message="No characters found" onRetry={refetch} />;

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<View style={styles.safeArea}>
			<View style={styles.container}>
				<View>
					<SearchFilterBar
						value={input}
						onChangeText={setInput}
						onFilterPress={() => sheetRef.current?.expand()}
					/>
				</View>

				<Divider />

				<TouchDetails />

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
					<FilterCatalog
						options={options}
						selectedValue={selectedType}
						onSelect={(val: "vision" | "weapon" | "nation" | null) =>
							setSelectedType(val, sheetRef)
						}
					/>
				</BottomSheetView>
			</BottomSheet>
		</View>
	);
}
