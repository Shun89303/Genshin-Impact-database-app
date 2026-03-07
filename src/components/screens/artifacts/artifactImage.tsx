import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
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

export default function ArtifactImage({ id }: { id: string }) {
	const { error } = useArtifactsStore();
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);
	const router = useRouter();

	const { artifacts, circletOfLogos } = endpoints;

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);
	}

	return (
		<Pressable
			style={({ pressed }) => [styles.card, pressed && styles.pressed]}
			onPress={() =>
				router.navigate({ pathname: "/artifacts/[id]", params: { id } })
			}
		>
			<View style={styles.imageWrapper}>
				{!failed ? (
					<Image
						source={{ uri: `${BASE_URL}${artifacts}/${id}${circletOfLogos}` }}
						style={styles.image}
						contentFit="contain"
						cachePolicy="memory-disk"
						onLoad={() => setLoading(false)}
						onError={() => {
							setLoading(false);
							setFailed(true);
						}}
					/>
				) : (
					<View style={styles.unavailable}>
						<Text style={styles.unavailableText}>No Image</Text>
					</View>
				)}

				{loading && !failed && (
					<View style={styles.loaderOverlay}>
						<ActivityIndicator size="small" />
					</View>
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 100,
		height: 100,
		marginHorizontal: 6,
		marginBottom: 6,
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#1E293B",
	},

	pressed: {
		opacity: 0.7,
	},

	imageWrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	image: {
		width: "100%",
		height: "100%",
	},

	loaderOverlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
	},

	unavailable: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#1E293B",
	},

	unavailableText: {
		fontSize: 12,
		color: "#94A3B8",
		textAlign: "center",
	},

	errorContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 8,
	},

	errorText: {
		color: "#EF4444",
		fontSize: 12,
		textAlign: "center",
	},
});
