import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharactersStore } from "@/src/store/useCharactersStore";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
	id: string;
};

export default function CharacterImage({ id }: Props) {
	const { error } = useCharactersStore();
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	const { characters, icon } = endpoints;

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{!failed ? (
				<Image
					source={{ uri: `${BASE_URL}${characters}/${id}${icon}` }}
					style={styles.image}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
					onError={() => {
						setLoading(false);
						setFailed(true);
					}}
				/>
			) : (
				<View style={styles.fallback}>
					<Text style={styles.fallbackText}>Image Unavailable</Text>
				</View>
			)}

			{loading && !failed && (
				<ActivityIndicator
					style={StyleSheet.absoluteFill}
					size="small"
					color="#888"
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#F5F5F5",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 8,
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
	},
	fallback: {
		width: "100%",
		height: "100%",
		backgroundColor: "#E0E0E0",
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 10,
		color: "#888",
		textAlign: "center",
	},
	errorContainer: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FDECEA",
		borderRadius: 8,
		padding: 4,
	},
	errorText: {
		fontSize: 10,
		color: "#D32F2F",
		textAlign: "center",
	},
});
