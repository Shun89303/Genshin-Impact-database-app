import PotionsList from "@/src/components/screens/resources/consumables/potions/potionsList";
import { View } from "react-native";

export default function PotionsScreen() {
	return (
		<View style={{ flex: 1 }}>
			<PotionsList />
		</View>
	);
}
