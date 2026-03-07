import { NormalizedPotion } from "@/src/types/potion";
import { StyleSheet, Text, View } from "react-native";
import PotionImage from "./potionImage";

export default function PotionCard({ potion }: { potion: NormalizedPotion }) {
	return (
		<View style={styles.card}>
			<PotionImage id={potion.id} />

			<View style={styles.info}>
				<Text style={styles.label}>Rarity</Text>
				<Text style={styles.value}>{potion.rarity}★</Text>

				<Text style={styles.label}>Name</Text>
				<Text style={styles.value}>{potion.name}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 160,
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 12,
		margin: 8,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3, // Android shadow
		alignItems: "center",
	},
	info: {
		width: "100%",
	},
	label: {
		fontSize: 12,
		color: "#888",
		marginBottom: 2,
	},
	value: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 6,
		color: "#111",
	},
});
