import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function MaterialsImageFallback({ id }: any) {
	const materials = endpoints.materials;
	const talentBook = endpoints.talentBook;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const imageUri = `${BASE_URL}${materials}${talentBook}/${id}`;

	return (
		<View style={styles.container}>
			{loading && (
				<ActivityIndicator style={styles.loader} size="small" color="#3B82F6" />
			)}
			{!error ? (
				<Image
					source={{ uri: imageUri }}
					style={styles.image}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
					onError={() => {
						setLoading(false);
						setError(true);
					}}
				/>
			) : (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>Image failed</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		margin: 4,
		borderRadius: 12,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 12,
	},
	loader: {
		position: "absolute",
		zIndex: 1,
	},
	errorContainer: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E5E7EB",
		borderRadius: 12,
		padding: 4,
	},
	errorText: {
		color: "#6B7280",
		fontSize: 12,
		textAlign: "center",
	},
});
