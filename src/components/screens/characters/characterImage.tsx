import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharactersStore } from "@/src/store/useCharactersStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function CharacterImage({ id }: { id: string }) {
	const { error } = useCharactersStore();
	const [loading, setLoading] = useState(true);
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
				<Image
					source={{ uri: `${BASE_URL}${characters}/${id}${card}` }}
					style={styles.image}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
				/>

				{loading && (
					<View style={styles.loaderOverlay}>
						<ActivityIndicator size="small" />
					</View>
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 100,
		borderRadius: 14,
		overflow: "hidden",
		backgroundColor: "#1E293B",
	},

	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.98 }],
	},

	imageWrapper: {
		width: "100%",
		aspectRatio: 0.5, // keeps 100x200 ratio clean
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0F172A",
	},

	image: {
		width: "100%",
		height: "100%",
	},

	loaderOverlay: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
	},

	errorContainer: {
		width: 100,
		height: 200,
		justifyContent: "center",
		alignItems: "center",
	},

	errorText: {
		fontSize: 12,
		textAlign: "center",
	},
});
