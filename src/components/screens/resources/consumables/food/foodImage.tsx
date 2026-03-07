import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useFoodStore } from "@/src/store/useFood.consumables.store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function FoodImage({ id }: any) {
	const { error } = useFoodStore();
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);
	const router = useRouter();

	const consumables = endpoints.consumables;
	const food = endpoints.food;

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	return (
		<Pressable
			onPress={() =>
				router.navigate({
					pathname: "/resources/consumables/foods/[id]",
					params: { id },
				})
			}
		>
			{loading && !failed && <ActivityIndicator />}

			{failed ? (
				<View
					style={{
						width: 100,
						height: 100,
						margin: 4,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#e5e5e5",
						borderRadius: 12,
					}}
				>
					<Text style={{ textAlign: "center" }}>Image not available</Text>
				</View>
			) : (
				<Image
					source={{ uri: `${BASE_URL}${consumables}${food}/${id}` }}
					style={{ width: 100, height: 100, margin: 4 }}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
					onError={() => {
						setLoading(false);
						setFailed(true);
					}}
				/>
			)}
		</Pressable>
	);
}
