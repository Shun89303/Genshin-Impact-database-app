import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import styles from "../styles.modules";

export default function WeaponImage({ id }: any) {
	const { error } = useWeaponsStore();
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const weapons = endpoints.weapons;
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
					router.push({ pathname: "/weapons/[id]", params: { id } })
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: `${BASE_URL}${weapons}/${id}${icon}` }}
					style={{ width: 80, height: 80, margin: 4 }}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
				/>
			</Pressable>
		</>
	);
}
