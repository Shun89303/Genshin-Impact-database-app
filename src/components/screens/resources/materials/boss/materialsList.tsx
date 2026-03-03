import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import SearchBar from "@/src/components/utils/filter/bossMaterial/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useBossMaterials } from "@/src/hooks/useMaterials.boss";
import { useBossMaterialsStore } from "@/src/store/useBossMaterialsStore";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import SearchList from "./searchList";

export default function MaterialsList() {
	const input = useBossMaterialsStore((state) => state.input);
	const materialIds = useBossMaterialsStore((state) => state.materialIds);

	const materials = endpoints.materials;
	const bossMaterials = endpoints.bossMaterials;

	const { details, error, isLoading, isRefreshing, refetch } =
		useBossMaterials();

	useEffect(() => {
		if (!materialIds.length) return;

		const remainingIds = materialIds.slice(15);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${bossMaterials}/${id}`);
		});
	}, [materialIds, materials, bossMaterials]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();

			result = result.filter((item) => item.id.toLowerCase().includes(lower));
		}

		return result;
	}, [details, input]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No potions found"} onRetry={refetch} />;

	return (
		<>
			<SearchBar />
			<SearchList
				finalData={finalData}
				refreshing={isRefreshing}
				onRefresh={refetch}
			/>
		</>
	);
}
