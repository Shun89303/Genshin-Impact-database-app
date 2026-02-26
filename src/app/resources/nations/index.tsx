import NationsList from "@/src/components/resources/nations/nationsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NationsScreen() {
	return (
		<SafeAreaView style={styles.simpleContainer}>
			<NationsList />
		</SafeAreaView>
	);
}
