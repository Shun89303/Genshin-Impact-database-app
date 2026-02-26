import MaterialsList from "@/src/components/resources/materials/weapon/experience/materialsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeaponExperienceMaterials() {
	return (
		<SafeAreaView style={styles.simpleContainer}>
			<MaterialsList />
		</SafeAreaView>
	);
}
