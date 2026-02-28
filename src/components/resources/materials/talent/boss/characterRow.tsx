import { FlatList, View } from "react-native";
import CharacterImage from "./characterImage";

export default function CharacterRow({ characters }: { characters: string[] }) {
	return (
		<View>
			<FlatList
				data={characters}
				keyExtractor={(cha) => cha}
				horizontal
				removeClippedSubviews
				renderItem={({ item }) => <CharacterImage id={item} />}
			/>
		</View>
	);
}
