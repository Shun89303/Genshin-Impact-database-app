import { Normalized } from "@/src/types/talent.book";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MaterialsImage from "./materialsImage";

type Props = {
	material: Normalized;
};

export default function MaterialCard({ material }: Props) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{material.id}</Text>

			{/* Material Items */}
			{material.items && material.items.length > 0 && (
				<FlatList
					data={material.items}
					keyExtractor={(item) => item.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<View style={styles.itemContainer}>
							<MaterialsImage id={item.id} />
							<Text style={styles.rarityText}>{"★".repeat(item.rarity)}</Text>
						</View>
					)}
				/>
			)}

			{/* Availability */}
			{material.availability.length > 0 && (
				<Text style={styles.infoText}>
					Availability: {material.availability.join(", ")}
				</Text>
			)}

			{/* Source */}
			<Text style={styles.infoText}>Source: {material.source}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		marginVertical: 16,
		marginHorizontal: 12,
		padding: 16,
		backgroundColor: "#F8FAFC", // neutral light background
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#E2E8F0", // subtle border
		alignItems: "center",
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1E293B",
		marginBottom: 12,
		textTransform: "capitalize",
	},
	itemContainer: {
		alignItems: "center",
	},
	rarityText: {
		fontSize: 12,
		marginTop: 4,
		color: "#475569",
	},
	infoText: {
		marginTop: 8,
		fontSize: 14,
		color: "#475569",
	},
});
