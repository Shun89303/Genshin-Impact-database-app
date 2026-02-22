import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useBossesStore } from "@/src/store/useBossesStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import styles from "../styles.modules";

export default function BossImage({ id }: any) {
	const { error } = useBossesStore();
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const boss = endpoints.boss;
	const weeklyBoss = endpoints.weeklyBoss;
	const icon = endpoints.icon;

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
					router.push({ pathname: "/bosses/[id]", params: { id } })
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: `${BASE_URL}${boss}${weeklyBoss}/${id}${icon}` }}
					style={{ width: 100, height: 100, margin: 4 }}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
				/>
			</Pressable>
		</>
	);
}
