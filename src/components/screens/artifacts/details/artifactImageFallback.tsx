import ScreenLoader from "@/src/components/ui/ScreenLoader";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ArtifactImageFallback({
	uri,
	style,
}: {
	uri: string;
	style?: any;
}) {
	const [failed, setFailed] = useState(false);
	const [loading, setLoading] = useState(true);

	if (failed) {
		return (
			<View style={[style, styles.unavailable]}>
				<Text style={styles.unavailableText}>No Image</Text>
			</View>
		);
	}

	return (
		<View style={[style, styles.container]}>
			<Image
				source={{ uri }}
				style={StyleSheet.absoluteFill}
				contentFit="contain"
				cachePolicy="memory-disk"
				onLoad={() => setLoading(false)}
				onError={() => {
					setLoading(false);
					setFailed(true);
				}}
			/>

			{loading && <ScreenLoader />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#1E293B",
		borderRadius: 12,
		overflow: "hidden",
	},

	unavailable: {
		backgroundColor: "#334155",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},

	unavailableText: {
		color: "#94A3B8",
		fontWeight: "600",
		fontSize: 12,
		textAlign: "center",
	},
});
