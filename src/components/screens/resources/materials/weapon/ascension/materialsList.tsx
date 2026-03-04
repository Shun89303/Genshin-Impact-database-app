import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/wam/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/wam/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useAscensionWeaponMaterials } from "@/src/hooks/useMaterials.weapon.ascension";
import { useWeaponAscensionMaterialsStore } from "@/src/store/useWeaponAscensionStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const input = useWeaponAscensionMaterialsStore((state) => state.input);
	const selectedType = useWeaponAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const groupByType = useWeaponAscensionMaterialsStore(
		(state) => state.groupByType
	);
	const materialIds = useWeaponAscensionMaterialsStore(
		(state) => state.materialIds
	);

	const materials = endpoints.materials;
	const weaponAscension = endpoints.weaponAscension;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const { details, error, isLoading, isRefreshing, refetch } =
		useAscensionWeaponMaterials();

	useEffect(() => {
		if (!materialIds.length) return;

		const remainingIds = materialIds.slice(20);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${weaponAscension}/${id}`);
		});
	}, [materialIds, materials, weaponAscension]);

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
		return <EmptyState message={"No materials found"} onRetry={refetch} />;

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
