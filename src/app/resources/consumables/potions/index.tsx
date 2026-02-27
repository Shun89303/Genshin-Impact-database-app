import PotionsList from "@/src/components/resources/consumables/potions/potionsList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PotionsScreen() {
	return (
		<SafeAreaView>
			<PotionsList />
		</SafeAreaView>
	);
}
