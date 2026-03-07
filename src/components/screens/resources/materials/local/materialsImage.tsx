import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
	id: string;
};

export default function MaterialsImage({ id }: Props) {
	const materials = endpoints.materials;
	const localSpecialties = endpoints.localSpecialties;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const uri = `${BASE_URL}${materials}${localSpecialties}/${id}`;

	return (
		<View style={styles.container}>
			{loading && !error && (
				<ActivityIndicator
					style={StyleSheet.absoluteFill}
					size="small"
					color="#888"
				/>
			)}
			{error ? (
				<View style={styles.fallback}>
					<Text style={styles.fallbackText}>Image failed</Text>
				</View>
			) : (
				<Image
					source={{ uri }}
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
		width: 100,
		height: 100,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#F5F5F5", // neutral background
		justifyContent: "center",
		alignItems: "center",
		margin: 4,
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 12,
	},
	fallback: {
		width: "100%",
		height: "100%",
		backgroundColor: "#E0E0E0", // neutral fallback background
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		color: "#888",
		fontSize: 12,
		textAlign: "center",
	},
});
