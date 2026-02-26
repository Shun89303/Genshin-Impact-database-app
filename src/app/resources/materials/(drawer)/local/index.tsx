import MaterialsList from "@/src/components/resources/materials/local/materialsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocalMaterials() {
	return (
		<SafeAreaView style={styles.simpleContainer}>
			<MaterialsList />
		</SafeAreaView>
	);
}
