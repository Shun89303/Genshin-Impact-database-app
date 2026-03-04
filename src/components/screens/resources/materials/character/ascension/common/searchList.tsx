import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Normalized } from "@/src/types/common.ascension.material";
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
	const commonAscension = endpoints.commonAscension;

	useEffect(() => {
		const urls = finalData.flatMap((group) =>
			group.items.map(
				(item) => `${BASE_URL}${materials}${commonAscension}/${item.id}`
			)
		);
		Promise.all(urls.map((url) => Image.prefetch(url)));
	}, [commonAscension, finalData, materials]);

	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData}
				keyExtractor={(item) => item.material}
				initialNumToRender={5}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<MaterialCard
						material={item.material}
						characters={item.characters ?? []}
						weapons={item.weapons ?? []}
						items={item.items}
						sources={item.sources}
					/>
				)}
			/>
		</View>
	);
}
