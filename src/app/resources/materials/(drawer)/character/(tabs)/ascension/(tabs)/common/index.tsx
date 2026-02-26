import MaterialsList from "@/src/components/resources/materials/character/ascension/common/materialsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommonMaterials() {
	return (
		<SafeAreaView style={styles.simpleContainer}>
			<MaterialsList />
		</SafeAreaView>
	);
}
