import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useNationsStore } from "@/src/store/useNationsStore";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function NationImage({ id }: { id: string }) {
	const { error } = useNationsStore();
	const [loading, setLoading] = useState(true);
	const { nations, icon } = endpoints;

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text style={localStyles.errorText}>{error}</Text>
			</View>
		);

	return (
		<View style={localStyles.container}>
			{loading && (
				<ActivityIndicator
					size="small"
					color="#999999"
					style={localStyles.loader}
				/>
			)}
			<Image
				source={{ uri: `${BASE_URL}${nations}/${id}${icon}` }}
				style={localStyles.image}
				cachePolicy="memory-disk"
				onLoad={() => setLoading(false)}
			/>
		</View>
	);
}

const localStyles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		margin: 4,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#000000ff", // subtle neutral background behind image
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#D0D0D0",
	},

	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},

	loader: {
		position: "absolute",
	},

	errorText: {
		color: "#FF4D4F",
		fontSize: 12,
		textAlign: "center",
	},
});
