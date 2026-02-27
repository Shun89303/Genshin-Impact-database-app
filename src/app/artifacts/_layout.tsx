import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ArtifactsStack() {
	return (
		<SafeAreaProvider>
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
		</SafeAreaProvider>
	);
}
