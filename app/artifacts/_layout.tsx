import { Stack } from "expo-router";

export default function ArtifactsStack() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Artifacts",
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
