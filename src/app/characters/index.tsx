import CharactersList from "@/src/components/screens/characters/charactersList";
import { View } from "react-native";

export default function CharactersScreen() {
	return (
		<View style={{ flex: 1 }}>
			<CharactersList />
		</View>
	);
}
