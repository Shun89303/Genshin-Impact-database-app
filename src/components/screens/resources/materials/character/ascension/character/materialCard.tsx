import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Normalized } from "@/src/types/character.ascension.material";

import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MaterialCard({
	id,
	name,
	sources,
	rarity,
	element,
	title,
}: Normalized) {
	const { materials, characterAscension } = endpoints;
	const [imageError, setImageError] = useState(false);

	return (
		<View style={styles.card}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.element}>{element}</Text>
				<Text style={styles.type}>{title}</Text>
			</View>

			{/* Image */}
			<View style={styles.imageWrapper}>
				{!imageError ? (
					<Image
						source={{
							uri: `${BASE_URL}${materials}${characterAscension}/${id}`,
						}}
						style={styles.image}
						contentFit="contain"
						cachePolicy="memory-disk"
						onError={() => setImageError(true)}
					/>
				) : (
					<View style={styles.fallback}>
						<Text style={styles.fallbackText}>Image Not Available</Text>
					</View>
				)}
			</View>

			{/* Info */}
			<View style={styles.infoBox}>
				<Text style={styles.rarity}>{"★".repeat(rarity ?? 0)}</Text>
				<Text style={styles.name}>{name}</Text>
			</View>

			{/* Sources */}
			{sources?.length ? (
				<View style={styles.sources}>
					<Text style={styles.source}>Sources</Text>
					{sources.map((s) => (
						<Text key={s} style={styles.sourceItem}>
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
		backgroundColor: "#1e1e1e",
		borderRadius: 12,
		padding: 16,
		marginVertical: 8,
	},

	header: {
		marginBottom: 8,
		alignItems: "center",
	},

	element: {
		fontSize: 14,
		fontWeight: "600",
		color: "#bbb",
	},

	source: {
		fontSize: 14,
		fontWeight: "600",
		color: "#bbb",
	},

	type: {
		fontSize: 12,
		color: "#888",
		marginTop: 2,
	},

	imageWrapper: {
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 12,
	},

	image: {
		width: 100,
		height: 100,
	},

	fallback: {
		width: 100,
		height: 100,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#2a2a2a",
		borderRadius: 8,
	},

	fallbackText: {
		fontSize: 12,
		color: "#888",
		textAlign: "center",
	},

	name: {
		fontSize: 16,
		fontWeight: "700",
		color: "#fff",
		marginBottom: 4,
	},

	rarity: {
		fontSize: 14,
		color: "#f5c542",
		marginBottom: 8,
	},

	sources: {
		marginTop: 8,
	},

	sourceItem: {
		fontSize: 12,
		color: "#ccc",
		marginBottom: 2,
	},

	infoBox: {
		alignItems: "center",
	},
});
