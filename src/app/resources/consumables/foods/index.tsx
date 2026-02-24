import FoodList from "@/src/components/resources/consumables/food/foodList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function FoodScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<FoodList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
