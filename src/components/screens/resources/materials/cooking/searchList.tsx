import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Normalized } from "@/src/types/cooking.material";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import MaterialCard from "./materialCard";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	// finalData: TalentBoss[] | { label: string; data: TalentBoss[] }[];
	finalData: Normalized[];
	refreshing: boolean;
	onRefresh: any;
}) {
	const materials = endpoints.materials;
	const cookingIngredients = endpoints.cookingIngredients;

	useEffect(() => {
		finalData.forEach((cooking) => {
			Image.prefetch(
				`${BASE_URL}${materials}${cookingIngredients}/${cooking.id}`
			);
		});
	}, [cookingIngredients, finalData, materials]);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={finalData}
				keyExtractor={(item) => item.id}
				initialNumToRender={15}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<MaterialCard
						id={item.id}
						name={item.name}
						description={item.description ?? "unavailable"}
						rarity={item.rarity ?? 0}
						sources={item.sources ?? []}
					/>
				)}
			/>
		</View>
	);
}
