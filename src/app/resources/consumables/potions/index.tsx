import PotionsList from "@/src/components/resources/consumables/potions/potionsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PotionsScreen() {
	return (
		<SafeAreaView style={styles.simpleContainer}>
			<PotionsList />
		</SafeAreaView>
	);
}
