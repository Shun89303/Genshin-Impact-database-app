import MaterialDetails from "@/src/components/materials/character/ascension/character/materialDetails";
import styles from "@/src/components/styles.modules";
import { useCharacterAscensionMaterialsStore } from "@/src/store/useCharacterAscensionStore";

import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function CharacterAscensionMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();
	const storeMaterialDetails = useCharacterAscensionMaterialsStore(
		(state) => state.storeMaterialDetails
	);
	const error = useCharacterAscensionMaterialsStore((state) => state.error);
	const cache = useCharacterAscensionMaterialsStore((state) => state.cache);
	const loadingId = useCharacterAscensionMaterialsStore(
		(state) => state.loadingId
	);

	useFocusEffect(
		useCallback(() => {
			storeMaterialDetails(id);
		}, [storeMaterialDetails, id])
	);

	const loading = loadingId === id;
	const details = cache[id];

	if (loading || !details) {
		return (
			<>
				<Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
					Loading Item: {id}
				</Text>
				<ActivityIndicator />
			</>
		);
	}

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<View>
			<Text style={{ textAlign: "center" }}>
				Character Ascension Material Details
			</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<MaterialDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
