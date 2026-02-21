import { Stack } from "expo-router";

export default function CharactersStack() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Characters",
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
