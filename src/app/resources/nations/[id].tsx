import NationDetails from "@/src/components/resources/nations/nationDetails";
import styles from "@/src/components/styles.modules";
import { useNationsStore } from "@/src/store/useNationsStore";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function NationsDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();
	const fetchNationDetails = useNationsStore(
		(state) => state.fetchNationDetails
	);
	const error = useNationsStore((state) => state.error);
	const cache = useNationsStore((state) => state.cache);
	const loadingId = useNationsStore((state) => state.loadingId);

	useFocusEffect(
		useCallback(() => {
			fetchNationDetails(id);
		}, [fetchNationDetails, id])
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
			<Text style={{ textAlign: "center" }}>Nation Details</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<NationDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
