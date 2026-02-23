import PotionDetails from "@/src/components/consumables/potions/potionDetails";
import styles from "@/src/components/styles.modules";
import { useConsumablesStore } from "@/src/store/useConsumablesStore";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function PotionDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();
	const storePotionDetails = useConsumablesStore(
		(state) => state.storePotionDetails
	);
	const error = useConsumablesStore((state) => state.error);
	const cache = useConsumablesStore((state) => state.cache);
	const loadingId = useConsumablesStore((state) => state.loadingId);

	useFocusEffect(
		useCallback(() => {
			storePotionDetails(id);
		}, [storePotionDetails, id])
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
			<Text style={{ textAlign: "center" }}>Potion Details</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<PotionDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
