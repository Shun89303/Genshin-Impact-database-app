import MaterialDetails from "@/src/components/resources/materials/weapon/ascension/materialDetails";
import styles from "@/src/components/styles.modules";
import { useWeaponAscensionMaterialsStore } from "@/src/store/useWeaponAscensionStore";

import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeaponAscensionMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();
	const storeMaterialDetails = useWeaponAscensionMaterialsStore(
		(state) => state.storeMaterialDetails
	);
	const error = useWeaponAscensionMaterialsStore((state) => state.error);
	const cache = useWeaponAscensionMaterialsStore((state) => state.cache);
	const loadingId = useWeaponAscensionMaterialsStore(
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
			<SafeAreaView>
				<Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
					Loading Item: {id}
				</Text>
				<ActivityIndicator />
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView style={styles.simpleContainer}>
				<Text>{error}</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView>
			<Text style={{ textAlign: "center" }}>
				Weapon Ascension Material Details
			</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<MaterialDetails field={field} value={value} />
				)}
			/>
		</SafeAreaView>
	);
}
