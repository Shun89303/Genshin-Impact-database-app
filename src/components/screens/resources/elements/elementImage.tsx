import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useElementsStore } from "@/src/store/useElementsStore";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function ElementImage({ id, size = 100 }: any) {
	const { error } = useElementsStore();
	const [loading, setLoading] = useState(true);
	const [imageError, setImageError] = useState(false);
	const { elements, icon } = endpoints;

	const imageUri = `${BASE_URL}${elements}/${id}${icon}`;

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<Text style={localStyles.errorText}>{error}</Text>
			</View>
		);
	}

	return (
		<View style={[localStyles.container, { width: size, height: size }]}>
			{loading && !imageError && (
				<ActivityIndicator
					style={localStyles.loader}
					size="small"
					color="#FFFFFF"
				/>
			)}

			{!imageError ? (
				<Image
					source={{ uri: imageUri }}
					style={[localStyles.image, { width: size, height: size }]}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
					onError={() => setImageError(true)}
				/>
			) : (
				<View style={localStyles.fallback}>
					<Text style={localStyles.fallbackText}>No Image</Text>
				</View>
			)}
		</View>
	);
}

const localStyles = StyleSheet.create({
	container: {
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#000000ff",
		justifyContent: "center",
		alignItems: "center",
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
		backgroundColor: "#3A3A3A",
		borderRadius: 12,
	},

	fallbackText: {
		color: "#BBBBBB",
		fontSize: 12,
		fontWeight: "600",
	},

	errorText: {
		color: "#FF6B6B",
		fontSize: 12,
		fontWeight: "600",
		textAlign: "center",
		padding: 4,
	},
});
