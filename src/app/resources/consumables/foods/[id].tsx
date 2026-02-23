import FoodDetails from "@/src/components/consumables/food/foodDetails";
import styles from "@/src/components/styles.modules";
import { useConsumablesStore } from "@/src/store/useConsumablesStore";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function FoodDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();
	const storeFoodDetails = useConsumablesStore(
		(state) => state.storeFoodDetails
	);
	const error = useConsumablesStore((state) => state.error);
	const cache = useConsumablesStore((state) => state.cache);
	const loadingId = useConsumablesStore((state) => state.loadingId);

	useFocusEffect(
		useCallback(() => {
			storeFoodDetails(id);
		}, [storeFoodDetails, id])
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
			<Text style={{ textAlign: "center" }}>Food Details</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<FoodDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
