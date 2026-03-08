import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
	id: string;
	size?: number;
};

export default function MaterialsImage({ id, size = 100 }: Props) {
	const materials = endpoints.materials;
	const bossMaterials = endpoints.bossMaterials;
	const [loading, setLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	const imageUri = `${BASE_URL}${materials}${bossMaterials}/${id}`;

	return (
		<View style={[styles.imageWrapper, { width: size, height: size }]}>
			{loading && !imageError && (
				<ActivityIndicator style={styles.loader} size="small" color="#CCCCCC" />
			)}

			{!imageError ? (
				<Image
					source={{ uri: imageUri }}
					style={[styles.image, { width: size, height: size }]}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
					onError={() => setImageError(true)}
				/>
			) : (
				<View style={styles.fallback}>
					<Text style={styles.fallbackText}>No Image</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	imageWrapper: {
		borderRadius: 12,
		backgroundColor: "#F0F0F0", // slightly dark, soft gray
		justifyContent: "center",
		alignItems: "center",
		margin: 4,
		borderWidth: 1,
		borderColor: "#D0D0D0",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 3,
		elevation: 2,
	},

	image: {
		borderRadius: 12,
		resizeMode: "cover",
	},

	loader: {
		position: "absolute",
	},

	fallback: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		backgroundColor: "#E8E8E8", // slightly darker fallback
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#D0D0D0",
	},

	fallbackText: {
		color: "#888888",
		fontSize: 12,
		fontWeight: "600",
	},
});
