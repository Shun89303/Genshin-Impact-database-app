import BossDetails from "@/src/components/bosses/bossDetails";
import styles from "@/src/components/styles.modules";
import { useBossesStore } from "@/src/store/useBossesStore";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function BossDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();
	const fetchBossDetails = useBossesStore((state) => state.fetchBossDetails);
	const error = useBossesStore((state) => state.error);
	const cache = useBossesStore((state) => state.cache);
	const loadingId = useBossesStore((state) => state.loadingId);

	useFocusEffect(
		useCallback(() => {
			fetchBossDetails(id);
		}, [fetchBossDetails, id])
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
			<Text style={{ textAlign: "center" }}>Boss Details</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<BossDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
