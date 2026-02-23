import { Drawer } from "expo-router/drawer";

export default function MaterialsDrawerLayout() {
	return (
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
		</Drawer>
	);
}
