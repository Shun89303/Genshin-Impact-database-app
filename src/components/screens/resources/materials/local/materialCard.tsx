import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { ApiObject } from "@/src/types/local.material";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type Props = {
	nationName: string;
	items: ApiObject[];
};

export default function MaterialCard({ nationName, items }: Props) {
	const {
		materials,
		localSpecialties,
		characters: chaEndpoint,
		icon,
	} = endpoints;

	const [imageError, setImageError] = useState(false);

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
							{!imageError ? (
								<Image
									contentFit="contain"
									source={{
										uri: `${BASE_URL}${materials}${localSpecialties}/${item.id}`,
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
							{item.characters.length > 0 && (
								<>
									<Text style={styles.charactersTitle}>Characters</Text>
									<FlatList
										data={item.characters}
										keyExtractor={(chaId) => chaId}
										horizontal
										showsHorizontalScrollIndicator={false}
										renderItem={({ item: chaId }) => (
											<Image
												style={styles.characterImage}
												contentFit="contain"
												cachePolicy="memory-disk"
												source={{
													uri: `${BASE_URL}${chaEndpoint}/${chaId}${icon}`,
												}}
											/>
										)}
									/>
								</>
							)}
						</View>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 40,
		paddingHorizontal: 16,
	},
	nationTitle: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 12,
		color: "#222",
	},
	materialCard: {
		alignItems: "center",
		marginRight: 12,
		marginBottom: 16,
		backgroundColor: "#fafafa",
		borderRadius: 12,
		padding: 8,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
	},
	materialName: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 6,
		color: "#333",
	},
	materialImage: {
		width: 100,
		height: 100,
		borderRadius: 8,
		marginBottom: 8,
	},
	imageFallback: {
		backgroundColor: "#eee",
		justifyContent: "center",
		alignItems: "center",
	},
	charactersTitle: {
		fontSize: 14,
		fontWeight: "500",
		marginTop: 8,
		marginBottom: 6,
		color: "#555",
	},
	characterImage: {
		width: 50,
		height: 50,
		marginRight: 8,
		borderRadius: 8,
		backgroundColor: "#f5f5f5",
	},
});
