import FoodList from "@/src/components/resources/consumables/food/foodList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FoodScreen() {
	return (
		<SafeAreaView>
			<FoodList />
		</SafeAreaView>
	);
}
