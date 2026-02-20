import { Stack } from "expo-router";

export default function EnemiesStack() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
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
