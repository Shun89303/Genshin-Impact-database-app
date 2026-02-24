import ElementsList from "@/src/components/resources/elements/elementsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ElementsScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<ElementsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
