import ArtifactsList from "@/src/components/screens/artifacts/artifactsList";
import { View } from "react-native";

export default function ArtifactsScreen() {
	return (
		<View style={{ flex: 1 }}>
			<ArtifactsList />
		</View>
	);
}
