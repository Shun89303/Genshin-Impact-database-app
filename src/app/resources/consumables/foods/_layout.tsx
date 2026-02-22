import { Stack } from "expo-router";

export default function FoodStack() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Foods",
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
