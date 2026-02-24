import PotionsList from "@/src/components/resources/consumables/potions/potionsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function PotionsScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<PotionsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
