import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MaterialsImage({ id }: { id: string }) {
	const materials = endpoints.materials;
	const commonAscension = endpoints.commonAscension;
	const [imageError, setImageError] = useState(false);

	return (
		<View style={styles.card}>
			{!imageError ? (
				<Image
					source={{ uri: `${BASE_URL}${materials}${commonAscension}/${id}` }}
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
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 100,
		height: 100,
		padding: 8,
		borderRadius: 12,
		marginRight: 12,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#E5E7EB",
		alignItems: "center",
		justifyContent: "center",
	},

	image: {
		width: 90,
		height: 90,
	},

	fallback: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F3F4F6",
		borderRadius: 8,
	},

	fallbackText: {
		fontSize: 12,
		color: "#6B7280",
		fontWeight: "500",
	},
});
