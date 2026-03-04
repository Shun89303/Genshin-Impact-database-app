import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import FilterCatalog from "@/src/components/utils/filter/talentBook/filterCatalog";
import SearchFilterBar from "@/src/components/utils/filter/talentBook/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useBookTalentMaterials } from "@/src/hooks/useMaterials.talent.book";
import { useTalentBookMaterialsStore } from "@/src/store/useTalentBookStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const input = useTalentBookMaterialsStore((state) => state.input);
	const selectedType = useTalentBookMaterialsStore(
		(state) => state.selectedType
	);
	const groupByType = useTalentBookMaterialsStore((state) => state.groupByType);

	const materialIds = useTalentBookMaterialsStore((state) => state.materialIds);

	const materials = endpoints.materials;
	const talentBook = endpoints.talentBook;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40"], []);

	const { details, error, isLoading, isRefreshing, refetch } =
		useBookTalentMaterials();

	useEffect(() => {
		if (!materialIds.length) return;

		const remainingIds = materialIds.slice(12);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${talentBook}/${id}`);
		});
	}, [materialIds, materials, talentBook]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((talentBook) =>
				talentBook.items?.some((book) =>
					book.name.toLowerCase().includes(lower)
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
