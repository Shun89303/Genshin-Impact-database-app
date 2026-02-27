import CharactersList from "@/src/components/characters/charactersList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CharactersScreen() {
	return (
		<SafeAreaView>
			<CharactersList />
		</SafeAreaView>
	);
}
