import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/common/EmptyState";
import ErrorState from "@/src/components/common/ErrorState";
import ScreenLoader from "@/src/components/common/ScreenLoader";
import { BASE_URL } from "@/src/config/env";
import { useElements } from "@/src/hooks/useElements";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ElementCard from "./elementCard";

export default function ElementsList() {
	const { elements, icon } = endpoints;
	const { details, error, isLoading, isRefreshing, refetch } = useElements();

	useEffect(() => {
		if (!details.length) return;
		details.forEach((element) => {
			Image.prefetch(`${BASE_URL}${elements}/${element.id}${icon}`);
		});
	}, [details, elements, icon]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No potions found"} onRetry={refetch} />;

	return (
		<View style={styles.container}>
			<FlatList
				data={details}
				keyExtractor={(element) => element.id}
				contentContainerStyle={styles.listContent}
				removeClippedSubviews
				refreshing={isRefreshing}
				onRefresh={refetch}
				renderItem={({ item }) => (
					<ElementCard
						name={item.name}
						reactions={item.reactions ?? []}
						id={item.id}
					/>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 10,
		backgroundColor: "#f9f9f9", // subtle background for better contrast
	},
	listContent: {
		paddingBottom: 20,
		width: "100%",
		maxWidth: 600, // constrain on larger screens
	},
	separator: {
		height: 12,
	},
});
