import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function ConsumablesStack() {
	return (
		<Tabs
			screenOptions={{
				tabBarPosition: "top",
				headerShown: false,
			}}
			safeAreaInsets={{
				top: 5,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					href: null,
				}}
			/>
			<Tabs.Screen
				name="foods"
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons
							name="food-drumstick"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="potions"
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="flask-sharp" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
