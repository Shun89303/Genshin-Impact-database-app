import MaterialDetails from "@/src/components/materials/talent/book/materialDetails";
import styles from "@/src/components/styles.modules";
import { useTalentBookMaterialsStore } from "@/src/store/useTalentBookStore";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function TalentBookMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();
	const storeMaterialDetails = useTalentBookMaterialsStore(
		(state) => state.storeMaterialDetails
	);
	const error = useTalentBookMaterialsStore((state) => state.error);
	const cache = useTalentBookMaterialsStore((state) => state.cache);
	const loadingId = useTalentBookMaterialsStore((state) => state.loadingId);

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
			<Text style={{ textAlign: "center" }}>Talent-Book Material Details</Text>
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
