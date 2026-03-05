import ScreenLoader from "@/src/components/ui/ScreenLoader";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "./styles/weaponImageFallback.styles";

export default function WeaponImageFallback({
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
				<Text style={styles.unavailableText}>Weapon Image Unavailable</Text>
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

			{loading && (
				<View style={styles.loader}>
					<ScreenLoader />
				</View>
			)}
		</View>
	);
}
