import CharactersList from "@/src/components/characters/charactersList";
import styles from "@/src/components/styles.modules";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CharactersScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<CharactersList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
