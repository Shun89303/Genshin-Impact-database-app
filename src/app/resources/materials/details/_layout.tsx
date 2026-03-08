import { Stack } from "expo-router";

export default function DetailsStack() {
	return (
		<Stack
			screenOptions={{
				title: "Details",
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />

			<Stack.Screen name="weapon/ascension/[id]" />

			<Stack.Screen name="talent/book/[id]" />
		</Stack>
	);
}
