import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function CharacterImage({ id }: { id: string }) {
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	const chaURL = endpoints.characters;
	const icon = endpoints.icon;

	if (failed) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>No Image</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{loading && <ActivityIndicator size="small" color="#CBD5E1" />}
			<Image
				source={{ uri: `${BASE_URL}${chaURL}/${id}${icon}` }}
				cachePolicy="memory-disk"
				style={styles.image}
				onLoad={() => setLoading(false)}
				onError={() => {
					setLoading(false);
					setFailed(true);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		margin: 4,
		justifyContent: "center",
		alignItems: "center",
	},

	image: {
		width: 50,
		height: 50,
		borderRadius: 6,
	},

	fallbackContainer: {
		width: 50,
		height: 50,
		margin: 4,
		backgroundColor: "#334155",
		borderRadius: 6,
		justifyContent: "center",
		alignItems: "center",
	},

	fallbackText: {
		color: "#F1F5F9",
		fontSize: 10,
		textAlign: "center",
	},
});
