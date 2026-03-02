import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { NormalizedCommonAscensionMaterialGroup } from "@/src/types/common.ascension.material";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	// finalData: TalentBoss[] | { label: string; data: TalentBoss[] }[];
	finalData: NormalizedCommonAscensionMaterialGroup[];
	refreshing: boolean;
	onRefresh: any;
}) {
	const materials = endpoints.materials;
	const commonAscension = endpoints.commonAscension;

	useEffect(() => {
		const urls = finalData.flatMap((group) =>
			group.items.map(
				(item) => `${BASE_URL}${materials}${commonAscension}/${item.id}`
			)
		);
		Promise.all(urls.map((url) => Image.prefetch(url)));
	}, [commonAscension, finalData, materials]);

	const flatItems = finalData.flatMap((group) => group.items);

	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={flatItems}
				keyExtractor={(item) => item.id}
				numColumns={3}
				initialNumToRender={12}
				columnWrapperStyle={{
					justifyContent: "space-between",
					marginBottom: 10,
				}}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => <MaterialsImage id={item.id} />}
			/>
		</View>
	);
}
