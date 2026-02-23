import { Stack } from "expo-router";

export default function DetailsStack() {
	return (
		<Stack>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="weapon/experience/[id]"
				options={{
					title: "Details",
				}}
			/>
			<Stack.Screen
				name="weapon/ascension/[id]"
				options={{
					title: "Details",
				}}
			/>
			<Stack.Screen
				name="talent/boss/[id]"
				options={{
					title: "Details",
				}}
			/>
			<Stack.Screen
				name="talent/book/[id]"
				options={{
					title: "Details",
				}}
			/>
			<Stack.Screen
				name="local/[id]"
				options={{
					title: "Details",
				}}
			/>
		</Stack>
	);
}
