import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useArtifacts } from "@/src/hooks/useArtifacts";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef } from "react";
import EmptyState from "../../ui/EmptyState";
import ErrorState from "../../ui/ErrorState";
import ScreenLoader from "../../ui/ScreenLoader";
import FilterCatalog from "../../utils/filter/artifact/filterCatalog";
import SearchFilterBar from "../../utils/filter/artifact/searchFilterBar";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function ArtifactsList() {
	const ids = useArtifactsStore((state) => state.ids);
	const input = useArtifactsStore((state) => state.input);
	const selectedType = useArtifactsStore((state) => state.selectedType);
	const groupByType = useArtifactsStore((state) => state.groupByType);

	const artifacts = endpoints.artifacts;
	const circletOfLogos = endpoints.circletOfLogos;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const { details, error, isLoading, isRefreshing, refetch } = useArtifacts();

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
