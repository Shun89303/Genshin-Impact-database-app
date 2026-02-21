import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import styles from "../styles.modules";

export default function ArtifactImage({ id }: any) {
	const { error } = useArtifactsStore();
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const artifacts = endpoints.artifacts;
	const circletOfLogos = endpoints.circletOfLogos;
	const failedImageIds = useArtifactsStore((state) => state.failedImageIds);
	const markImageFailed = useArtifactsStore((state) => state.markImageFailed);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (failedImageIds.has(id)) {
		return (
			<Pressable
				onPress={() =>
					router.push({ pathname: "/artifacts/[id]", params: { id } })
				}
			>
				<View
					style={{
						width: 80,
						height: 80,
						margin: 4,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={{ fontSize: 10, textAlign: "center" }}>
						No images for {id}
					</Text>
				</View>
			</Pressable>
		);
	}
	return (
		<>
			<Pressable
				onPress={() =>
					router.push({ pathname: "/artifacts/[id]", params: { id } })
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: `${BASE_URL}${artifacts}/${id}${circletOfLogos}` }}
					style={{ width: 80, height: 80, margin: 4 }}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
					onError={() => markImageFailed(id)}
				/>
			</Pressable>
		</>
	);
}
