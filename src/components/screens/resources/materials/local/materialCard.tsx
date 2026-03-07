import { ApiObject } from "@/src/types/local.material";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CharacterImage from "./characterImage";
import MaterialsImage from "./materialsImage";

type Props = {
	nationName: string;
	items: ApiObject[];
};

export default function MaterialCard({ nationName, items }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.nationTitle}>{nationName}</Text>
			{items.length > 0 && (
				<FlatList
					data={items}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.materialCard}>
							<Text style={styles.materialName}>{item.name}</Text>
							<MaterialsImage id={item.id} />
							{item.characters.length > 0 && (
								<View style={styles.charactersWrapper}>
									<Text style={styles.charactersTitle}>Characters</Text>
									<FlatList
										data={item.characters}
										keyExtractor={(chaId) => chaId}
										horizontal
										showsHorizontalScrollIndicator={false}
										contentContainerStyle={styles.characterList}
										renderItem={({ item: chaId }) => (
											<CharacterImage id={chaId} />
										)}
									/>
								</View>
							)}
						</View>
					)}
					horizontal={false}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 40,
		paddingHorizontal: 16,
	},
	nationTitle: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 16,
		color: "#222",
	},
	materialCard: {
		flex: 1,
		alignItems: "center",
		marginBottom: 46,
		padding: 12,
		borderRadius: 12,
		backgroundColor: "#FFFFFF", // clean neutral background
		borderWidth: 1,
		borderColor: "#E0E0E0", // subtle border
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
	},
	materialName: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		color: "#333",
		textAlign: "center",
	},
	charactersWrapper: {
		width: "100%",
		marginTop: 8,
	},
	charactersTitle: {
		fontSize: 14,
		fontWeight: "500",
		marginBottom: 6,
		color: "#555",
		textAlign: "left",
		paddingLeft: 4,
	},
	characterList: {
		paddingLeft: 4,
	},
});
