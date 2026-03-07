import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import SearchBar from "@/src/components/utils/filter/potion/searchBar";
import { BASE_URL } from "@/src/config/env";
import { usePotionConsumables } from "@/src/hooks/useConsumables.potion";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import SearchList from "./searchList";

export default function PotionsList() {
	const consumables = endpoints.consumables;
	const potions = endpoints.potions;
	const colorScheme = useColorScheme();

	const { input, details, error, isLoading, isRefreshing, refetch } =
		usePotionConsumables();

	useEffect(() => {
		if (!details.length) return;

		details.forEach((potion) => {
			Image.prefetch(`${BASE_URL}${consumables}${potions}/${potion.id}`);
		});
	}, [details, consumables, potions]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((pot) =>
				(pot.name ?? "").toLowerCase().includes(lower)
			);
		}

		return result;
	}, [details, input]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No potions found"} onRetry={refetch} />;

	return (
		<View
			style={[
				styles.container,
				colorScheme === "dark" ? styles.dark : styles.light,
			]}
		>
			<SearchBar />
			<Text
				style={{
					textAlign: "center",
					color: "white",
					padding: 6,
					fontWeight: "300",
				}}
			>
				Touch an image to see details
			</Text>
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
		paddingHorizontal: 16, // side padding
		paddingTop: 12, // top spacing for search bar
	},
	light: {
		backgroundColor: "#F9FAFB",
	},
	dark: {
		backgroundColor: "#0F172A",
	},
});
