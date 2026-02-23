import MaterialsList from "@/src/components/materials/cooking/materialsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CookingMaterials() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<MaterialsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
