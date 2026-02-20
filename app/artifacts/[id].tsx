import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ArtifactsDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Artifact Details</Text>
			<Text>Artifact ID: {id}</Text>
		</View>
	);
}
