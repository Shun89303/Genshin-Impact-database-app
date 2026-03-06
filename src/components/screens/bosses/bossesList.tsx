import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useBosses } from "@/src/hooks/useBosses";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import EmptyState from "../../ui/EmptyState";
import ErrorState from "../../ui/ErrorState";
import ScreenLoader from "../../ui/ScreenLoader";
import SearchBar from "../../utils/filter/boss/searchBar";
import SearchList from "./SearchList";

export default function BossesList() {
	const boss = endpoints.boss;
	const weeklyBoss = endpoints.weeklyBoss;
	const icon = endpoints.icon;

	const { ids, input, details, error, isLoading, isRefreshing, refetch } =
		useBosses();

	useEffect(() => {
		if (!ids.length) return;

		ids.forEach((id) => {
			Image.prefetch(`${BASE_URL}${boss}${weeklyBoss}/${id}${icon}`);
		});
	}, [ids, boss, weeklyBoss, icon]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((boss) => boss.name.toLowerCase().includes(lower));
		}

		return result;
	}, [details, input]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (ids.length === 0)
		return <EmptyState message="No bosses found" onRetry={refetch} />;

	return (
		<View style={styles.container}>
			<SearchBar />

			<View style={styles.divider} />

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
		backgroundColor: "#0F172A",
	},

	divider: {
		height: 1,
		backgroundColor: "#334155",
		marginVertical: 12,
	},
});
