import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useFoodStore } from "@/src/store/useFood.consumables.store";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import FoodImage from "./foodImage";

export default function FoodList() {
	const fetchFoodObject = useFoodStore((state) => state.fetchFoodObject);
	const fetchFoodImageIds = useFoodStore((state) => state.fetchFoodImageIds);
	const foodIds = useFoodStore((state) => state.foodIds);
	const { error } = useFoodStore();
	const food = endpoints.food;
	const consumables = endpoints.consumables;

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
