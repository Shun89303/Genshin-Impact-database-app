import ArtifactsList from "@/src/components/artifacts/artifactsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ArtifactsScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<ArtifactsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
