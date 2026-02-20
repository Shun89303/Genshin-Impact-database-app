import ArtifactsList from "@/src/components/artifacts/artifactsList";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles.modules";

export default function ArtifactsScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<ArtifactsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
