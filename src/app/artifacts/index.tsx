import ArtifactsList from "@/src/components/artifacts/artifactsList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArtifactsScreen() {
	return (
		<SafeAreaView>
			<ArtifactsList />
		</SafeAreaView>
	);
}
