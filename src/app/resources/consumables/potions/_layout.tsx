import { Stack } from "expo-router";

export default function PotionStack() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Potions",
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: "Details",
					headerBackButtonDisplayMode: "minimal",
				}}
			/>
		</Stack>
	);
}
