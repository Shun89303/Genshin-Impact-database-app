import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import SearchBar from "@/src/components/utils/filter/cim/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useCookingMaterials } from "@/src/hooks/useMaterials.cooking";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import SearchList from "./searchList";

export default function MaterialsList() {
	const { materials, cookingIngredients } = endpoints;
	const { input, details, error, isLoading, isRefreshing, refetch } =
		useCookingMaterials();

	// Prefetch images for smoother UI
	useEffect(() => {
		if (!details.length) return;
		details.forEach((mat) => {
			Image.prefetch(`${BASE_URL}${materials}${cookingIngredients}/${mat.id}`);
		});
	}, [details, materials, cookingIngredients]);

	const finalData = useMemo(() => {
		if (input.trim().length === 0) return details;
		const lower = input.toLowerCase();
		return details.filter((cooking) =>
			cooking.id.toLowerCase().includes(lower)
		);
	}, [details, input]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message="No materials found" onRetry={refetch} />;

	return (
		<View style={styles.container}>
			<SearchBar />
			<SearchList
				finalData={finalData}
				refreshing={isRefreshing}
				onRefresh={refetch}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16, // consistent horizontal padding
		paddingTop: 12, // spacing from top
		backgroundColor: "#f9f9f9", // subtle background
	},
});
