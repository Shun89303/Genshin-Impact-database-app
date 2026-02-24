import MaterialDetails from "@/src/components/materials/weapon/experience/materialDetails";
import styles from "@/src/components/styles.modules";
import { useWeaponExperienceMaterialsStore } from "@/src/store/useWeaponExperienceStore";

import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function WeaponExperienceMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();
	const storeMaterialDetails = useWeaponExperienceMaterialsStore(
		(state) => state.storeMaterialDetails
	);
	const error = useWeaponExperienceMaterialsStore((state) => state.error);
	const cache = useWeaponExperienceMaterialsStore((state) => state.cache);
	const loadingId = useWeaponExperienceMaterialsStore(
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
				Weapon Experience Material Details
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
