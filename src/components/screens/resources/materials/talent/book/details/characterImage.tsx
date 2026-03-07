import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharactersStore } from "@/src/store/useCharactersStore";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function CharacterImage({ id }: { id: string }) {
	const { error } = useCharactersStore();
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	const { characters, icon } = endpoints;

	if (error) {
		return (
			<View style={styles.errorWrapper}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{!failed ? (
				<Image
					source={{ uri: `${BASE_URL}${characters}/${id}${icon}` }}
					style={styles.image}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
					onError={() => {
						setLoading(false);
						setFailed(true);
					}}
				/>
			) : (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>Image Unavailable</Text>
				</View>
			)}

			{loading && !failed && (
				<ActivityIndicator style={styles.loader} size="small" color="#3B82F6" />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		margin: 4,
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#F1F5F9",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
	},
	loader: {
		position: "absolute",
		zIndex: 1,
	},
	errorContainer: {
		width: "100%",
		height: "100%",
		backgroundColor: "#E5E7EB",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		padding: 2,
	},
	errorWrapper: {
		padding: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "#6B7280",
		fontSize: 10,
		textAlign: "center",
	},
});
