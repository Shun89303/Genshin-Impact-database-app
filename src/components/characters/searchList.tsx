import { FlatList, View } from "react-native";
import { Character } from "../../../src/types/character";
import CharacterImage from "./characterImage";

export default function SearchList({
	finalData,
}: {
	finalData: Character[] | { label: string; data: Character[] }[];
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as Character[]}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
						<CharacterImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
