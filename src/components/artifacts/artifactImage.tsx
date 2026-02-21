import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/app/artifacts/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

export default function ArtifactImage({ id }: any) {
	const fetchArtifactImageTypes = useArtifactsStore(
		(state) => state.fetchArtifactImageTypes
	);
	const { error } = useArtifactsStore();
	const [url, setUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const artifacts = endpoints.artifacts;

	useEffect(() => {
		if (!id) return;
		const load = async () => {
			const types: string[] = await fetchArtifactImageTypes(id);
			const imageUrl = `${BASE_URL}${artifacts}/${id}/${types[0]}`;
			setUrl(imageUrl);
		};
		load();
	}, [fetchArtifactImageTypes, id, artifacts]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!url)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<>
			<Pressable
				onPress={() =>
					router.push({ pathname: "/artifacts/[id]", params: { id } })
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: url }}
					style={{ width: 100, height: 100 }}
					onLoad={() => setLoading(false)}
				/>
			</Pressable>
		</>
	);
}
