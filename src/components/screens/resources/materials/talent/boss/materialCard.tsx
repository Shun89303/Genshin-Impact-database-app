import { ApiObject } from "@/src/types/talent.boss";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import CharacterImage from "./characterImage";
import MaterialsImage from "./materialsImage";

export default function MaterialCard({ material }: { material: ApiObject }) {
	function toImageId(detailId: string) {
		return detailId.replace(/'/g, "-");
	}

	return (
		<View style={styles.card}>
			{/* Material Name */}
			<Text style={styles.materialName}>{material.name}</Text>

			{/* Material Image */}
			<View style={styles.materialImageWrapper}>
				<MaterialsImage id={toImageId(material.id)} />
			</View>

			{/* Characters Section */}
			{material.characters && material.characters.length > 0 && (
				<View style={styles.charactersSection}>
					<Text style={styles.sectionTitle}>Characters</Text>
					<FlatList
						data={material.characters}
						keyExtractor={(chaId) => chaId}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.charactersList}
						renderItem={({ item: id }) => <CharacterImage id={id} />}
					/>
				</View>
			)}
		</View>
	);
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	card: {
		marginBottom: 28,
		paddingVertical: 18,
		paddingHorizontal: 16,
		backgroundColor: "#1E293B", // dark-friendly background
		borderRadius: 16,
		width: width * 0.92,
		alignSelf: "center",
		alignItems: "center",

		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 6 },
		elevation: 5,
	},

	materialName: {
		fontSize: 20,
		fontWeight: "700",
		color: "#F1F5F9",
		textAlign: "center",
		marginBottom: 14,
		letterSpacing: 0.3,
	},

	materialImageWrapper: {
		padding: 8,
		borderRadius: 12,
		backgroundColor: "#334155",
		marginBottom: 14,
	},

	charactersSection: {
		width: "100%",
		marginTop: 6,
	},

	sectionTitle: {
		fontWeight: "600",
		fontSize: 15,
		marginBottom: 10,
		paddingLeft: 4,
		color: "#CBD5F5",
	},

	charactersList: {
		paddingLeft: 2,
		paddingRight: 4,
	},

	characterImage: {
		width: 56,
		height: 76,
		marginRight: 10,
		borderRadius: 8,
	},
});
