import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { ApiItem } from "@/src/types/common.ascension.material";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MaterialsImage({ id, rarity, name }: ApiItem) {
	const materials = endpoints.materials;
	const commonAscension = endpoints.commonAscension;
	const [imageError, setImageError] = useState(false);
	const router = useRouter();

	return (
		<Pressable
			style={({ pressed }) => [styles.card, pressed && styles.pressed]}
			onPress={() =>
				router.replace({
					pathname:
						"/resources/materials/details/character/ascension/common/[id]",
					params: { id },
				})
			}
		>
			{/* Image */}
			{!imageError ? (
				<Image
					source={{
						uri: `${BASE_URL}${materials}${commonAscension}/${id}`,
					}}
					style={styles.image}
					contentFit="contain"
					cachePolicy="memory-disk"
					onError={() => setImageError(true)}
				/>
			) : (
				<View style={[styles.image, styles.fallback]}>
					<Text style={styles.fallbackText}>No Image</Text>
				</View>
			)}

			{/* Info */}
			<View style={styles.info}>
				<Text style={styles.rarity}>{"★".repeat(rarity ?? 0)}</Text>
				<Text style={styles.name}>{name}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 110,
		padding: 8,
		borderRadius: 14,
		backgroundColor: "#1E1E1E",
		alignItems: "center",
	},

	pressed: {
		opacity: 0.7,
	},

	image: {
		width: 100,
		height: 100,
	},

	fallback: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#2C2C2C",
		borderRadius: 10,
	},

	fallbackText: {
		fontSize: 12,
		color: "#888",
	},

	info: {
		marginTop: 6,
		alignItems: "center",
	},

	rarity: {
		fontSize: 12,
		color: "#F5C518",
		marginBottom: 2,
	},

	name: {
		fontSize: 13,
		color: "#E0E0E0",
		textAlign: "center",
	},
});
