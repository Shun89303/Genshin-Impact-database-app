import { Normalized } from "@/src/types/character.ascension.material";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Normalized[] | { label: string; data: Normalized[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as { label: string; data: Normalized[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={20}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<View style={styles.categorySection}>
						<Text style={styles.categoryTitle}>{item.label}</Text>
						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(mat) => mat.id}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.horizontalList}
							renderItem={({ item: mat }) => (
								<View style={styles.item}>
									<MaterialsImage id={mat.id} />
									<Text style={styles.itemName} numberOfLines={3}>
										{mat.name}
									</Text>
								</View>
							)}
						/>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 10,
		backgroundColor: "#fafafa",
	},

	categorySection: {
		paddingVertical: 20,
		paddingHorizontal: 16,
		gap: 12,
	},

	categoryTitle: {
		fontWeight: "700",
		fontSize: 20,
		color: "#333",
		marginBottom: 8,
		textTransform: "capitalize",
	},

	horizontalList: {
		gap: 12,
		paddingLeft: 4,
	},

	item: {
		alignItems: "center",
		width: 80,
		marginRight: 8,
	},

	itemName: {
		fontSize: 12,
		color: "#555",
		textAlign: "center",
		marginTop: 4,
	},
});
