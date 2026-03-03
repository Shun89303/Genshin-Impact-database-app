import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import { BASE_URL } from "@/src/config/env";
import { useExperienceMaterials } from "@/src/hooks/useMaterials.character.experience";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function MaterialsList() {
	const materials = endpoints.materials;
	const characterExperience = endpoints.characterExperience;

	const { materialIds, error, isLoading, isRefreshing, refetch } =
		useExperienceMaterials();

	useEffect(() => {
		if (!materialIds.length) return;

		materialIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${characterExperience}/${id}`);
		});
	}, [materialIds, materials, characterExperience]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (materialIds.length === 0)
		return <EmptyState message={"No materials found"} onRetry={refetch} />;

	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={materialIds}
				keyExtractor={(id) => id}
				numColumns={3}
				removeClippedSubviews
				refreshing={isRefreshing}
				onRefresh={refetch}
				renderItem={({ item }) => <MaterialsImage id={item} />}
			/>
		</View>
	);
}
