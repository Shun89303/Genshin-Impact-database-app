import { Stack } from "expo-router";

export default function WeaponsStack() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "Weapons" }} />
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
