import MaterialsList from "@/src/components/resources/materials/character/ascension/character/materialsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CharacterMaterials() {
	return (
		<SafeAreaView style={styles.simpleContainer}>
			<MaterialsList />
		</SafeAreaView>
	);
}
