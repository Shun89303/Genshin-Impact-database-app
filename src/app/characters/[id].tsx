import CharacterDetails from "@/src/components/screens/characters/characterDetails";
import { useCharacters } from "@/src/hooks/useCharacters";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function CharacterDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();

	const { detailsById, isLoading } = useCharacters();
	const character = detailsById[id];

	if (isLoading || !character) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Loading character...</Text>
			</View>
		);
	}

	return <CharacterDetails character={character} />;
}
