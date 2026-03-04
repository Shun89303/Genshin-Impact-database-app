import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Normalized } from "@/src/types/cooking.material";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MaterialCard({
	id,
	name,
	description,
	rarity,
	sources,
}: Normalized) {
	const { materials, cookingIngredients } = endpoints;
	const [imageError, setImageError] = useState(false);

	return (
		<View style={styles.card}>
			<Text style={styles.title}>{name}</Text>

			<View style={styles.imageContainer}>
				{!imageError ? (
					<Image
						source={{
							uri: `${BASE_URL}${materials}${cookingIngredients}/${id}`,
						}}
						style={styles.image}
						cachePolicy="memory-disk"
						onError={() => setImageError(true)}
					/>
				) : (
					<View style={styles.fallback}>
						<Text style={styles.fallbackText}>Image Not Available</Text>
					</View>
				)}
			</View>

			<Text style={styles.rarity}>{"★".repeat(rarity ?? 0)}</Text>

			<Text style={styles.description}>
				{description ?? "Description unavailable"}
			</Text>

			{sources?.length ? (
				<View style={styles.sourceContainer}>
					{sources.map((s) => (
						<Text key={s} style={styles.sourceText}>
							• {s}
						</Text>
					))}
				</View>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 16,
		marginVertical: 8,
		marginHorizontal: 12,
		borderRadius: 12,
		elevation: 3,
	},

	title: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 8,
		textAlign: "center",
	},

	imageContainer: {
		alignItems: "center",
		marginBottom: 8,
	},

	image: {
		width: 100,
		height: 100,
	},

	fallback: {
		width: 100,
		height: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
	},

	fallbackText: {
		fontSize: 12,
		color: "#777",
		textAlign: "center",
	},

	rarity: {
		fontSize: 14,
		color: "#d4af37",
		marginBottom: 6,
		textAlign: "center",
	},

	description: {
		fontSize: 14,
		color: "#444",
		marginBottom: 8,
	},

	sourceContainer: {
		marginTop: 4,
	},

	sourceText: {
		fontSize: 13,
		color: "#555",
		marginBottom: 2,
	},
});
