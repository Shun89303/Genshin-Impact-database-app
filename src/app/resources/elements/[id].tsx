import ElementDetails from "@/src/components/resources/elements/elementDetails";
import styles from "@/src/components/styles.modules";
import { useElementsStore } from "@/src/store/useElementsStore";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function ElementsDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();
	const fetchElementDetails = useElementsStore(
		(state) => state.fetchElementDetails
	);
	const error = useElementsStore((state) => state.error);
	const cache = useElementsStore((state) => state.cache);
	const loadingId = useElementsStore((state) => state.loadingId);

	useFocusEffect(
		useCallback(() => {
			fetchElementDetails(id);
		}, [fetchElementDetails, id])
	);

	const loading = loadingId === id;
	const details = cache[id];

	if (loading || !details)
		return (
			<>
				<Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
					Loading Item: {id}
				</Text>
				<ActivityIndicator />
			</>
		);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	return (
		<View>
			<Text style={{ textAlign: "center" }}>Element Details</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<ElementDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
