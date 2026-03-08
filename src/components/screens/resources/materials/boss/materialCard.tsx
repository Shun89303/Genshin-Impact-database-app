import { Normalized } from "@/src/types/boss.material";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CharacterImage from "./characterImage";
import MaterialsImage from "./materialsImage";

export default function MaterialCard({
	id,
	name,
	source,
	characters,
}: Normalized) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{name}</Text>

			<View style={styles.imageContainer}>
				<MaterialsImage id={id} />
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionLabel}>Source</Text>
				<Text style={styles.sourceText}>{source}</Text>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionLabel}>Used By</Text>
				<FlatList
					data={characters}
					keyExtractor={(item) => item}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.characterList}
					renderItem={({ item }) => (
						<View style={styles.characterItem}>
							<CharacterImage item={item} />
						</View>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#FFFFFF",
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#E0E0E0",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},

	title: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "700",
		color: "#111111",
		marginBottom: 12,
	},

	imageContainer: {
		alignItems: "center",
		marginBottom: 16,
		borderRadius: 12,
		overflow: "hidden",
	},

	section: {
		marginBottom: 12,
	},

	sectionLabel: {
		fontSize: 13,
		fontWeight: "600",
		color: "#555555",
		marginBottom: 4,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	sourceText: {
		fontSize: 14,
		color: "#333333",
		lineHeight: 20,
	},

	characterList: {
		paddingVertical: 4,
	},

	characterItem: {
		marginRight: 12,
		borderRadius: 8,
		overflow: "hidden",
	},
});
