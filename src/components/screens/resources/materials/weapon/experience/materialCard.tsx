import { endpoints } from "@/src/api/endpoints";
import FallbackImage from "@/src/components/common/FallbackImage";
import { BASE_URL } from "@/src/config/env";
import { EnhancementItem } from "@/src/types/weapon.experience.material";
import { StyleSheet, Text, View } from "react-native";

export default function MaterialCard({
	material,
}: {
	material: EnhancementItem;
}) {
	const { materials, weaponExperience } = endpoints;

	return (
		<View style={styles.card}>
			<View style={styles.imageWrapper}>
				<FallbackImage
					uri={`${BASE_URL}${materials}${weaponExperience}/${material.id}`}
					style={{ width: 80, height: 80, borderRadius: 16 }}
				/>
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
		backgroundColor: "#F8FAFC",
		borderRadius: 14,
		padding: 14,
		gap: 14,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#334155",
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
		color: "#1E293B",
		marginBottom: 4,
	},

	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	label: {
		color: "#64748B",
		fontSize: 13,
	},

	value: {
		color: "#475569",
		fontSize: 13,
		fontWeight: "500",
	},
});
