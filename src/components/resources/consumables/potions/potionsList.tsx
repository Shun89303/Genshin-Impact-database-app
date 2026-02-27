import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { usePotionStore } from "@/src/store/usePotion.consumables.store";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import PotionImage from "./potionImage";

export default function PotionsList() {
	const fetchPotionsObject = usePotionStore(
		(state) => state.fetchPotionsObject
	);
	const fetchPotionImageIds = usePotionStore(
		(state) => state.fetchPotionImageIds
	);
	const potionsIds = usePotionStore((state) => state.potionsIds);
	const { error } = usePotionStore();
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
