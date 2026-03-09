import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useBosses } from "@/src/hooks/useBosses";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Divider from "../../common/Divider";
import EmptyState from "../../common/EmptyState";
import ErrorState from "../../common/ErrorState";
import ScreenLoader from "../../common/ScreenLoader";
import SearchBar from "../../common/SearchBar";
import TouchDetails from "../../common/TouchDetails";
import SearchList from "./SearchList";

export default function BossesList() {
	const { boss, weeklyBoss, icon } = endpoints;

	const {
		ids,
		input,
		setInput,
		details,
		error,
		isLoading,
		isRefreshing,
		refetch,
	} = useBosses();

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
			<SearchBar
				value={input}
				onChange={setInput}
				placeholder="Search Boss name..."
			/>

			<Divider />

			<TouchDetails />

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
		backgroundColor: "#F8FAFC",
	},
});
