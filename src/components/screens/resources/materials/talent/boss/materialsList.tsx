import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import SearchBar from "@/src/components/utils/filter/talentBoss/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useBossTalentMaterials } from "@/src/hooks/useMaterials.talent.boss";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import SearchList from "./searchList";

export default function MaterialsList() {
	const { materials, talentBoss } = endpoints;

	const { input, details, error, isLoading, isRefreshing, refetch } =
		useBossTalentMaterials();

	const basePath = `${BASE_URL}${materials}${talentBoss}`;

	useEffect(() => {
		if (!details?.length) return;

		details.forEach((mat) => {
			Image.prefetch(`${basePath}/${mat.id}`);
		});
	}, [details, basePath]);

	const finalData = useMemo(() => {
		if (!input.trim()) return details;

		const lower = input.toLowerCase();

		return details.filter(
			(boss) =>
				boss.id.toLowerCase().includes(lower) ||
				boss.name.toLowerCase().includes(lower)
		);
	}, [details, input]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (!details.length)
		return <EmptyState message="No materials found" onRetry={refetch} />;

	return (
		<View style={styles.container}>
			<SearchBar />
			<View style={styles.listContainer}>
				<SearchList
					finalData={finalData}
					refreshing={isRefreshing}
					onRefresh={refetch}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 8,
	},

	listContainer: {
		flex: 1,
		marginTop: 8,
	},
});
