import ArtifactDetails from "@/src/components/artifacts/artifactDetails";
import styles from "@/src/components/styles.modules";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function ArtifactsDetailsScreen() {
	const { id } = useLocalSearchParams();
	const fetchArtifactDetails = useArtifactsStore(
		(state) => state.fetchArtifactDetails
	);
	const error = useArtifactsStore((state) => state.error);
	const [data, setData] = useState<Record<string, unknown> | any>();

	useEffect(() => {
		if (!id || Array.isArray(id)) return;

		const load = async () => {
			const details = await fetchArtifactDetails(id);
			setData(details);
		};
		load();
	}, [fetchArtifactDetails, id]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!data)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<View>
			<Text style={{ textAlign: "center" }}>Artifact Details</Text>
			<FlatList
				data={Object.entries(data)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<ArtifactDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
