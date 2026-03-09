import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MaterialsDrawerLayout() {
	return (
		<SafeAreaProvider>
			<Drawer>
				<Drawer.Screen
					name="index"
					options={{
						title: "Materials",
					}}
				/>
				<Drawer.Screen
					name="weapon/(tabs)"
					options={{
						title: "Weapon",
					}}
				/>
			</Drawer>
		</SafeAreaProvider>
	);
}
