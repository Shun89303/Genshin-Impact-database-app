import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { Tabs } from "expo-router";

export default function TalentTabs() {
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
				name="boss/index"
				options={{
					title: "Boss",
					headerShown: false,
					tabBarIcon: ({ size, color }) => (
						<FontAwesome5
							name="wolf-pack-battalion"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="book/index"
				options={{
					title: "Book",
					headerShown: false,
					tabBarIcon: ({ size, color }) => (
						<FontAwesome5 name="book" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
