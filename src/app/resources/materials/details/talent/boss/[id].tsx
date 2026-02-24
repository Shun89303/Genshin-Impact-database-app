import MaterialDetails from "@/src/components/resources/materials/talent/boss/materialDetails";
import styles from "@/src/components/styles.modules";
import { useTalentBossMaterialsStore } from "@/src/store/useTalentBossStore";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function TalentBossMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();
	const storeMaterialDetails = useTalentBossMaterialsStore(
		(state) => state.storeMaterialDetails
	);
	const error = useTalentBossMaterialsStore((state) => state.error);
	const cache = useTalentBossMaterialsStore((state) => state.cache);
	const loadingId = useTalentBossMaterialsStore((state) => state.loadingId);

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
			<Text style={{ textAlign: "center" }}>Talent-Boss Material Details</Text>
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
