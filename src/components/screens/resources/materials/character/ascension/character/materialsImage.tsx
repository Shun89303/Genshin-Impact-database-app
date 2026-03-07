import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function MaterialsImage({ id }: { id: string }) {
	const materials = endpoints.materials;
	const characterAscension = endpoints.characterAscension;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	return (
		<View style={styles.container}>
			{loading && !error && <ActivityIndicator color="#666" />}
			{error ? (
				<View style={styles.fallback}>
					<Text style={styles.fallbackText}>Image failed</Text>
				</View>
			) : (
				<Image
					source={{ uri: `${BASE_URL}${materials}${characterAscension}/${id}` }}
					style={styles.image}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
					onError={() => {
						setLoading(false);
						setError(true);
					}}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 70,
		height: 70,
		margin: 4,
		borderRadius: 12,
		backgroundColor: "#eeeeeeff", // light neutral background
		borderWidth: 1,
		borderColor: "#ddd", // subtle border
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden", // ensures rounded corners for image
	},

	image: {
		width: "100%",
		height: "100%",
		borderRadius: 12, // match container for smooth corners
	},

	fallback: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#e0e0e0",
		borderRadius: 12,
		padding: 4,
	},

	fallbackText: {
		fontSize: 10,
		color: "#999",
		textAlign: "center",
	},
});
