import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function RootLayout() {
	return (
		<Tabs
			screenOptions={{
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
				name="characters"
				options={{
					tabBarLabel: "Characters",
					tabBarIcon: ({ size, color }) => (
						<AntDesign name="team" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="weapons"
				options={{
					tabBarLabel: "Weapons",
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="sword" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="artifacts"
				options={{
					tabBarLabel: "Artifacts",
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="feather" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="domains"
				options={{
					tabBarLabel: "Domains",
					tabBarIcon: ({ size, color }) => (
						<AntDesign name="ant-design" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="resources"
				options={{
					headerShown: true,
					title: "Resources",
					tabBarLabel: "Resources",
					tabBarIcon: ({ size, color }) => (
						<AntDesign name="folder-open" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
