import MaterialsList from "@/src/components/materials/character/ascension/common/materialsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CommonMaterials() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<MaterialsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
