import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
	item: string;
};

export default function CharacterImage({ item }: Props) {
	const [imageError, setImageError] = useState(false);
	const { characters, icon } = endpoints;

	return (
		<View style={styles.wrapper}>
			{!imageError ? (
				<Image
					source={{
						uri: `${BASE_URL}${characters}/${item}${icon}`,
					}}
					style={styles.image}
					contentFit="contain"
					cachePolicy="memory-disk"
					onError={() => setImageError(true)}
				/>
			) : (
				<View style={[styles.image, styles.fallback]}>
					<Text style={styles.fallbackText}>No Image</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: 60,
		height: 60,
		marginRight: 10,
		borderRadius: 12,
		backgroundColor: "#1E1E1E",
		justifyContent: "center",
		alignItems: "center",
	},

	image: {
		width: 45,
		height: 45,
	},

	fallback: {
		backgroundColor: "#2C2C2C",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},

	fallbackText: {
		fontSize: 9,
		color: "#888",
		textAlign: "center",
	},
});
