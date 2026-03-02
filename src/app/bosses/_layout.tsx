import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function DomainsStack() {
	return (
		<SafeAreaProvider>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: true,
						title: "Bosses",
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
