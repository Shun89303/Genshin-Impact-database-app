import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { NormalizedBossMaterialGroup } from "@/src/types/boss.material";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function SearchList({
	finalData,
}: {
	// finalData: TalentBoss[] | { label: string; data: TalentBoss[] }[];
	finalData: NormalizedBossMaterialGroup[];
}) {
	const materials = endpoints.materials;
	const bossMaterials = endpoints.bossMaterials;

	useEffect(() => {
		const urls = finalData.flatMap(
			(item) => `${BASE_URL}${materials}${bossMaterials}/${item.id}`
		);
		Promise.all(urls.map((url) => Image.prefetch(url)));
	}, [bossMaterials, finalData, materials]);

	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData}
				keyExtractor={(item) => item.id}
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: "space-between",
					marginBottom: 10,
				}}
				renderItem={({ item }) => <MaterialsImage id={item.id} />}
			/>
		</View>
	);
}
