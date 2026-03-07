import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

interface Props {
	id: string;
}

export default function MaterialsImage({ id }: Props) {
	const materials = endpoints.materials;
	const weaponAscension = endpoints.weaponAscension;
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	return (
		<Pressable
			style={styles.container}
			onPress={() =>
				router.navigate({
					pathname: "/resources/materials/details/weapon/ascension/[id]",
					params: { id },
				})
			}
		>
			<View style={styles.imageWrapper}>
				{loading && (
					<ActivityIndicator
						style={styles.loader}
						size="small"
						color="#3b82f6"
					/>
				)}
				<Image
					source={{ uri: `${BASE_URL}${materials}${weaponAscension}/${id}` }}
					style={styles.image}
					contentFit="contain"
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
				/>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 4,
		borderRadius: 12,
		overflow: "hidden",
	},

	imageWrapper: {
		width: 70,
		height: 70,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f1f5f9",
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2, // Android shadow
	},

	image: {
		width: "100%",
		height: "100%",
		borderRadius: 12,
	},

	loader: {
		position: "absolute",
		zIndex: 10,
	},
});
