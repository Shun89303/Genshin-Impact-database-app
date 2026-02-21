import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function ResourcesTab() {
	return (
		<Tabs
			screenOptions={{
				tabBarPosition: "top",
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="consumables"
				options={{
					tabBarLabel: "Consumables",
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons
							name="food-apple"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="materials"
				options={{
					title: "Materials",
					tabBarLabel: "Materials",
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons
							name="hammer-wrench"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="enemies"
				options={{
					title: "Enemies",
					tabBarLabel: "Enemies",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="alert-circle" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="nations"
				options={{
					title: "Nations",
					tabBarLabel: "Nations",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="flag-sharp" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="elements"
				options={{
					title: "Elements",
					tabBarLabel: "Elements",
					tabBarIcon: ({ size, color }) => (
						<FontAwesome6 name="gripfire" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
