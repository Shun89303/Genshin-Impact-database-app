import MaterialsList from "@/src/components/resources/materials/boss/materialsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function BossMaterials() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<MaterialsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
