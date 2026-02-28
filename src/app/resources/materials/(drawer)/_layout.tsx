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
				<Drawer.Screen
					name="talent/(tabs)"
					options={{
						title: "Talent",
					}}
				/>
				<Drawer.Screen
					name="local/index"
					options={{
						title: "Local Specialties",
						drawerLabel: "Local",
					}}
				/>
				<Drawer.Screen
					name="cooking/index"
					options={{
						title: "Cooking Ingredients",
						drawerLabel: "Cooking",
					}}
				/>
				<Drawer.Screen
					name="character/(tabs)"
					options={{
						title: "Character",
					}}
				/>
				<Drawer.Screen
					name="boss/index"
					options={{
						title: "Boss",
					}}
				/>
			</Drawer>
		</SafeAreaProvider>
	);
}
