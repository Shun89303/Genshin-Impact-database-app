import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { TalentBoss } from "@/src/types/talent.boss";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import MaterialContainer from "./materialContainer";

export default function SearchList({
	finalData,
}: {
	// finalData: TalentBoss[] | { label: string; data: TalentBoss[] }[];
	finalData: TalentBoss[];
}) {
	const characters = endpoints.characters;
	const gachaCard = endpoints.gachaCard;

	useEffect(() => {
		finalData.forEach((boss) => {
			boss.characters.forEach((charId) => {
				Image.prefetch(`${BASE_URL}${characters}/${charId}${gachaCard}`);
			});
		});
	}, [finalData, characters, gachaCard]);

	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData}
				keyExtractor={(item) => item.id}
				numColumns={3}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				contentContainerStyle={{
					gap: 10,
				}}
				renderItem={({ item }) => (
					<MaterialContainer id={item.id} characters={item.characters} />
				)}
			/>
		</View>
	);
}
