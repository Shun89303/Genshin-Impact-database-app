import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useConsumablesStore } from "@/src/store/useConsumablesStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../../styles.modules";
import PotionImage from "./potionImage";

export default function PotionsList() {
	const fetchPotionsObject = useConsumablesStore(
		(state) => state.fetchPotionsObject
	);
	const fetchPotionImageIds = useConsumablesStore(
		(state) => state.fetchPotionImageIds
	);
	const potionsIds = useConsumablesStore((state) => state.potionsIds);
	const { error } = useConsumablesStore();
	const consumables = endpoints.consumables;
	const potions = endpoints.potions;

	useEffect(() => {
		if (!potionsIds?.length) {
			fetchPotionsObject();
			fetchPotionImageIds();
			return;
		}

		const remainingIds = potionsIds.slice(5);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${consumables}${potions}/${id}`);
		});
	}, [
		fetchPotionsObject,
		fetchPotionImageIds,
		consumables,
		potionsIds,
		potions,
	]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!potionsIds?.length)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<>
			<FlatList
				data={potionsIds}
				keyExtractor={(id) => id}
				numColumns={3}
				initialNumToRender={6}
				windowSize={6}
				removeClippedSubviews
				renderItem={({ item }) => <PotionImage id={item} />}
			/>
		</>
	);
}
