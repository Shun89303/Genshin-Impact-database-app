import styles from "@/src/app/artifacts/styles.modules";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ArtifactImage from "./artifactImage";

export default function ArtifactsList() {
	const fetchArtifactIds = useArtifactsStore((state) => state.fetchArtifactIds);
	const { ids, error } = useArtifactsStore();

	useEffect(() => {
		fetchArtifactIds();
	}, [fetchArtifactIds]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!ids?.length)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<>
			<FlatList
				data={ids}
				keyExtractor={(id) => id}
				renderItem={({ item }) => <ArtifactImage id={item} />}
				numColumns={3}
			/>
		</>
	);
}
