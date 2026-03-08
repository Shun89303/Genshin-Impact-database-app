import ScreenLoader from "@/src/components/common/ScreenLoader";
import CharacterDetails from "@/src/components/screens/characters/details/characterDetails";
import { useCharacters } from "@/src/hooks/useCharacters";
import { useLocalSearchParams } from "expo-router";

export default function CharacterDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();

	const { detailsById, isLoading, isRefreshing, refetch } = useCharacters();
	const character = detailsById[id];

	if (isLoading || !character) {
		return <ScreenLoader />;
	}

	return (
		<CharacterDetails
			character={character}
			refreshing={isRefreshing}
			onRefresh={refetch}
		/>
	);
}
