import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function WeaponsStack() {
	return (
		<SafeAreaProvider>
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
		</SafeAreaProvider>
	);
}
