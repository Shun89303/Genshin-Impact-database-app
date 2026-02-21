import ArtifactDetails from "@/src/components/artifacts/artifactDetails";
import styles from "@/src/components/styles.modules";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function ArtifactsDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();
	const fetchArtifactDetails = useArtifactsStore(
		(state) => state.fetchArtifactDetails
	);
	const error = useArtifactsStore((state) => state.error);
	const cache = useArtifactsStore((state) => state.cache);
	const loadingId = useArtifactsStore((state) => state.loadingId);

	useFocusEffect(
		useCallback(() => {
			fetchArtifactDetails(id);
		}, [fetchArtifactDetails, id])
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
			<Text style={{ textAlign: "center" }}>Artifact Details</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<ArtifactDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
