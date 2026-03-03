import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useWeapons } from "@/src/hooks/useWeapons";
import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import EmptyState from "../../ui/EmptyState";
import ErrorState from "../../ui/ErrorState";
import ScreenLoader from "../../ui/ScreenLoader";
import FilterCatalog from "../../utils/filter/weapon/filterCatalog";
import SearchFilterBar from "../../utils/filter/weapon/searchFilterBar";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function WeaponsList() {
	const ids = useWeaponsStore((state) => state.ids);
	const input = useWeaponsStore((state) => state.input);
	const selectedType = useWeaponsStore((state) => state.selectedType);
	const groupByType = useWeaponsStore((state) => state.groupByType);

	const weapons = endpoints.weapons;
	const icon = endpoints.icon;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%", "80%"], []);

	const { details, error, isLoading, isRefreshing, refetch } = useWeapons();

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
	if (details.length === 0)
		return <EmptyState message={"No weapons found"} onRetry={refetch} />;

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
