import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { cookingIngredients } from "@/src/types/cooking.material";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function SearchList({
	finalData,
}: {
	// finalData: TalentBoss[] | { label: string; data: TalentBoss[] }[];
	finalData: cookingIngredients[];
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
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData}
				keyExtractor={(item) => item.id}
				initialNumToRender={6}
				numColumns={3}
				contentContainerStyle={{
					gap: 10,
				}}
				windowSize={21}
				removeClippedSubviews
				renderItem={({ item }) => <MaterialsImage id={item.id} />}
			/>
		</View>
	);
}
