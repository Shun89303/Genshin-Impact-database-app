import BossesList from "@/src/components/bosses/bossesList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function BossesScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<BossesList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
