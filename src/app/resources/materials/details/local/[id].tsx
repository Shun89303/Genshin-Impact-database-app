import MaterialDetails from "@/src/components/resources/materials/local/materialDetails";
import styles from "@/src/components/styles.modules";
import { useLocalMaterialsStore } from "@/src/store/useLocalMaterialsStore";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocalMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();
	const storeMaterialDetails = useLocalMaterialsStore(
		(state) => state.storeMaterialDetails
	);
	const error = useLocalMaterialsStore((state) => state.error);
	const cache = useLocalMaterialsStore((state) => state.cache);
	const loadingId = useLocalMaterialsStore((state) => state.loadingId);

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
			<Text style={{ textAlign: "center" }}>Local Material Details</Text>
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
