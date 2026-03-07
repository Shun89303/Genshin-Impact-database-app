import FoodList from "@/src/components/screens/resources/consumables/food/foodList";
import { View } from "react-native";

export default function FoodScreen() {
	return (
		<View style={{ flex: 1 }}>
			<FoodList />
		</View>
	);
}
