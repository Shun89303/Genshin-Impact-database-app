import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharacters } from "@/src/hooks/useCharacters";
import { useCharactersStore } from "@/src/store/useCharactersStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import {} from "react-native-safe-area-context";
import EmptyState from "../../ui/EmptyState";
import ErrorState from "../../ui/ErrorState";
import ScreenLoader from "../../ui/ScreenLoader";
import FilterCatalog from "../../utils/filter/character/filterCatalog";
import SearchFilterBar from "../../utils/filter/character/searchFilterBar";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function CharactersList() {
	const ids = useCharactersStore((state) => state.ids);
	const input = useCharactersStore((state) => state.input);
	const selectedType = useCharactersStore((state) => state.selectedType);
	const groupByType = useCharactersStore((state) => state.groupByType);

	// Endpoints
	const characters = endpoints.characters;
	const card = endpoints.card;

	// Filter Category Bottom Sheet
	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%", "80%"], []);

	// States + Fetch hook
	const { details, error, isLoading, isRefreshing, refetch } = useCharacters();

	useEffect(() => {
		if (!ids.length) return;

		const remainingIds = ids.slice(9);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${characters}/${id}${card}`);
		});
	}, [ids, characters, card]);

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
	if (details.length === 0)
		return <EmptyState message={"No characters found"} onRetry={refetch} />;

	const ListComponent = selectedType ? FilterList : SearchList;

	return (
		<>
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
			>
				<BottomSheetView>
					<FilterCatalog sheetRef={sheetRef} />
				</BottomSheetView>
			</BottomSheet>
		</>
	);
}
