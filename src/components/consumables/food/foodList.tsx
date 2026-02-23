import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useConsumablesStore } from "@/src/store/useConsumablesStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../../styles.modules";
import FoodImage from "./foodImage";

export default function FoodList() {
	const fetchFoodObject = useConsumablesStore((state) => state.fetchFoodObject);
	const fetchFoodImageIds = useConsumablesStore(
		(state) => state.fetchFoodImageIds
	);
	const foodIds = useConsumablesStore((state) => state.foodIds);
	const { error } = useConsumablesStore();
	const consumables = endpoints.consumables;
	const food = endpoints.food;

	useEffect(() => {
		if (!foodIds?.length) {
			fetchFoodObject();
			fetchFoodImageIds();
			return;
		}

		const remainingIds = foodIds.slice(5);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${consumables}${food}/${id}`);
		});
	}, [fetchFoodObject, fetchFoodImageIds, consumables, foodIds, food]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!foodIds?.length)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<>
			<FlatList
				data={foodIds}
				keyExtractor={(id) => id}
				numColumns={3}
				initialNumToRender={6}
				windowSize={6}
				removeClippedSubviews
				renderItem={({ item }) => <FoodImage id={item} />}
			/>
		</>
	);
}
