import WeaponsList from "@/src/components/screens/weapons/weaponsList";
import { View } from "react-native";

export default function WeaponsScreen() {
	return (
		<View style={{ flex: 1 }}>
			<WeaponsList />
		</View>
	);
}
