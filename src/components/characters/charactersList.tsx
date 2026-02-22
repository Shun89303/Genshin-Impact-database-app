import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCharactersStore } from "@/src/store/useCharactersStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../styles.modules";
import CharacterImage from "./characterImage";

export default function CharactersList() {
	const fetchCharactersIds = useCharactersStore(
		(state) => state.fetchCharactersIds
	);
	const ids = useCharactersStore((state) => state.ids);
	const { error } = useCharactersStore();
	const characters = endpoints.characters;
	const card = endpoints.card;

	useEffect(() => {
		if (!ids || ids.length === 0) {
			fetchCharactersIds();
			return;
		}

		const remainingIds = ids.slice(10);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${characters}/${id}${card}`);
		});
	}, [fetchCharactersIds, ids, characters, card]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!ids?.length)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<>
			<FlatList
				data={ids}
				keyExtractor={(id) => id}
				numColumns={3}
				initialNumToRender={9}
				windowSize={20}
				removeClippedSubviews
				renderItem={({ item }) => <CharacterImage id={item} />}
			/>
		</>
	);
}
