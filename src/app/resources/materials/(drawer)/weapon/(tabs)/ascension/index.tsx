import MaterialsList from "@/src/components/resources/materials/weapon/ascension/materialsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeaponAscensionMaterials() {
	return (
		<SafeAreaView style={styles.simpleContainer}>
			<MaterialsList />
		</SafeAreaView>
	);
}
