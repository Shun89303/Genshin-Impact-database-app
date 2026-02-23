import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function CharacterTabs() {
	return (
		<Tabs
			screenOptions={{
				tabBarPosition: "top",
				headerShown: false,
			}}
			safeAreaInsets={{
				top: 0,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Character Materials",
					href: null,
				}}
			/>
			<Tabs.Screen
				name="ascension/(tabs)"
				options={{
					title: "Ascension",
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons name="upgrade" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="experience/index"
				options={{
					title: "Experience",
					tabBarIcon: ({ size, color }) => (
						<AntDesign name="deployment-unit" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
