import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import SearchBar from "@/src/components/utils/filter/bossMaterial/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useBossMaterials } from "@/src/hooks/useMaterials.boss";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import SearchList from "./searchList";

export default function MaterialsList() {
	const { materials, bossMaterials } = endpoints;

	const { input, details, error, isLoading, isRefreshing, refetch } =
		useBossMaterials();

	useEffect(() => {
		if (!details.length) return;

		details.forEach((mat) => {
			Image.prefetch(`${BASE_URL}${materials}${bossMaterials}/${mat.id}`);
		});
	}, [details, materials, bossMaterials]);

	const finalData = useMemo(() => {
		if (!input.trim()) return details;

		const lower = input.toLowerCase();
		return details.filter((item) => item.id.toLowerCase().includes(lower));
	}, [details, input]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (!details.length)
		return <EmptyState message="No potions found" onRetry={refetch} />;

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
		backgroundColor: "#f8f8f8", // soft background for contrast
		paddingHorizontal: 16,
		paddingTop: 10,
	},
});
