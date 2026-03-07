import ScreenLoader from "@/src/components/ui/ScreenLoader";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MaterialImageFallback({
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
				<Text style={styles.unavailableText}>Image Unavailable</Text>
			</View>
		);
	}

	return (
		<View style={style}>
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

			{loading && (
				<View style={styles.loader}>
					<ScreenLoader />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	loader: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
	},

	unavailable: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#334155",
	},

	unavailableText: {
		color: "#CBD5E1",
		fontSize: 10,
		textAlign: "center",
		paddingHorizontal: 2,
	},
});
