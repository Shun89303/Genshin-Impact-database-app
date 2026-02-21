import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../styles.modules";
import ArtifactImage from "./artifactImage";

export default function ArtifactsList() {
	const fetchArtifactsIds = useArtifactsStore(
		(state) => state.fetchArtifactsIds
	);
	const { ids, error } = useArtifactsStore();
	const artifacts = endpoints.artifacts;
	const circletOfLogos = endpoints.circletOfLogos;

	useEffect(() => {
		if (!ids || ids.length === 0) {
			fetchArtifactsIds();
			return;
		}

		const remainingIds = ids.slice(20);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${artifacts}/${id}${circletOfLogos}`);
		});
	}, [fetchArtifactsIds, ids, artifacts, circletOfLogos]);

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
				numColumns={4}
				initialNumToRender={20}
				windowSize={10}
				removeClippedSubviews
				renderItem={({ item }) => <ArtifactImage id={item} />}
			/>
		</>
	);
}
