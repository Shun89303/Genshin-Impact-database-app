import { endpoints } from "@/src/api/endpoints";
import Divider from "@/src/components/common/Divider";
import EmptyState from "@/src/components/common/EmptyState";
import ErrorState from "@/src/components/common/ErrorState";
import ScreenLoader from "@/src/components/common/ScreenLoader";
import SearchBar from "@/src/components/common/SearchBar";
import TouchDetails from "@/src/components/common/TouchDetails";
import { BASE_URL } from "@/src/config/env";
import { usePotionConsumables } from "@/src/hooks/useConsumables.potion";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import SearchList from "./searchList";

export default function PotionsList() {
	const { consumables, potions } = endpoints;
	const colorScheme = useColorScheme();

	const { input, setInput, details, error, isLoading, isRefreshing, refetch } =
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
			<SearchBar
				value={input}
				onChange={setInput}
				placeholder="Search Potion name..."
			/>

			<Divider />

			<TouchDetails paddingBottom={0} />

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
		paddingHorizontal: 16,
		gap: 10,
		paddingVertical: 10,
	},
	light: {
		backgroundColor: "#F9FAFB",
	},
	dark: {
		backgroundColor: "#0F172A",
	},
});
