import { EnhancementItem } from "@/src/types/weapon.experience.material";
import { StyleSheet, Text, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function MaterialCard({
	material,
}: {
	material: EnhancementItem;
}) {
	return (
		<View style={styles.card}>
			<View style={styles.imageWrapper}>
				<MaterialsImage id={material.id} />
			</View>

			<View style={styles.info}>
				<Text style={styles.name}>{material.name}</Text>

				<View style={styles.row}>
					<Text style={styles.label}>Rarity</Text>
					<Text style={styles.value}>{material.rarity}★</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Experience</Text>
					<Text style={styles.value}>{material.experience}</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Source</Text>
					<Text style={styles.value}>{material.source[0]}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		backgroundColor: "#1E293B",
		borderRadius: 14,
		padding: 14,
		gap: 14,
		alignItems: "center",
	},

	imageWrapper: {
		width: 64,
		height: 64,
		justifyContent: "center",
		alignItems: "center",
	},

	info: {
		flex: 1,
		gap: 4,
	},

	name: {
		fontSize: 16,
		fontWeight: "600",
		color: "#F8FAFC",
		marginBottom: 4,
	},

	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	label: {
		color: "#94A3B8",
		fontSize: 13,
	},

	value: {
		color: "#E2E8F0",
		fontSize: 13,
		fontWeight: "500",
	},
});
