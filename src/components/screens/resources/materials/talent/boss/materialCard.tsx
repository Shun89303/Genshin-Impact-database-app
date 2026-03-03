import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

type Props = {
	materialName: string;
	materialId: string;
	charactersArray: string[];
};

export default function MaterialCard({
	materialName,
	materialId,
	charactersArray,
}: Props) {
	const { materials, talentBoss, icon, characters } = endpoints;

	const [imageError, setImageError] = useState(false);

	function toImageId(detailId: string) {
		return detailId.replace(/'/g, "-");
	}

	return (
		<View style={styles.card}>
			{/* Material Name */}
			<Text style={styles.materialName}>{materialName}</Text>

			{/* Material Image */}
			{!imageError ? (
				<Image
					source={{
						uri: `${BASE_URL}${materials}${talentBoss}/${toImageId(
							materialId
						)}`,
					}}
					style={styles.materialImage}
					cachePolicy="memory-disk"
					onError={() => setImageError(true)}
				/>
			) : (
				<View style={[styles.materialImage, styles.imageFallback]}>
					<Text style={{ color: "#555" }}>Image Not Available</Text>
				</View>
			)}

			{/* Characters Section */}
			{charactersArray.length > 0 && (
				<View style={styles.charactersSection}>
					<Text style={styles.sectionTitle}>Characters</Text>
					<FlatList
						data={charactersArray}
						keyExtractor={(chaId) => chaId}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.charactersList}
						renderItem={({ item: id }) => (
							<Image
								source={{
									uri: `${BASE_URL}${characters}/${id}${icon}`,
								}}
								style={styles.characterImage}
								contentFit="contain"
								cachePolicy="memory-disk"
							/>
						)}
					/>
				</View>
			)}
		</View>
	);
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	card: {
		marginBottom: 40,
		padding: 16,
		backgroundColor: "#fff",
		borderRadius: 12,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 3 },
		alignItems: "center",
		width: width * 0.9, // make card responsive
		alignSelf: "center",
	},
	materialName: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 12,
		textAlign: "center",
	},
	materialImage: {
		width: 120,
		height: 120,
		marginBottom: 12,
	},
	charactersSection: {
		width: "100%",
		marginTop: 12,
	},
	sectionTitle: {
		fontWeight: "600",
		fontSize: 16,
		marginBottom: 8,
		marginLeft: 8,
	},
	charactersList: {
		paddingLeft: 8,
		paddingRight: 8,
	},
	characterImage: {
		width: 60,
		height: 80,
		marginRight: 8,
		borderRadius: 6,
	},
	imageFallback: { backgroundColor: "#eee", borderRadius: 8 },
});
