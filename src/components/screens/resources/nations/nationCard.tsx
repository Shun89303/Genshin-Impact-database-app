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
		backgroundColor: "#1E1E1E",
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 6,
	},

	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "700",
		color: "#FFFFFF",
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
		color: "#AAAAAA",
		marginBottom: 4,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	value: {
		fontSize: 14,
		color: "#E0E0E0",
		lineHeight: 20,
	},
});
