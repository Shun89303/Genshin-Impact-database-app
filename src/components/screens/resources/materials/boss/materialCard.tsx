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
		fontSize: 18,
		fontWeight: "600",
		color: "#FFFFFF",
		marginBottom: 12,
	},

	imageContainer: {
		alignItems: "center",
		marginBottom: 16,
	},

	section: {
		marginBottom: 14,
	},

	sectionLabel: {
		fontSize: 14,
		fontWeight: "600",
		color: "#AAAAAA",
		marginBottom: 6,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	sourceText: {
		fontSize: 14,
		color: "#E0E0E0",
		lineHeight: 20,
	},

	characterList: {
		paddingVertical: 4,
	},

	characterItem: {
		marginRight: 10,
	},
});
