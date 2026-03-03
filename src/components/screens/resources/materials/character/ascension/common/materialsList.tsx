import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import SearchBar from "@/src/components/utils/filter/commonMaterial/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useCommonAscensionMaterials } from "@/src/hooks/useMaterials.character.ascension.common";
import { useCommonAscensionMaterialsStore } from "@/src/store/useCommonAscensionStore";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import SearchList from "./searchList";

export default function MaterialsList() {
	const input = useCommonAscensionMaterialsStore((state) => state.input);
	const materialIds = useCommonAscensionMaterialsStore(
		(state) => state.materialIds
	);

	const materials = endpoints.materials;
	const commonAscension = endpoints.commonAscension;

	const { details, error, isLoading, isRefreshing, refetch } =
		useCommonAscensionMaterials();

	useEffect(() => {
		if (!materialIds.length) return;

		const remainingIds = materialIds.slice(12);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${commonAscension}/${id}`);
		});
	}, [materialIds, materials, commonAscension]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result
				.map((group) => {
					const filteredItems = group.items.filter((item) =>
						item.name.toLowerCase().includes(lower)
					);

					if (filteredItems.length === 0) return null;

					return {
						...group,
						items: filteredItems,
					};
				})
				.filter((group) => group !== null);
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
