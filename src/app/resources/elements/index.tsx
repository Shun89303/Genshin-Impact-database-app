import ElementsList from "@/src/components/resources/elements/elementsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ElementsScreen() {
	return (
		<SafeAreaView style={styles.simpleContainer}>
			<ElementsList />
		</SafeAreaView>
	);
}
