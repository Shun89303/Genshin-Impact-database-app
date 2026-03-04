import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Normalized } from "@/src/types/boss.material";
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
				initialNumToRender={15}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<MaterialCard
						id={item.id}
						name={item.name}
						source={item.source}
						characters={item.characters ?? []}
					/>
				)}
			/>
		</View>
	);
}
