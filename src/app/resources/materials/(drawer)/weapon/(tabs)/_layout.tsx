import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function WeaponTabs() {
	return (
		<Tabs
			safeAreaInsets={{
				top: 0,
			}}
			screenOptions={{
				tabBarPosition: "top",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					href: null,
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="ascension/index"
				options={{
					title: "Ascension",
					headerShown: false,
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons name="upgrade" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="experience/index"
				options={{
					title: "Experience",
					headerShown: false,
					tabBarIcon: ({ size, color }) => (
						<AntDesign name="deployment-unit" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
