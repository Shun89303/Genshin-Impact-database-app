import NationsList from "@/src/components/nations/nationsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function NationsScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<NationsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
