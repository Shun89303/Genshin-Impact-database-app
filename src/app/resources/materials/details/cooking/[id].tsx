import MaterialDetails from "@/src/components/resources/materials/cooking/materialDetails";
import styles from "@/src/components/styles.modules";
import { useCookingMaterialsStore } from "@/src/store/useCookingMaterialsStore";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function CookingMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();
	const storeMaterialDetails = useCookingMaterialsStore(
		(state) => state.storeMaterialDetails
	);
	const error = useCookingMaterialsStore((state) => state.error);
	const cache = useCookingMaterialsStore((state) => state.cache);
	const loadingId = useCookingMaterialsStore((state) => state.loadingId);

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
			<Text style={{ textAlign: "center" }}>Cooking Material Details</Text>
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
