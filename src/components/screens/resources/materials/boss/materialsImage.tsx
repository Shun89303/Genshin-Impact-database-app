import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
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

type Props = {
	id: string;
	size?: number; // optional size prop
};

export default function MaterialsImage({ id, size = 100 }: Props) {
	const materials = endpoints.materials;
	const bossMaterials = endpoints.bossMaterials;
	const [loading, setLoading] = useState(true);
	const [imageError, setImageError] = useState(false);
	const router = useRouter();

	const imageUri = `${BASE_URL}${materials}${bossMaterials}/${id}`;

	return (
		<Pressable
			onPress={() =>
				router.replace({
					pathname: "/resources/materials/details/boss/[id]",
					params: { id },
				})
			}
			style={styles.pressable}
		>
			<View style={[styles.imageWrapper, { width: size, height: size }]}>
				{loading && !imageError && (
					<ActivityIndicator
						style={styles.loader}
						size="small"
						color="#FFFFFF"
					/>
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
		</Pressable>
	);
}

const styles = StyleSheet.create({
	pressable: {
		borderRadius: 12,
		overflow: "hidden",
	},

	imageWrapper: {
		borderRadius: 12,
		backgroundColor: "#2E2E2E",
		justifyContent: "center",
		alignItems: "center",
		margin: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 4,
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
