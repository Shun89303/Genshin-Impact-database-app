import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Normalized } from "@/src/types/boss.material";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MaterialCard from "./materialCard";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Normalized[];
	refreshing: boolean;
	onRefresh: () => void;
}) {
	const materials = endpoints.materials;
	const bossMaterials = endpoints.bossMaterials;

	useEffect(() => {
		const urls = finalData.map(
			(item) => `${BASE_URL}${materials}${bossMaterials}/${item.id}`
		);
		Promise.all(urls.map((url) => Image.prefetch(url)));
	}, [bossMaterials, finalData, materials]);

	return (
		<View style={styles.container}>
			<FlatList
				data={finalData}
				keyExtractor={(item) => item.id}
				initialNumToRender={15}
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<MaterialCard
						id={item.id}
						name={item.name}
						source={item.source}
						characters={item.characters}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		backgroundColor: "#f8f8f8", // soft background
	},
	listContent: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		gap: 12, // spacing between items
	},
});
