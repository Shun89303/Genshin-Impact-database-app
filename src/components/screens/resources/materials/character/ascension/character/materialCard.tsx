import { Normalized } from "@/src/types/character.ascension.material";
import { StyleSheet, Text, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function MaterialCard({
	id,
	name,
	sources,
	rarity,
	element,
	title,
}: Normalized) {
	return (
		<View style={styles.card}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.element}>{element}</Text>
				<Text style={styles.type}>{title}</Text>
			</View>

			{/* Image */}
			<View style={styles.imageWrapper}>
				<View style={styles.imageContainer}>
					<MaterialsImage id={id} />
				</View>
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
		borderRadius: 16, // increased for smoother corners
		padding: 16,
		marginVertical: 8,
		backgroundColor: "#f9f9f9",
		borderWidth: 1,
		borderColor: "#ddd",
	},

	header: {
		marginBottom: 8,
		alignItems: "center",
	},

	element: {
		fontSize: 13,
		fontWeight: "600",
		color: "#666",
		textTransform: "capitalize",
	},

	type: {
		fontSize: 12,
		color: "#999",
		marginTop: 2,
	},

	imageWrapper: {
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 12,
	},

	imageContainer: {
		width: 100,
		height: 100,
		borderRadius: 16, // same as card for consistency
		overflow: "hidden", // ensures image respects border radius
	},

	image: {
		width: "100%",
		height: "100%",
	},

	fallback: {
		width: 100,
		height: 100,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#e0e0e0",
		borderRadius: 16,
	},

	fallbackText: {
		fontSize: 12,
		color: "#999",
		textAlign: "center",
	},

	name: {
		fontSize: 16,
		fontWeight: "700",
		color: "#333",
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

	source: {
		fontSize: 14,
		fontWeight: "600",
		color: "#666",
		marginBottom: 4,
	},

	sourceItem: {
		fontSize: 12,
		color: "#888",
		marginBottom: 2,
	},

	infoBox: {
		alignItems: "center",
	},
});
