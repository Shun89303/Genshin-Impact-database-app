import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharactersStore } from "@/src/store/useCharactersStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import styles from "./styles/characterImage.styles";

export default function CharacterImage({ id }: { id: string }) {
	const { error } = useCharactersStore();
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);
	const router = useRouter();

	const characters = endpoints.characters;
	const card = endpoints.card;

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);
	}

	return (
		<Pressable
			style={({ pressed }) => [styles.card, pressed && styles.pressed]}
			onPress={() =>
				router.push({ pathname: "/characters/[id]", params: { id } })
			}
		>
			<View style={styles.imageWrapper}>
				{!failed ? (
					<Image
						source={{ uri: `${BASE_URL}${characters}/${id}${card}` }}
						style={styles.image}
						cachePolicy="memory-disk"
						onLoad={() => setLoading(false)}
						onError={() => {
							setLoading(false);
							setFailed(true);
						}}
					/>
				) : (
					<View style={styles.unavailable}>
						<Text style={styles.unavailableText}>Image Unavailable</Text>
					</View>
				)}

				{loading && !failed && (
					<View style={styles.loaderOverlay}>
						<ActivityIndicator size="small" />
					</View>
				)}
			</View>
		</Pressable>
	);
}
