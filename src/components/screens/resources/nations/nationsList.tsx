import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/common/EmptyState";
import ErrorState from "@/src/components/common/ErrorState";
import ScreenLoader from "@/src/components/common/ScreenLoader";
import { BASE_URL } from "@/src/config/env";
import { useNations } from "@/src/hooks/useNations";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NationCard from "./nationCard";

export default function NationsList() {
	const { nations, icon } = endpoints;
	const { details, error, isLoading, isRefreshing, refetch } = useNations();

	useEffect(() => {
		if (!details.length) return;

		details.forEach((nation) => {
			Image.prefetch(`${BASE_URL}${nations}/${nation.id}${icon}`);
		});
	}, [details, nations, icon]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message="No nations found" onRetry={refetch} />;

	return (
		<View style={styles.container}>
			<FlatList
				data={details}
				keyExtractor={(nation) => nation.id}
				removeClippedSubviews
				refreshing={isRefreshing}
				onRefresh={refetch}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<NationCard
						id={item.id}
						name={item.name}
						element={item.element}
						archon={item.archon}
						controllingEntity={item.controllingEntity}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f8f8", // subtle background for better contrast
	},
	listContent: {
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
});
