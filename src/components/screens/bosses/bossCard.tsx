import { Boss } from "@/src/types/boss";
import { StyleSheet, Text, View } from "react-native";
import BossImage from "./bossImage";

export default function BossCard({ boss }: { boss: Boss }) {
	return (
		<View style={styles.card}>
			<View style={styles.imageWrapper}>
				<BossImage id={boss.id} />
			</View>

			<View style={styles.content}>
				<Text style={styles.label}>Name</Text>
				<Text style={styles.name}>{boss.name}</Text>

				<Text style={styles.label}>Description</Text>
				<Text style={styles.description}>{boss.description}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#0F172A",
		borderRadius: 14,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#334155",
	},

	imageWrapper: {
		alignItems: "center",
		marginBottom: 12,
	},

	content: {
		gap: 4,
	},

	label: {
		fontSize: 12,
		color: "#94A3B8",
		textTransform: "uppercase",
		marginTop: 6,
	},

	name: {
		fontSize: 18,
		fontWeight: "600",
		color: "#F8FAFC",
		marginBottom: 6,
	},

	description: {
		fontSize: 14,
		lineHeight: 20,
		color: "#CBD5F5",
	},
});
