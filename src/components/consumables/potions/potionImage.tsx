import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useConsumablesStore } from "@/src/store/useConsumablesStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import styles from "../../styles.modules";

export default function PotionImage({ id }: any) {
	const { error } = useConsumablesStore();
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const consumables = endpoints.consumables;
	const potions = endpoints.potions;

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	return (
		<>
			<Pressable
				onPress={() =>
					router.push({
						pathname: "/resources/consumables/potions/[id]",
						params: { id },
					})
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: `${BASE_URL}${consumables}${potions}/${id}` }}
					style={{ width: 100, height: 100, margin: 4 }}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
				/>
			</Pressable>
		</>
	);
}
