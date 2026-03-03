import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { ApiItem } from "@/src/types/weapon.ascension.material";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type Props = {
	materialName: string;
	items: ApiItem[];
	charactersArray: string[];
	availability: string[];
	source: string;
};

export default function MaterialCard({
	materialName,
	items,
	charactersArray,
	availability,
	source,
}: Props) {
	const { materials, talentBook, characters: chaEndpoint, icon } = endpoints;

	const [imageError, setImageError] = useState(false);

	return (
		<View style={{ marginBottom: 80, alignItems: "center" }}>
			<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
				{materialName}
			</Text>
			{items.length > 0 && (
				<FlatList
					data={items}
					keyExtractor={(item) => item.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<View
							style={{
								alignItems: "center",
								marginRight: 8,
							}}
						>
							{!imageError ? (
								<Image
									style={{ width: 70, height: 70, margin: 4 }}
									contentFit="contain"
									cachePolicy="memory-disk"
									onError={() => setImageError(true)}
									source={{
										uri: `${BASE_URL}${materials}${talentBook}/${item.id}`,
									}}
								/>
							) : (
								<View style={[styles.materialImage, styles.imageFallback]}>
									<Text style={{ color: "#555" }}>Image Not Available</Text>
								</View>
							)}
							<Text style={{ fontSize: 12, marginLeft: 10 }}>
								{"★".repeat(item.rarity)}
							</Text>
						</View>
					)}
				/>
			)}

			{charactersArray.length > 0 && (
				<>
					<Text style={{ marginTop: 12, marginBottom: 6, fontWeight: "500" }}>
						Characters
					</Text>
					<FlatList
						data={charactersArray}
						keyExtractor={(chaId) => chaId}
						horizontal
						showsHorizontalScrollIndicator={false}
						renderItem={({ item: chaId }) => (
							<Image
								style={{ width: 50, height: 50, marginRight: 8 }}
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
			{availability.length > 0 && (
				<Text style={{ marginTop: 8 }}>
					Availability: {availability.join(", ")}
				</Text>
			)}
			<Text style={{ marginTop: 4 }}>Source: {source}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	materialImage: {
		width: 120,
		height: 120,
		marginBottom: 12,
	},
	imageFallback: { backgroundColor: "#eee", borderRadius: 8 },
});
