import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import SearchBar from "@/src/components/utils/filter/cim/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useCookingMaterials } from "@/src/hooks/useMaterials.cooking";
import { useCookingMaterialsStore } from "@/src/store/useCookingMaterialsStore";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import SearchList from "./searchList";

export default function MaterialsList() {
	const input = useCookingMaterialsStore((state) => state.input);
	const materialIds = useCookingMaterialsStore((state) => state.materialIds);

	const materials = endpoints.materials;
	const cookingIngredients = endpoints.cookingIngredients;

	const { details, error, isLoading, isRefreshing, refetch } =
		useCookingMaterials();

	useEffect(() => {
		if (!materialIds.length) return;

		const remainingIds = materialIds.slice(15);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${cookingIngredients}/${id}`);
		});
	}, [materialIds, materials, cookingIngredients]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((cooking) =>
				cooking.id.toLowerCase().includes(lower)
			);
		}

		return result;
	}, [details, input]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No materials found"} onRetry={refetch} />;

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
