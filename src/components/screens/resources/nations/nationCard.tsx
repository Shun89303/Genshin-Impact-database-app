import { Normalized } from "@/src/types/nation";
import { StyleSheet, Text, View } from "react-native";
import NationImage from "./nationImage";

export default function NationCard({
	name,
	element,
	archon,
	controllingEntity,
	id,
}: Normalized) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{name}</Text>

			<View style={styles.imageContainer}>
				<NationImage id={id} />
			</View>

			<View style={styles.section}>
				<Text style={styles.label}>Element</Text>
				<Text style={styles.value}>{element}</Text>
			</View>

			<View style={styles.section}>
				<Text style={styles.label}>Archon</Text>
				<Text style={styles.value}>{archon}</Text>
			</View>

			<View style={styles.section}>
				<Text style={styles.label}>Controlling Entity</Text>
				<Text style={styles.value}>{controllingEntity}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#F5F5F5", // slightly dark white
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#E0E0E0", // neutral border
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},

	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "700",
		color: "#333333",
		marginBottom: 12,
	},

	imageContainer: {
		alignItems: "center",
		marginBottom: 16,
	},

	section: {
		alignItems: "center",
		marginBottom: 12,
	},

	label: {
		fontSize: 14,
		fontWeight: "600",
		color: "#666666",
		marginBottom: 4,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	value: {
		fontSize: 14,
		color: "#333333",
		lineHeight: 20,
	},
});
