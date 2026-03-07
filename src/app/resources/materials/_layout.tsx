import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MaterialLayout() {
	return (
		<SafeAreaProvider>
			<Stack
				initialRouteName="(drawer)"
				screenOptions={{
					headerBackButtonDisplayMode: "minimal",
				}}
			>
				<Stack.Screen
					name="(drawer)"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name="details" />
			</Stack>
		</SafeAreaProvider>
	);
}
