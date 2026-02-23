import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function AscensionTabs() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Ascension",
					href: null,
				}}
			/>
			<Tabs.Screen
				name="character/index"
				options={{
					title: "Character",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="people-circle-sharp" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="common/index"
				options={{
					title: "Common",
					tabBarIcon: ({ size, color }) => (
						<FontAwesome5 name="dot-circle" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
