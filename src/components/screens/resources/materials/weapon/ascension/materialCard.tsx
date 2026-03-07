import { ApiItem } from "@/src/types/weapon.ascension.material";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MaterialsImage from "./materialsImage";

type Props = {
	materialName: string;
	items: ApiItem[];
	availability: string[];
	source: string;
};

export default function MaterialCard({
	materialName,
	items,
	availability,
	source,
}: Props) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{materialName}</Text>

			{items.length > 0 && (
				<FlatList
					data={items}
					keyExtractor={(item) => item.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.itemsRow}
					renderItem={({ item }) => (
						<View style={styles.item}>
							<MaterialsImage id={item.id} />
							<Text style={styles.rarity}>{"★".repeat(item.rarity)}</Text>
						</View>
					)}
				/>
			)}

			{availability.length > 0 && (
				<Text style={styles.info}>Availability: {availability.join(", ")}</Text>
			)}
			<Text style={styles.info}>Source: {source}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: "95%",
		backgroundColor: "#fff",
		padding: 16,
		marginBottom: 16,
		borderRadius: 12,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3, // for Android shadow
	},

	title: {
		fontSize: 17,
		fontWeight: "700",
		marginBottom: 12,
		color: "#1e293b",
		textAlign: "center",
		textTransform: "capitalize",
	},

	itemsRow: {
		gap: 12,
		paddingVertical: 8,
	},

	item: {
		alignItems: "center",
		marginRight: 12,
	},

	rarity: {
		fontSize: 12,
		color: "#f59e0b", // amber color for stars
		marginTop: 4,
	},

	info: {
		fontSize: 13,
		color: "#475569",
		marginTop: 4,
		textAlign: "center",
	},
});
