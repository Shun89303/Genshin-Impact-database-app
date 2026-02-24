import MaterialsList from "@/src/components/materials/talent/book/materialsList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TalentBookMaterials() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<MaterialsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
