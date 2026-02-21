import styles from "@/src/components/styles.modules";
import WeaponsList from "@/src/components/weapons/weaponsList";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function WeaponsScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.simpleContainer}>
				<WeaponsList />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
