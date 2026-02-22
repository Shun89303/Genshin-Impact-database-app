import CharacterDetails from "@/src/components/characters/characterDetails";
import styles from "@/src/components/styles.modules";
import { useCharactersStore } from "@/src/store/useCharactersStore";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function CharactersDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();
	const fetchCharacterDetails = useCharactersStore(
		(state) => state.fetchCharacterDetails
	);
	const error = useCharactersStore((state) => state.error);
	const cache = useCharactersStore((state) => state.cache);
	const loadingId = useCharactersStore((state) => state.loadingId);

	useFocusEffect(
		useCallback(() => {
			fetchCharacterDetails(id);
		}, [fetchCharacterDetails, id])
	);

	const loading = loadingId === id;
	const details = cache[id];

	if (loading || !details)
		return (
			<>
				<Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
					Loading Item: {id}
				</Text>
				<ActivityIndicator />
			</>
		);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	return (
		<View>
			<Text style={{ textAlign: "center" }}>Character Details</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<CharacterDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
