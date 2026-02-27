import WeaponsList from "@/src/components/weapons/weaponsList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeaponsScreen() {
	return (
		<SafeAreaView>
			<WeaponsList />
		</SafeAreaView>
	);
}
