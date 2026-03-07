import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useElementsStore } from "@/src/store/useElementsStore";
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

export default function ElementImage({ id, size = 100 }: any) {
	const { error } = useElementsStore();
	const [loading, setLoading] = useState(true);
	const [imageError, setImageError] = useState(false);
	const router = useRouter();
	const elements = endpoints.elements;
	const icon = endpoints.icon;

	const imageUri = `${BASE_URL}${elements}/${id}${icon}`;

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<Pressable
			onPress={() =>
				router.navigate({
					pathname: "/resources/elements/[id]",
					params: { id },
				})
			}
			style={localStyles.pressable}
		>
			<View style={{ width: size, height: size }}>
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
		</Pressable>
	);
}

const localStyles = StyleSheet.create({
	pressable: {
		borderRadius: 12,
		overflow: "hidden",
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
		color: "#AAAAAA",
		fontSize: 12,
		fontWeight: "600",
	},
});
