import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { ApiObject } from "@/src/types/talent.boss";
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
	finalData: ApiObject[];
	refreshing: boolean;
	onRefresh: any;
}) {
	const characters = endpoints.characters;
	const gachaCard = endpoints.gachaCard;

	useEffect(() => {
		finalData.forEach((boss) => {
			boss.characters?.forEach((charId) => {
				Image.prefetch(`${BASE_URL}${characters}/${charId}${gachaCard}`);
			});
		});
	}, [finalData, characters, gachaCard]);

	return (
		<View>
			<FlatList
				data={finalData}
				keyExtractor={(item) => item.id}
				initialNumToRender={9}
				windowSize={21}
				removeClippedSubviews
				contentContainerStyle={{
					gap: 10,
				}}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<MaterialCard
						materialName={item.name}
						materialId={item.id}
						charactersArray={item.characters ?? []}
					/>
				)}
			/>
		</View>
	);
}
