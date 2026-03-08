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
		backgroundColor: "#F0F0F0", // soft slightly dark for contrast
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#D0D0D0",
	},

	image: {
		width: 45,
		height: 45,
		borderRadius: 8,
	},

	fallback: {
		backgroundColor: "#E8E8E8", // slightly darker fallback
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},

	fallbackText: {
		fontSize: 10,
		color: "#888888",
		textAlign: "center",
	},
});
