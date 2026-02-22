import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharactersStore } from "@/src/store/useCharactersStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import styles from "../styles.modules";

export default function CharacterImage({ id }: any) {
	const { error } = useCharactersStore();
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const characters = endpoints.characters;
	const card = endpoints.card;

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
					router.push({ pathname: "/characters/[id]", params: { id } })
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: `${BASE_URL}${characters}/${id}${card}` }}
					style={{ width: 100, height: 200, margin: 4 }}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
				/>
			</Pressable>
		</>
	);
}
